import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import SimpleProductCard from "../../public-component/Product/CardProduct/SimpleProductCard";
import { actualizarCarrito, eliminarCarrito } from '../../public-component/Product/Carrito/CarritoSession';
import Axios from 'axios';

import SimpleModal from '../../public-component/Modal/SimpleModal';
import CategorySelect from '../../public-component/Product/CategoryComponent/CategorySelect';
import { convertirMuchosDatos as convertirMuchosDatosRegion } from '../../mapeo/Helpers/RegionHelper';


function RealizarCompraCl() {

    //Variable para controlar cuando un boton está 'cargando'
    const [isBtnLoading, setLoading] = useState(false);

    //Mensaje de error
    const [ErroMessage, setMessage] = React.useState('');

    //Datos JSON traidos por la petición de busqueda por region
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

    // Estado para almacenar los valores de los checkboxes de categoria 
    const [checkData, setCheckData] = useState([]);

    //Funcion para manejar el cambio de nomFiltro
    const handleNomFiltro = () => {
        const valorInput = document.getElementById("nomFiltroInput").value;
        setNomFiltro(valorInput);
    }
    // Función para manejar el cambio de estado de los checkbox de categoria
    /*
        Se guarda el id de los formularios activados, el nombre del check
        tambien la categoria y posible categoria padre
    */
    const handleCheckBox = (formCheck, idCat, idCatPadre, nombreCheck) => {

        //obtener el valor del check de categorias
        const prodForm = document.getElementById(formCheck);

        const valor = prodForm.elements[nombreCheck].checked;

        // Obtener el índice del formData actual si existe en checkData
        const index = checkData.findIndex(data => data['id-cat'] === idCat);

        //Si no existe se agrega
        if (index === -1) {

            const formData = { 'id-form': formCheck, 'nombre-check': nombreCheck, 'id-cat': idCat, 'id-cat-padre': idCatPadre, 'value': valor };

            // ...checkData permite tener una copia superficial de la variable
            setCheckData([
                ...checkData,
                formData
            ]);
        };
        //Si el valor es true indica que se activa el check
        if (valor) {
            //Se desactivan todos los check exceto el que activó el metodo
            checkData.forEach(data => {
                data['value'] = false;
                cambiarCheck(data['id-form'], data['nombre-check'], false);

                //Si la categoria que se activa tiene categoria padre tambien se activa
                if (data['id-cat'] === idCat) {
                    data['value'] = true;
                    cambiarCheck(data['id-form'], data['nombre-check'], true);
                }

            });
        }

    };

    /*Handler para manejar la región activa */
    const handleRegionActiva = () => {
        const valorInput = document.getElementById("regionSel").value;
        setRegionActiva(valorInput);
    }

    //Hacer la consulta de filtros con categorias
    const aplicarFiltroCat = async () => {
        let idCatPadre;
        let idCat;
        let cat = "No se especificó una categoria";

        //Se recorren lo check de las categorias y se traen su id y su id de categoria padre
        for (let i = 0; i < checkData.length; i++) {
            if (checkData[i]['value']) {
                cat = "categoria con id " + checkData[i]['id-cat'];
                idCat = checkData[i]['id-cat'];


                if (checkData[i]['id-cat-padre']) {
                    cat += ". tiene el id padre " + checkData[i]['id-cat-padre'];
                    idCatPadre = checkData[i]['id-cat-padre'];
                }

                //Si existe idCat es porque se seleccionó aunque sea una categoria
                if (idCat) {
                    const data = await peticion(regionActiva, idCat, idCatPadre);

                    // Una vez que la promesa se resuelve, actualizamos el estado con los datos recibidos
                    SetjsonData(data);
                }
            }
        }
        alert(cat);
    }

    //Cambiar el valor de un checkbox dandole el nombre que tiene y el idForm al que pertenece
    function cambiarCheck(idForm, nombreCheck, valor) {
        const prodForm = document.getElementById(idForm);

        // Cambiar el valor del checkbox
        prodForm.elements[nombreCheck].checked = valor;

    }

    const regionDataTemp =
    {
        "records": [
            ["AND", "ANDINA", "COL", ""],
            ["LLA", "LLANOS", "COL", ""]
        ],
        "fields": [
            { "name": "K_COD_REGION", "type": "VARCHAR2(25)" },
            { "name": "N_NOM_REGION", "type": "VARCHAR2(25)" },
            { "name": "K_COD_PAIS", "type": "VARCHAR2(25)" },
            { "name": "K_REP_ENCARGADO", "type": "VARCHAR2(25)" }
        ]
    }


    const categoriesData =
    {
        "records": [
            ["HG2", "HG", "Artículos de cocina"],
            ["HG3", "HG", "Productos de lavandería"],
            ["HG4", "HG", "Limpieza de pisos"],
            ["HG5", "HG", "Desinfectantes"],
            ["CP1", "CP", "Cuidado de la piel"],
            ["CP2", "CP", "Higiene bucal"],
            ["CP3", "CP", "Cuidado del cabello"],
            ["CP4", "CP", "Cuidado de las uñas"],
            ["CP5", "CP", "Fragancias"],
            ["EL1", "EL", "Teléfonos móviles"],
            ["EL2", "EL", "Computadoras"],
            ["EL3", "EL", "Tablets"],
            ["EL4", "EL", "Relojes inteligentes"],
            ["EL5", "EL", "Televisores"],
            ["EL", "", "Electronica"],
            ["BL", "", "Belleza"],
            ["CP", "", "Cuidado personal"],
            ["HG", "", "Hogar"],
            ["EL51", "EL5", "ElectronicaTesst"]
        ],
        "fields": [
            { "name": "I_ID_CAT_PRODUCTO", "type": "VARCHAR2(5)" },
            { "name": "I_ID_CAT_PRO_SUP", "type": "VARCHAR2(5)" },
            { "name": "N_NOM_CAT_PRODUCTO", "type": "VARCHAR2(50)" }
        ]
    }

    //UseEffect inicial, se ejecuta al cargar el componente
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                //Se espera la promesa de peticion region
                //const dataRegion = await peticionRegiones();
                const dataRegion = convertirMuchosDatosRegion(regionDataTemp.records);

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
            //Se divide el array de productos(records) en grupos de 3
            let lista = dividirArray(records, 3);
            setListaProductos(lista);
            setListaProdTemp(lista);

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

                //Records o resultados
                let { records, fields } = dataJson;
                //Se divide el array de productos(records) en grupos de 3
                if (records) {
                    let lista = dividirArray(records, 3);
                    setListaProductos(lista);
                    setListaProdTemp(lista);
                }
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
                    let nombreProducto = producto[0].toUpperCase();

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

    };

    // Función para dividir un array en grupos de tamaño dado
    function dividirArray(array, size) {
        const listaDividida = [];
        for (let i = 0; i < array.length; i += size) {
            listaDividida.push(array.slice(i, i + size));
        }
        return listaDividida;
    }

    //Funcion para cargar un producto al carrito
    const cargarProducto = (productoId, formId) => {
        try {
            //Congelar botones
            setLoading(true);

            //Obtener cantidad del formulario
            const prodForm = document.getElementById(formId);
            const cant = prodForm.elements["cantidad"].value;
            const nom = prodForm.elements["nombre"].value;
            const precio = prodForm.elements["precio"].value;
            if (cant > 0) {
                setTimeout(() => {
                    //Guardar en el carrito
                    setLoading(false);
                }, 1000); // Tiempo de espera
                actualizarCarrito("1", nom, productoId, cant, precio);
                alert(`Producto ${nom} agregado con ${cant} unidades`);
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
                    <Button variant="primary" onClick={handleRegionActiva}>Seleccionar</Button>

                </Form>
            </SimpleModal>

            <Button variant="primary" onClick={() => setShowModal(true)}>
                Cambiar región
            </Button>

            <br />
            <Button variant="danger" onClick={() => eliminarCarrito("1")}>Borrar todo el carro</Button>

            <br />

            <CategorySelect categorias={categoriesData.records} handlerPadre={handleCheckBox} />
            <br />
            <Button variant="primary" onClick={() => aplicarFiltroCat()}>
                Aplicar filtro de categorias
            </Button>
            <Form id="form-filtro-nom">
                <Row className="align-items-center">
                    <Col sm={3} className="my-1">
                        <Form.Label htmlFor="nomFiltroInput" visuallyHidden>
                            Nombre producto
                        </Form.Label>
                        <Form.Control id="nomFiltroInput" placeholder="Nombre producto" required/>
                    </Col>
                    <Col xs="auto" className="my-1">
                        <Button onClick={handleNomFiltro}>Buscar por nombre</Button>
                    </Col>
                </Row>
            </Form>
            <p style={{ color: 'red' }}>{ErroMessage}</p>
            {listaProdTemp.length === 0 ? (
                <p>No hay productos disponibles que cumplan con los criterios</p>
            ) : (

                listaProdTemp.map((grupoProd, index) => (
                    <Row key={index}>
                        {grupoProd.map((producto, i) => (
                            <Col key={i}>
                                <SimpleProductCard idProd={producto[1]} nomProducto={producto[0]} precio={producto[3]}>
                                    <Form id={`form-prod-${index}-${i}`}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Cantidad</Form.Label>
                                            <Form.Control size="sm" type="number" min="1" name="cantidad" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Control size="sm" type="hidden" placeholder="1" min="1" name="nombre" value={producto[0]} disabled readOnly />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Control size="sm" type="hidden" placeholder="1" min="1" name="precio" value={producto[3]} disabled readOnly />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Button variant="secondary" size="lg" type="submit" disabled={isBtnLoading}
                                                onClick={() => cargarProducto(`${producto[1]}`, `form-prod-${index}-${i}`)}>
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