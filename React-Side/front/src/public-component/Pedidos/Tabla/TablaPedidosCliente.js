//TablaPedidosCliente muestra los pedidos de un cliente

import React, { useState } from 'react';

import { convertirMuchosDatos } from "../../../mapeo/Helpers/PedidoHelper";

import TableHeader from '../../JSONTable/Part/TableHeader';
import TableCell from '../../JSONTable/Part/TableCell';
import Alert from 'react-bootstrap/Alert';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import ModalFactura from '../Factura/ModalFactura';
import SimpleModal from '../../Modal/SimpleModal';

/*
HandlePedido es un handler de un componente padre para pasarle cuando se elije un pedido para pagar o ver detalles
HandlePedidoPrint es un handler del padre para pasarle cuando se elije un pedido para imprimir
*/
function TablaPedidosCliente({ handlePedido, handlePedidoPrint }) {

    //Estado del modal de impresión
    const [showModal, setShowModal] = useState(false);


    //Pedidos del cliente
    const [pedidos, setPedidos] = useState([]);

    //Mensaje de error
    const [ErroMessage, setMessage] = React.useState('');

    //Pedido seleccionado para imprimir
    const [pedidoSel, setPedidoSel] = React.useState({
        idPedido:'',
        calificacion:'',
        estado:''
    });

    //Posible estados
    const estados = {
        P :"Pendiente",
        S : "Sin calificar",
        F : "Finalizado"
    }
    
    //Campos que se verán en la tabla
    const headers = [
        { name: "Codigo del pedido" },
        { name: "Estado" }
    ];

    //Constantes para manejar la apertura y cierre del modal
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    /* Funcion para pasar al padre el pedido que se escoje */
    const handlePedidoElegido = (idPedido, isPago, estado, calificacion) => {
        handlePedido(idPedido, isPago, estado, calificacion);
    }

    /*Funcion para pasar el codigoPedido al modal */
    const handleModalFactura = (id, est, cal)=>{
        setPedidoSel({
            idPedido:id,
            calificacion:cal,
            estado:est
        });
        handleShow();
    }


    //Use effect inicial para cuando cargue la pagina
    React.useEffect(() => {
        const traerDatosIniciales = async () => {
            try {
                // Esperamos la resolución de la promesa usando await
                const data = await peticionPedidos();

                // Se consiguen los datos de los pedidos
                let petPedidos = convertirMuchosDatos(data.records, data.fields);
                setPedidos(petPedidos);

            } catch (error) {
                // Manejamos cualquier error que pueda ocurrir
                console.error('Error al obtener los datos:', error);
            }
        };

        traerDatosIniciales();

    }, []);

    //Peticion para traer la lista de pedidos
    var peticionPedidos = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/cliente/Pedidos', { "Serial": window.sessionStorage.getItem("Serial") })
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
            <Alert variant="light">Ver mis pedidos.</Alert>
            {/*Mensaje de error */}
            {ErroMessage && (
                <Alert variant="danger">{ErroMessage}</Alert>
            )}
            <Table responsive striped bordered hover variant="dark">
                <TableHeader headers={headers} extraHeaders={['Detalles','imprimir factura']}></TableHeader>
                <tbody>
                    {/* Se generan los datos de la tabla */}
                    {pedidos && pedidos.map((pedido, index) => (
                        <tr key={`t-${index}`}>
                            {/* mostrar las propiedades del pedido */}
                            <TableCell>{pedido.codigoPedido}</TableCell>
                            <TableCell>{estados[pedido.estado]}</TableCell>
                            <TableCell>
                                <Button variant="outline-light" onClick={() => handlePedidoElegido(pedido.codigoPedido, false, pedido.estado, pedido.calificacion )}>Ver detalles</Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="outline-light" onClick={() => handleModalFactura(pedido.codigoPedido,pedido.estado, pedido.calificacion)}>Imprimir</Button>
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/*Modal de factura */}
            
            <SimpleModal show={showModal} handleClose={handleClose} titulo={"Imprimir"} fullscreen={true}>
                <ModalFactura pedido={pedidoSel}></ModalFactura>
            </SimpleModal>
        </React.Fragment>
    );

}

export default TablaPedidosCliente