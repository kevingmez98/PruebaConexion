//TablaPedidosCliente muestra los pedidos de un cliente

import React, { useEffect, useState } from 'react';

import { convertirMuchosDatos } from "../../../mapeo/Helpers/PedidoHelper";

import TableHeader from '../../JSONTable/Part/TableHeader';
import TableCell from '../../JSONTable/Part/TableCell';
import Alert from 'react-bootstrap/Alert';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

/*
HandlePedido es un handler de un componente padre para pasarle cuando se elije un pedido para pagar o ver detalles
*/
function TablaPedidosCliente({ handlePedido }) {

    //Pedidos del cliente
    const [pedidos, setPedidos] = useState([]);

    //Variable temporal con pedidos

    const pedidosTemp = [
        {
            "k_cod_pedido": "100",
            "i_estado": "P"
        },
        {
            "k_cod_pedido": "102",
            "i_estado": "P"
        },
        {
            "k_cod_pedido": "103",
            "i_estado": "P"
        },
        {
            "k_cod_pedido": "104",
            "i_estado": "P"
        }
    ];

    //Campos que se verán en la tabla
    const headers = [
        { name: "Codigo del pedido" },
        { name: "Estado" }
    ];

    /* Funcion para pasar al padre el pedido que se escoje */
    const handlePedidoElegido = (idPedido, isPago) => {
        handlePedido(idPedido, isPago);
    }

    //Use effect inicial para cuando cargue la pagina
    React.useEffect(() => {
        try {
            // Se consiguen los datos de los pedidos
            let petPedidos = convertirMuchosDatos(pedidosTemp);
            setPedidos(petPedidos);

        } catch (error) {
            // Manejamos cualquier error que pueda ocurrir
            console.error('Error al obtener los datos:', error);
        }

    }, []);

    return (
        <React.Fragment>
            <Alert variant="light">Ver mis pedidos.</Alert>
            <Table responsive striped bordered hover variant="dark">
                <TableHeader headers={headers} extraHeaders={['Detalles', 'Pago']}></TableHeader>
                <tbody>
                    {/* Se generan los datos de la tabla */}
                    {pedidos && pedidos.map((pedido, index) => (
                        <tr key={`t-${index}`}>
                            {/* mostrar las propiedades del pedido */}
                            <TableCell>{pedido.codigoPedido}</TableCell>
                            <TableCell>{pedido.estado}</TableCell>
                            <TableCell>
                                <Button variant="outline-light" onClick={() => handlePedidoElegido(pedido.codigoPedido, false)}>Ver detalles</Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="outline-success" onClick={() => handlePedidoElegido(pedido.codigoPedido, true)}>Pagar</Button>
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </React.Fragment>
    );

}

export default TablaPedidosCliente