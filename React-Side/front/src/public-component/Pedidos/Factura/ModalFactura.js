import React, { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import Alert from 'react-bootstrap/Alert';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import TableHeader from '../../JSONTable/Part/TableHeader';
import TableCell from '../../JSONTable/Part/TableCell';

import Table from 'react-bootstrap/Table';

import { convertirMuchosDatos as convertirItems, asignarProductos } from '../../../mapeo/Helpers/ItemHelper';
import { convertirMuchosDatos as convertirProductos } from '../../../mapeo/Helpers/ProductoHelper';
import { convertirMuchosDatos as convertirRegiones } from '../../../mapeo/Helpers/RegionHelper';


import { calcularTotalPedidoItems } from '../../Common-functions/operacionesPedido';
import VistaPagoComponent from '../Pago/VistaPagoComponent';

function ModalFactura({ pedido }) {

    const modalContentRef = useRef(null);

    //codigo del pedido seleccionado
    const [pedidoSel, setPedidoSel] = useState('');

    //Precio total del pedido
    const [precioPedido, setPrecio] = useState(0);


    //Estado pedido
    const [estadoPedido, setEstadoSel] = useState(0);


    //Calificacion pedido
    const [calificacion, setCalificacion] = useState(0);

    //Mensaje de error
    const [ErroMessage, setMessage] = useState('');

    //Region de los items
    const [region, setRegion] = useState('');

    //Items del pedido
    const [items, setItems] = useState([]);

    //Campos que se verán en la tabla de productos
    const headers = [
        { name: "Producto" },
        { name: "Cantidad" },
        { name: "precio unitario" }
    ];

    //Posible estados
    const estados = {
        P: "Pendiente",
        S: "Sin calificar",
        F: "Finalizado"
    }

    //UseEffect para verificar el cambio en codPedido
    useEffect(() => {
        const traerItemsPedido = async () => {
            try {
                //Verificar que el pedido sea valido
                console.log(pedido);
                if (pedido && Object.keys(pedido).length > 0) {
                    //Se asigna el id del pedido recibido
                    setPedidoSel(pedido.idPedido);
                    setCalificacion(pedido.calificacion);
                    setEstadoSel(pedido.estado);
                }
            } catch (error) {
                // Manejamos cualquier error que pueda ocurrir
                setMessage(error);
            }
        };
        traerItemsPedido();
    }, [pedido]);

    //UseEffect para verificar el cambio en la variable de PedidoSel
    useEffect(() => {
        const traerItemsPedido = async () => {
            try {
                //Verificar que pedidoSel sea valido
                if (pedidoSel) {
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

                    //Calcular y asignar el precio total del pedido
                    setPrecio(calcularTotalPedidoItems(petItems));

                }

            } catch (error) {
                // Manejamos cualquier error que pueda ocurrir
                setMessage(error);
            }
        };
        traerItemsPedido();
    }, [pedidoSel]);


    //Peticion para traer la lista de items
    var peticionItems = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/cliente/itemspedido', { "Serial": window.sessionStorage.getItem("Serial"), "Utilitary": pedidoSel })
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




    const handlePrint = () => {
        if (estadoPedido == "P") {
            alert("No se puede generar una factura de un pedido sin pagar");
        } else {
            window.print();
        }

    };

    return (
        <>
            {/*Mensaje de error */}
            {ErroMessage && (
                <Alert variant="danger">{ErroMessage}</Alert>
            )}
            <Alert variant="primary">Pedido: {pedidoSel}</Alert>
            <Row>
                <Col>  <label><strong>{region.nomRegion}</strong></label></Col>
                <Col>
                    {calificacion && (
                        <label><strong>Calificacion: </strong>{calificacion}</label>
                    )}
                </Col>
            </Row>
            <Row>

                <Col>  <label><strong>Estado del pedido:</strong>{estados[estadoPedido]}</label></Col>
            </Row>
            <hr />

            <Row>
                {pedidoSel && estadoPedido != 'P' && (
                    <VistaPagoComponent idPedido={pedidoSel}></VistaPagoComponent>
                )}
            </Row>
            <Alert variant="primary">Productos</Alert>

            <hr />

            {items.length === 0 ? (
    <p>No hay productos disponibles que cumplan con los criterios</p>
) : (
    <Table responsive striped bordered hover variant="light">
        <TableHeader headers={headers} extraHeaders={''}></TableHeader>
        <tbody>
            {items.map((item, i) => (
                <tr key={i}>
                    <TableCell>{item.producto.nomProducto}</TableCell>
                    <TableCell>{item.cantidad}</TableCell>
                    <TableCell>{item.producto.precioUnitario}</TableCell>
                </tr>
            ))}
        </tbody>
    </Table>
)}



            <hr />
            <label><strong>Total del pedido:</strong> {precioPedido}</label>
            <br />
            <hr />
            <div className="d-grid gap-2">
                <Button variant="secondary" size="lg" onClick={() => handlePrint()}>Imprimir</Button>
            </div>

        </>
    );

}

export default ModalFactura;
