
import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import TablaPedidosCliente from "../../public-component/Pedidos/Tabla/TablaPedidosCliente";
import DetallesPedido from '../../public-component/Pedidos/Detalles/DetallesPedido';
import PagoComponent from '../../public-component/Pedidos/Pago/PagoComponent';
function GestionarCompras() {

    //pedido elegido para ver detalles
    const [pedidoElegido, setPedidoElegido] = useState('');

    //boolean para ocultar o no un detalle de pedido
    const [isPedidoSelect, setPedidoSelect] = useState(false);

    //boolean para mostrar el pago
    const [isPagarSelect, setPagarSelect] = useState(false);

    // Función para volver a la vissta de tabla
    const cambiarVista = () => {
        setPedidoSelect(false);
        setPagarSelect(false);
    };


    //Constante que cambia el valor del id del pedido elegido
    const handlePedidoElegido = async (idPedido, isPagar) => {
        if (isPagar) {
            setPedidoElegido(idPedido);
            setPedidoSelect(false);
            setPagarSelect(true);
        } else {
            setPedidoElegido(idPedido);
            setPedidoSelect(true);
            setPagarSelect(false);
        }
    }



    return (
        <React.Fragment>
            <Alert variant="secondary">Gestión de pedidos.</Alert>
            <br/>
            {!isPedidoSelect && !isPagarSelect ? (
                <TablaPedidosCliente handlePedido={handlePedidoElegido}></TablaPedidosCliente>
            ) : isPedidoSelect && !isPagarSelect ? (
                <React.Fragment>
                    <Button variant="outline-secondary" onClick={cambiarVista}>
                        {isPedidoSelect ? 'Volver a mis pedidos' : 'Ver detalle'}
                    </Button>
                    <DetallesPedido handlePedido={handlePedidoElegido} idPedido={pedidoElegido}></DetallesPedido>
                </React.Fragment>
            ) : isPagarSelect ? (
                <React.Fragment>

                    <Button variant="outline-secondary" onClick={cambiarVista}>
                        {isPagarSelect ? 'Volver a mis pedidos' : 'VER PAGO'}
                    </Button>
                    <PagoComponent codPedido={pedidoElegido} idPedido={pedidoElegido} />
                </React.Fragment>
            ) : null}



        </React.Fragment>

    )
}

export default GestionarCompras;