import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { obtenerCarrito, actualizarCarrito } from "../../public-component/Product/Carrito/CarritoSession";
import SimpleProductCard from '../../public-component/Product/CardProduct/SimpleProductCard';
import Pedido from '../../mapeo/Pedido';
import Item from '../../mapeo/Item';
import Axios from 'axios';
import { dividirArray } from '../../public-component/Common-functions/ArrayFunct';

function GestionarCarritoRep() {
    const [isBtnLoading, setLoading] = useState(false);
    var [carrito, SetCarrito] = React.useState('');
    const [ErroMessage, setMessage] = React.useState('');
    var [listaProductos, setListaProductos] = React.useState([]);


    React.useEffect(() => {
        try {
            // Se consiguen los datos del carrito
            SetCarrito(obtenerCarrito("1"));
        } catch (error) {
            // Manejamos cualquier error que pueda ocurrir
            console.error('Error al obtener los datos:', error);
        }

    }, []);

    //Revisar el cambio en el carrito y actualizar la lista que se muestra

    React.useEffect(() => {
        if (carrito) {
            let records = carrito.productos;

            //Se divide el array de productos(records) en grupos de 3
            let lista = dividirArray(records, 3);
            setListaProductos(lista);
        }
    }, [carrito])

    const modificarProducto = (productoId, formId) => {
        try {
            //Congelar botones
            setLoading(true);

            //Obtener cantidad del formulario
            const prodForm = document.getElementById(formId);

            const cant = prodForm.elements["cantidad"].value;
            const nom = prodForm.elements["nombre"].value;
            if (cant >= 0) {
                setTimeout(() => {
                    setLoading(false);
                }, 1000); // Tiempo de espera

                actualizarCarrito("1", nom, productoId, cant, null, true)
                    .then((actualizacionExitosa) => {
                        if (actualizacionExitosa) {
                            alert(`Producto ${nom}. Actualizado a ${cant} unidades`);
                            SetCarrito(obtenerCarrito("1"));
                            if (cant != 0) {
                                prodForm.elements["cantidad"].value = cant;
                            }
                        } else {
                            alert('Hubo un error al actualizar el carrito.');
                        }
                    });

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

    function pagar() {
        let carrito = obtenerCarrito("1");
        let listaProd = carrito.productos;

        let pedido = new Pedido();

        for (let i = 0; i < listaProd.length; i++) {
            let item = new Item(listaProd[i].idProducto, listaProd[i].cantidad);
            pedido.agregarItem(item);
        }


        var peticion = () => {
            setMessage("");
            Axios.post('http://localhost:8080/cliente/CrearPedido', { "_items": pedido._items, "Serial": sessionStorage.getItem("Serial") })
                .then((response) => {

                    setMessage("Carrito enviado");
                    // Redireccion

                }
                ).catch((error) => {
                    setMessage(error.response.data.errors)
                })
        }
        peticion.call();
    }


    return (
        <React.Fragment>
            {/*Mensaje de error */}
            {ErroMessage && (
                <Alert variant="danger">{ErroMessage}</Alert>
            )}

            <Alert variant="secondary">Gestionar carrito del cliente</Alert>
           

            <p>Precio total: {carrito && carrito.total? carrito.total:0}</p>
            <div className="d-grid gap-2">
                <Button onClick={pagar}>Pagar</Button>
            </div>
            {/*Recorrer la lista de productos agregados al carrito */}
            {listaProductos.map((grupoProd, index) => (
                <Row key={index}>
                    {grupoProd.map((producto, ix) => (
                        <Col key={`${index}-${ix}`}>
                            <SimpleProductCard idProd={producto.idProducto} nomProducto={producto.nombreProducto} precio={producto.precio} key={index}>
                                <Form id={`form-prod-${index}-${ix}`}>
                                    <Form.Label htmlFor={`cant-${index}-${ix}`}>Cantidad actual en el carrito: {producto.cantidad}</Form.Label>
                                    <br />
                                    <Form.Control type='number'
                                        defaultValue={producto.cantidad}
                                        min={0}
                                        max={producto.cantidad}
                                        name="cantidad"
                                        className='mb-3 '
                                        id={`cant-${index}-${ix}`}
                                    />
                                    <Form.Group className="mb-3">
                                        <Form.Control size="sm" type="hidden" name="nombre" value={producto.nombreProducto} disabled readOnly />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Button variant="secondary" size="lg" type="submit" disabled={isBtnLoading}
                                            onClick={() => modificarProducto(`${producto.idProducto}`, `form-prod-${index}-${ix}`)}>
                                            {isBtnLoading ? 'Cargando...' : 'Modificar cantidad'}
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </SimpleProductCard>

                        </Col>
                    )
                    )}
                </Row>
            ))
            }
        </React.Fragment>
    )
}

export default GestionarCarritoRep;