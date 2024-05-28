import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import SimpleProductCard from "../../public-component/Product/CardProduct/SimpleProductCard";
import { actualizarCarrito, eliminarCarrito } from '../../public-component/Product/Carrito/CarritoSession';
import Axios from 'axios';

import SimpleModal from '../../public-component/Modal/SimpleModal';
import { convertirMuchosDatos as convertirMuchosDatosCliente } from '../../mapeo/Helpers/ClienteHelper';
import { convertirMuchosDatos as convertirProductos, buscarProducto } from '../../mapeo/Helpers/ProductoHelper';
import { convertirMuchosDatos as convertirUsuarios } from '../../mapeo/Helpers/UserHelper';

import { dividirArray } from '../../public-component/Common-functions/ArrayFunct';
import CategoryFilter from '../../public-component/Product/CategoryComponent/CategoryFilter';

function RealizarVenta() {

    //Variable para controlar cuando un boton está 'cargando'
    const [isBtnLoading, setLoading] = useState(false);

    //Mensaje de error
    const [ErroMessage, setMessage] = React.useState('');


    //Variable para mostrar el modal de region
    const [showClModal, setShowClModal] = useState(true);

    //Clientes traidos por la peticion de clientes del representante
    var [clientesData, setClientesData] = React.useState([]);

    //Datos JSON de productos traidos por la busqueda de region
    var [productosJson, SetProductosJson] = React.useState('');

    //Variable del cliente seleccionado
    var [clienteActivo, setClienteActivo] = React.useState('');



    //La lista de productos que se obtienen de la base de datos
    var [listaProductos, setListaProductos] = React.useState([]);

    //Una lista que guardará la lista de productos si se filtran por nombre
    var [listaProdTemp, setListaProdTemp] = React.useState([]);

    //Variable que guarda el valor puesto en el filtro por nombre
    var [nomFiltro, setNomFiltro] = React.useState('');

    //constante con la region del representante
    const [regionRep, setRegionRep] = React.useState('');

    //Constante que cambia el valor de la variable del modal
    const handleClModal = () => setShowClModal(!setShowClModal);

    // Constante que cambia el valor del cliente activo
    const handleClienteActivo = () => {
        const valorInput = document.getElementById("clienteSel").value;
        setClienteActivo(valorInput);
        eliminarCarrito('1');
    }

    //Funcion para manejar el cambio de nomFiltro
    const handleNomFiltro = () => {
        const valorInput = document.getElementById("nomFiltroInput").value;
        setNomFiltro(valorInput);
    }


    //Funcion para recibir la categoria elegida desde el categoryFilter
    const handleCatElegida = async (datos) => {
        let data = "";

        //Si existe idCat es porque se seleccionó aunque sea una categoria
        if (datos.idCat) {

            //Si la categoria elegida no tiene categoria padre entonces se envia la categoria elegida como categoria padre
            if (!datos.idCatPadre) {
                data = await peticion(regionRep, datos.idCat, null);
            } else {
                data = await peticion(regionRep, datos.idCatPadre, datos.idCat);
            }

            // Una vez que la promesa se resuelve, actualizamos el estado con los datos recibidos
            SetProductosJson(data);
        }
    }

    //UseEffect inicial, se ejecuta al cargar el componente
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                //Se espera la promesa de peticion de clientes
                const dataCl = await peticionClientes();

                let clientes = convertirMuchosDatosCliente(dataCl.records, dataCl.fields);
                setClientesData(clientes);

                //Se hace la peticion de usuario para guardar la region
                const dataUser = await peticionUser();
                let user = convertirUsuarios(dataUser.records, dataUser.fields)[0];
                setRegionRep(user.region);
                console.log(user);
            } catch (error) {
                // Manejamos cualquier error que pueda ocurrir
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchData();
    }, []);

    //UseEffect que Revisa el cambio en productosJson y actualiza la lista de productos
    React.useEffect(() => {
        if (productosJson) {

            //Records o resultados
            let { records, fields } = productosJson;
            //Se convierten los records en productos
            let productos = convertirProductos(records, fields);

            //Se divide el array de productos(records) en grupos de 3
            let lista = dividirArray(productos, 3);
            setListaProductos(lista);
            setListaProdTemp(lista);
            //Se reinicia el filtro de busqueda por nombre
            document.getElementById("nomFiltroInput").value = '';
            setNomFiltro('');
        }
    }, [productosJson]);

    //UseEffect que Revisa el cambio en cliente y borra el carrito
    React.useEffect(() => {
        async function fetchData() {
            if (clienteActivo) {
                // Esperamos la resolución de la promesa usando await
                const data = await peticion(regionRep, null, null);

                // Una vez que la promesa se resuelve, actualizamos el estado con los datos recibidos
                SetProductosJson(data);

                //Se cierra el modal
                handleClModal();

                //Se reinicia el filtro de busqueda por nombre
                document.getElementById("nomFiltroInput").value = '';
            }
        }

        fetchData();

    }, [clienteActivo]);

    //UseEffect que Revisa el cambio en el nombre y actualiza la lista que se muestra
    React.useEffect(() => {
        if (nomFiltro) {
            let productosFiltrados = [];

            /*ListaProductos es una lista de listas de productos se recorre todo para agregarla a la lista temp*/
            for (let i = 0; i < listaProductos.length; i++) {
                let listaInterna = listaProductos[i];
                for (let j = 0; j < listaInterna.length; j++) {
                    //El componente en la posicion 1 es el nombre guardado
                    let producto = listaInterna[j];
                    let nombreProducto = producto.nomProducto.toUpperCase();

                    // Convertir nomFiltro a mayúsculas y eliminar espacios en blanco
                    let nombreBusqueda = nomFiltro.trim().toUpperCase();


                    if (nombreProducto.includes(nombreBusqueda)) {
                        productosFiltrados.push(producto);
                    }
                }
            }

            //Se divide el array en grupos para que se vea bien y se pasa a la lista que se muestra
            setListaProdTemp(dividirArray(productosFiltrados, 3));
        } else {
            setListaProdTemp(listaProductos);
        }
    }, [nomFiltro])

    //Peticion para actualizar la lista de productos por región y categoria
    var peticion = (region, idCat, idSub) => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/cliente/Productosregion', { "serial": window.sessionStorage.getItem("Serial"), "region": region, "categoria": idCat, "subcategoria": idSub })
                .then((response) => {
                    // Resolvemos la promesa con los datos recibidos
                    resolve(response.data);
                })
                .catch((error) => {
                    // Rechazamos la promesa con el mensaje de error
                    setMessage(error.response.data.errors);

                });
        });
    };

    //Peticion para traer datos del representante activo
    var peticionUser = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/Login/datosbasicos', { "Serial": window.sessionStorage.getItem("Serial") })
                .then((response) => {
                    // Resolvemos la promesa con los datos recibidos
                    resolve(response.data);
                })
                .catch((error) => {
                    // Rechazamos la promesa con el mensaje de error
                    setMessage(error.response.data.errors);
                });
        });
    };

    //Peticion para traer los clientes del representante
    var peticionClientes = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/representante/clientes', { "Serial": window.sessionStorage.getItem("Serial") })
                .then((response) => {
                    // Resolvemos la promesa con los datos recibidos
                    resolve(response.data);
                })
                .catch((error) => {
                    // Rechazamos la promesa con el mensaje de error
                    setMessage(error.response.data.errors);

                });
        });
    };

    //Funcion para cargar un producto al carrito
    const cargarProducto = (productoId, formId) => {
        try {
            //Congelar botones
            setLoading(true);

            //Obtener cantidad del formulario
            const prodForm = document.getElementById(formId);
            const cant = prodForm.elements["cantidad"].value;

            let producto = "";
            //Se recorre la lista de listas de productos hasta encontrar al producto respectivo
            for (let i = 0; i < listaProductos.length; i++) {
                let listaP = listaProductos[i];
                producto = buscarProducto(listaP, productoId);
                if (producto.codProducto) {
                    break;
                }
            }


            if (cant > 0) {
                setTimeout(() => {
                    //Guardar en el carrito
                    setLoading(false);
                }, 1000); // Tiempo de espera
                actualizarCarrito(clienteActivo, producto, regionRep, cant, producto.precioUnitario);
                alert(`Producto ${producto.nomProducto} agregado con ${cant} unidades`);
                prodForm.elements["cantidad"].value = "";
            } else {
                setTimeout(() => {
                    setLoading(false);
                }, 1000); // Tiempo de espera
                throw new Error('Ingrese un valor valido para la cantidad');
            }
        } catch (error) {
            alert(error);
        }

    };

    return (
        <React.Fragment>
            <Alert variant="secondary">Realizar venta a un cliente</Alert>
            {ErroMessage && (
                <Alert variant="danger">{ErroMessage}</Alert>
            )}

            <SimpleModal show={showClModal} titulo={"Selección de cliente"} handleClose={handleClModal}>
                <Form id="form-region">
                    <Form.Select id='clienteSel'>
                        {clientesData && clientesData.map((cliente, index) => (
                            <option key={index} value={cliente.docCliente}>
                                {cliente.primerNombre} {cliente.segundoNombre} {cliente.primerApellido} {cliente.segundoApellido}
                            </option>
                        ))};
                    </Form.Select>
                    <br />
                    <div className="d-grid gap-2">
                        <Alert variant="warning">Cambiar de cliente borrará el carrito</Alert>
                        <Button variant="primary" onClick={handleClienteActivo} size="lg">Seleccionar</Button>
                    </div>
                    <p></p>
                </Form>
            </SimpleModal>


            <Alert variant="primary">
                <h4>Cliente seleccionado {clienteActivo}</h4>
                <div className="d-grid gap-2">
                    <Button variant="primary" onClick={() => setShowClModal(true)}>
                        Cambiar cliente
                    </Button>
                </div>
            </Alert>

            <div className="d-grid gap-2">
                <Button variant="danger" onClick={() => eliminarCarrito()}>Borrar todo el carro</Button>
            </div>

            <br />
            <CategoryFilter handleFiltro={handleCatElegida}></CategoryFilter>
            <Form id="form-filtro-nom">
                <Row className="align-items-center">
                    <Col sm={3} className="my-1">
                        <Form.Label htmlFor="nomFiltroInput" visuallyHidden>
                            Nombre producto
                        </Form.Label>
                        <Form.Control id="nomFiltroInput" placeholder="Nombre producto" required />
                    </Col>
                    <Col xs="auto" className="my-1">
                        <Button onClick={handleNomFiltro}>Buscar por nombre</Button>
                    </Col>
                </Row>
            </Form>

            {listaProdTemp.length === 0 ? (
                <p>No hay productos disponibles que cumplan con los criterios</p>
            ) : (
                listaProdTemp.map((grupoProd, index) => (
                    <Row key={index}>
                        {grupoProd.map((producto, i) => (
                            <Col key={i}>
                                <SimpleProductCard idProd={producto.codProducto} nomProducto={producto.nomProducto} precio={producto.precioUnitario}>
                                    <Form id={`form-prod-${index}-${i}`}>
                                    <Form.Group className="mb-3">
                                            <Form.Label>Cantidad max {producto.cantidadStock}</Form.Label>
                                            <Form.Control size="sm" type="number" min="1" name="cantidad" max={parseInt(producto.cantidadStock)}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Button variant="secondary" size="lg" type="submit" disabled={isBtnLoading}
                                                onClick={() => cargarProducto(`${producto.codProducto}`, `form-prod-${index}-${i}`)}>
                                                {isBtnLoading ? 'Cargando...' : 'Agregar al carrito'}
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                </SimpleProductCard>
                            </Col>
                        ))}
                    </Row>
                ))

            )}

        </React.Fragment>
    )
}

export default RealizarVenta;