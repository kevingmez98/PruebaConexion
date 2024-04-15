import React, { useState } from 'react';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { dividirArray } from '../../public-component/Common-functions/ArrayFunct';
import CategoryFilter from "../../public-component/Product/CategoryComponent/CategoryFilter";
import SimpleProductCard from '../../public-component/Product/CardProduct/SimpleProductCard';


function GestionarInventario() {

    //Mensaje de error
    const [ErroMessage, setMessage] = React.useState('');

    //Datos JSON de productos traidos por la busqueda de region
    var [productosJson, SetproductosJson] = React.useState('');

    //La lista de productos que se obtienen de la base de datos
    var [listaProductos, setListaProductos] = React.useState([]);

    //Una lista que guardará la lista de productos si se filtran por nombre
    var [listaProdTemp, setListaProdTemp] = React.useState([]);

    //Variable que guarda el valor puesto en el filtro por nombre
    var [nomFiltro, setNomFiltro] = React.useState('');

    //Variable para controlar cuando un boton está 'cargando'
    const [isBtnLoading, setLoading] = useState(false);

    //UseEffect inicial, se ejecuta al cargar el componente
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // Esperamos la resolución de la promesa usando await
                const data = await peticionProductos('AND', null, null);
                // Una vez que la promesa se resuelve, actualizamos el estado con los datos recibidos
                SetproductosJson(data);

                if (productosJson) {
                    //Records o resultados
                    let { records, fields } = productosJson;
                    //Se divide el array de productos(records) en grupos de 3
                    let lista = dividirArray(records, 3);
                    setListaProductos(lista);
                    setListaProdTemp(lista);

                    //Se reinicia el filtro de busqueda por nombre
                    document.getElementById("nomFiltroInput").value = '';
                    setNomFiltro('');
                }


            } catch (error) {
                // Manejamos cualquier error que pueda ocurrir
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchData();
    }, []);


    //UseEffect que Revisa el cambio en productosJson y actualiza la lista
    React.useEffect(() => {
        if (productosJson) {
            //Records o resultados
            let { records, fields } = productosJson;
            //Se divide el array de productos(records) en grupos de 3
            let lista = dividirArray(records, 3);
            setListaProductos(lista);
            setListaProdTemp(lista);

            //Se reinicia el filtro de busqueda por nombre
            document.getElementById("nomFiltroInput").value = '';
            setNomFiltro('');
        }
    }, [productosJson])

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
    var peticionProductos = (region, idCat, idSub) => {
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


    //Funcion para recibir la categoria elegida desde el categoryFilter
    const handleCatElegida = async (datos) => {
        //Si existe idCat es porque se seleccionó aunque sea una categoria
        if (datos.idCat) {
            const data = await peticionProductos('AND', datos.idCatPadre, datos.idCat);

            // Una vez que la promesa se resuelve, actualizamos el estado con los datos recibidos
            SetproductosJson(data);
        }
    }

    //Funcion para manejar el cambio de nomFiltro
    const handleNomFiltro = () => {
        const valorInput = document.getElementById("nomFiltroInput").value;
        setNomFiltro(valorInput);
    }


    return (
        <React.Fragment>
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
                                            <Form.Label>Cantidad actual : 3</Form.Label>
                                            <Form.Control size="sm" type="number" min="1" name="cantidad" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Control size="sm" type="hidden" placeholder="1" min="1" name="nombre" value={producto[0]} disabled readOnly />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Button variant="secondary" size="lg" type="submit" disabled={isBtnLoading}>
                                                {isBtnLoading ? 'Cargando...' : 'Agregar al inventario'}
                                            </Button>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                                <Button variant="secondary" size="lg" type="submit" disabled={isBtnLoading}>
                                                    {isBtnLoading ? 'Cargando...' : 'Quitar del inventario'}
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

export default GestionarInventario;