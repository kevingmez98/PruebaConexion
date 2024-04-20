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
import { convertirFormatoRegion } from '../../mapeo/Helpers/RegionHelper';
import { convertirMuchosDatos as convertirProductos, buscarProducto } from '../../mapeo/Helpers/ProductoHelper';

import { dividirArray } from '../../public-component/Common-functions/ArrayFunct';
import CategoryFilter from '../../public-component/Product/CategoryComponent/CategoryFilter';


function RealizarCompraCl() {

    //Variable para controlar cuando un boton está 'cargando'
    const [isBtnLoading, setLoading] = useState(false);

    //Mensaje de error
    const [ErroMessage, setMessage] = React.useState('');

    //Datos JSON de productos traidos por la busqueda de region
    var [dataJson, SetjsonData] = React.useState('');

    //Datos traidos por la peticion de regiones
    var [regionData, setRegionData] = React.useState([]);

    //Variable de la region seleccionada
    var [regionActiva, setRegionActiva] = React.useState('');


    //La lista de productos que se obtienen de la base de datos
    var [listaProductos, setListaProductos] = React.useState([]);

    //Una lista que guardará la lista de productos si se filtran por nombre
    var [listaProdTemp, setListaProdTemp] = React.useState([]);

    //Variable que guarda el valor puesto en el filtro por nombre
    var [nomFiltro, setNomFiltro] = React.useState('');

    //Variable para mostrar el modal de region
    const [showModal, setShowModal] = useState(true);

    //Constante que cambia el valor de la variable del modal
    const showRegModal = () => setShowModal(!setShowModal);

    //Funcion para manejar el cambio de nomFiltro
    const handleNomFiltro = () => {
        const valorInput = document.getElementById("nomFiltroInput").value;
        setNomFiltro(valorInput);
    }

    /*Handler para manejar la región activa */
    const handleRegionActiva = () => {
        const valorInput = document.getElementById("regionSel").value;
        setRegionActiva(valorInput);
        eliminarCarrito();
    }

    //Funcion para recibir la categoria elegida desde el categoryFilter
    const handleCatElegida = async (datos) => {
        let data = "";

        //Si existe idCat es porque se seleccionó aunque sea una categoria
        if (datos.idCat) {

            //Si la categoria elegida no tiene categoria padre entonces se envia la categoria elegida como categoria padre
            if (!datos.idCatPadre) {
                data = await peticion(regionActiva, datos.idCat, null);
            } else {
                data = await peticion(regionActiva, datos.idCatPadre, datos.idCat);
            }

            // Una vez que la promesa se resuelve, actualizamos el estado con los datos recibidos
            SetjsonData(data);
        }
    }

    //UseEffect inicial, se ejecuta al cargar el componente
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                //Se espera la promesa de peticion region
                const dataR = await peticionRegiones();

                //La consulta de regiones trae los datos de otra manera por lo que se convierten los datos primero
                const dataRegion = convertirFormatoRegion(dataR.nomRegiones, dataR.codRegiones);
                setRegionData(dataRegion);


            } catch (error) {
                // Manejamos cualquier error que pueda ocurrir
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchData();
    }, []);

    //UseEffect que Revisa el cambio en dataJson y actualiza la lista
    React.useEffect(() => {
        if (dataJson) {
            //Records o resultados
            let { records, fields } = dataJson;
            //Se convierten los records en productos
            let productos = convertirProductos(records,fields);

            //Se divide el array de productos(records) en grupos de 3
            let listaDividida = dividirArray(productos, 3);

            setListaProductos(listaDividida);
            setListaProdTemp(listaDividida);

            //Se reinicia el filtro de busqueda por nombre
            document.getElementById("nomFiltroInput").value = '';
            setNomFiltro('');
        }
    }, [dataJson])

    //UseEffect que Revisa el cambio en regionActiva y actualiza la lista de producto
    React.useEffect(() => {
        async function fetchData() {
            if (regionActiva) {
                // Esperamos la resolución de la promesa usando await
                const data = await peticion(regionActiva, null, null);
                // Una vez que la promesa se resuelve, actualizamos el estado con los datos recibidos
                SetjsonData(data);

                showRegModal();
                //Se reinicia el filtro de busqueda por nombre
                document.getElementById("nomFiltroInput").value = '';
            }

        }

        fetchData();

    }, [regionActiva])

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

    //Peticion para actualizar la lista de productos por región
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

    //Peticion para traer las regiones
    var peticionRegiones = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/cliente/Regiones', { "serial": window.sessionStorage.getItem("Serial") })
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
            console.log(productoId);
            //Congelar botones
            setLoading(true);
            console.log(productoId)
            //Obtener cantidad del formulario
            const prodForm = document.getElementById(formId);
            const cant = prodForm.elements["cantidad"].value;
            let producto = "";
            //Se recorre la lista de listas de productos hasta encontrar al producto respectivo
             for (let i = 0; i < listaProductos.length; i++) {
                let listaP = listaProductos[i];
                producto = buscarProducto(listaP, productoId);
                if(producto.codProducto){
                    break;
                }
             }
            console.log(producto);
            if (cant > 0) {
                setTimeout(() => {
                    //Guardar en el carrito
                    setLoading(false);
                }, 1000); // Tiempo de espera
                actualizarCarrito(window.sessionStorage.getItem("Serial") , producto.nomProducto, productoId, cant, producto.precioUnitario);
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
            <SimpleModal show={showModal} titulo={"Cambio de región"} handleClose={showRegModal}>
                <Form id="form-region">
                    <Form.Select id='regionSel'>
                        {regionData.map((region, index) => (
                            <option key={index} value={region.codRegion}>{region.nomRegion}</option>
                        ))};

                    </Form.Select>
                    <div className="d-grid gap-2">
                        <Button variant="primary" onClick={handleRegionActiva}>Seleccionar</Button>
                    </div>
                    <br/>
                    {regionActiva && (
                          <Alert variant="warning">Cambiar de región borrará el carrito</Alert>
                    )}
                  
                </Form>
            </SimpleModal>

            <Alert variant="secondary">Agregar elementos al carrito para comprar</Alert>
            
                <div className="d-grid gap-2">
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        Cambiar región
                    </Button>
                </div>

              {ErroMessage && (
                <Alert variant="danger">{ErroMessage}</Alert>
            )}

            <br />
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
                                            <Form.Label>Cantidad</Form.Label>
                                            <Form.Control size="sm" type="number" min="1" name="cantidad" />
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

export default RealizarCompraCl;