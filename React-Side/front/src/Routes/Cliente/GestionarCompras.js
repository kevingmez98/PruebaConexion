
import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import TablaPedidosCliente from "../../public-component/Pedidos/Tabla/TablaPedidosCliente";
import DetallesPedido from '../../public-component/Pedidos/Detalles/DetallesPedido';
function GestionarCompras() {

    //Mensaje de error
    const [ErroMessage, setMessage] = React.useState('');

    //pedido elegido para ver detalles
    const [pedidoElegido, setPedidoElegido] = useState('');

    //boolean para ocultar o no un detalle de pedido
    const [isPedidoSelect, setPedidoSelect] = useState(false);

    // Función para cambiar entre la vista de tabla y vistaDetalle
    const cambiarVista = () => {
        setPedidoSelect(!isPedidoSelect);
    };


    //Constante que cambia el valor del id del pedido elegido
    const handlePedidoElegido = async (idPedido, isPagar) => {
        if (isPagar) {
            alert('pagar!!!' + idPedido);
            setPedidoSelect(false)
        } else {
            alert('detalles!!! ' + idPedido);
            setPedidoElegido(idPedido);
            cambiarVista();
        }
    }



    return (
        <React.Fragment>
            <Alert variant="secondary">Gestión de pedidos.</Alert>


            {!isPedidoSelect ? (
                <TablaPedidosCliente handlePedido={handlePedidoElegido}></TablaPedidosCliente>
            ) : (
                <React.Fragment>
                    <Button variant="outline-secondary" onClick={cambiarVista}>
                        {isPedidoSelect ? 'Volver a mis pedidos' : 'Ver detalle'}
                    </Button>
                    <DetallesPedido handlePedido={handlePedidoElegido} idPedido={pedidoElegido}></DetallesPedido>
                </React.Fragment>


            )}



        </React.Fragment>

    )
}

export default GestionarCompras;