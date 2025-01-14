import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { dividirArray } from '../../../public-component/Common-functions/ArrayFunct'
import { calcularTotalPedidoItems } from '../../Common-functions/operacionesPedido';
import SimpleProductCard from '../../../public-component/Product/CardProduct/SimpleProductCard';

import { convertirMuchosDatos as convertirItems, asignarProductos } from '../../../mapeo/Helpers/ItemHelper';
import { convertirMuchosDatos as convertirProductos } from '../../../mapeo/Helpers/ProductoHelper';
import { convertirMuchosDatos as convertirRegiones } from '../../../mapeo/Helpers/RegionHelper';
import CalificacionComponent from '../Calificacion/CalificacionComponent';
import VistaPagoComponent from '../Pago/VistaPagoComponent';
/*
HandlePedido es un handler de un componente padre para pasarle cuando se elije un pedido para pagar

*/
function DetallesPedido({ handlePedido, idPedido, estadoPedido, calificacion }) {

    //Items del pedido
    const [items, setItems] = useState([]);

    //Lista con los items organizados
    const [itemsOrg, setItemsOrg] = useState([]);

    //codigo del pedido seleccionado
    const [pedidoSel, setPedidoSel] = useState('');

    //Estado pedido
    //Estado en el que se encuentra el pedido: Pendiente de pago ('P'), finalizada ('F') o sin calificar ('S')

    const [estadoSel, setEstadoSel] = useState('');

    //Estado pedido
    const [calificacionPedido, setCalificacion] = useState('');

    //Precio total del pedido
    const [precioPedido, setPrecio] = useState(0)

    //Mensaje de error
    const [ErroMessage, setMessage] = useState('');

    //Region de los items
    const [region, setRegion] = useState('');


    /* Funcion para pasar al padre el pedido y el precio que se pagaria*/
    const handlePagoPedido = () => {
        handlePedido(idPedido, true, null, null, precioPedido);
    }

    //UseEffect para verificar el cambio en idPedido
    useEffect(() => {
        const traerItemsPedido = async () => {
            try {

                //Se asigna el id del pedido recibido
                setPedidoSel(idPedido);

                //Se asigna el estado del pedido
                setEstadoSel(estadoPedido);

                //Se asigna la calificacion del pedido
                setCalificacion(calificacion);

                // Esperamos la resolución de la promesa usando await
                const data = await peticionItems();

                // Una vez que la promesa se resuelve, actualizamos el estado con los datos recibidos

                //Acá se convierte la peticion a instancias de item
                let petItems = convertirItems(data.records, data.fields);

                /*
                Se convierten los datos disponibles de productos.
                */
                let petProductos = convertirProductos(data.records, data.fields);

                //Se asignan los productos a los items por medio del helper
                petItems = asignarProductos(petProductos, petItems);
                setItems(petItems);

                //se convierten los datos disponibles de region a un conjunto de region
                let region = convertirRegiones(data.records, data.fields)[0];
                setRegion(region);

                //Se organizan los items en grupos de 3 para mostrarse en la vista
                setItemsOrg(dividirArray(petItems, 3));

                //Calcular y asignar el precio total del pedido
                setPrecio(calcularTotalPedidoItems(petItems));

            } catch (error) {
                // Manejamos cualquier error que pueda ocurrir
                console.error('Error al obtener los datos:', error);
            }
        };
        traerItemsPedido();
    }, [idPedido]);

    //Peticion para traer la lista de items
    var peticionItems = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/cliente/itemspedido', { "Serial": window.sessionStorage.getItem("Serial"), "Utilitary": idPedido })
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




    return (
        <React.Fragment>
            <Alert variant="light">Ver detalles del pedido
                {pedidoSel && (
                    ' ' + pedidoSel
                )} de la
                {region && (
                    ' ' + region.nomRegion
                )}
            </Alert>
            {ErroMessage && (
                <Alert variant="danger">{ErroMessage}</Alert>
            )}
            <Row>
                <Col></Col>
                <Col>

                    {estadoPedido == 'F' ? (
                        /*Estado finalizado, se muestra solo la calificación e items*/
                        <React.Fragment>
                            <h4>Finalizado</h4>
                            <h3>Puntuación: {calificacion}</h3>
                            {/*Datos del pago */}
                            <VistaPagoComponent idPedido={idPedido}></VistaPagoComponent>
                        </React.Fragment>
                    ) : estadoPedido == 'P' ? (
                        /*Estado pendiente, se muestra solo boton para pagar e items*/
                        <React.Fragment>
                            <h4>Pendiente</h4>
                            <Button variant="outline-info" size="lg" onClick={() => handlePagoPedido()}>
                                Pagar pedido
                            </Button>
                        </React.Fragment>

                    ) : estadoPedido == 'S' ? (
                        /*Estado pendiente de calificación, se muestra solo calificacion e items*/
                        <React.Fragment>
                            <h4>Pendiente de calificación</h4>
                            <CalificacionComponent idPedido={pedidoSel} estadoPedido={estadoPedido}></CalificacionComponent>
                        </React.Fragment>
                    ) : null
                    }
                </Col>

                <Col></Col>
            </Row>
            <h4>Total del pedido: {precioPedido}</h4>
            <hr/>
            <h4>Productos del pedido</h4>
            {itemsOrg.length === 0 ? (
                <p>No hay productos disponibles que cumplan con los criterios</p>
            ) : (
                itemsOrg.map((grupoItem, index) => (
                    <Row key={index}>
                        {grupoItem.map((item, i) => (
                            <Col key={i}>
                                <SimpleProductCard idProd={item.codProducto} nomProducto={item.producto.nomProducto} precio={item.producto.precioUnitario}>
                                    <Form id={`form-prod-${index}-${i}`}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Cantidad: {item.cantidad}</Form.Label>
                                        </Form.Group>
                                    </Form>
                                </SimpleProductCard>
                            </Col>
                        ))}
                    </Row>
                ))

            )}


        </React.Fragment>

    );
}

export default DetallesPedido;