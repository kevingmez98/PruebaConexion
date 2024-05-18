
import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

    //estado del pedido que se selecciona
    const [estadoPedido, setEstadoPedido] = useState('');

    //Precio total del pedido seleccionado
    const [precioPedidoSel, setPrecioSel] = useState(0)

    //Calificación del pedido que se selecciona
    const [calificacionPed, setCalificacion] = useState('');

    // Función para volver a la vissta de tabla
    const cambiarVista = () => {
        setPedidoSelect(false);
        setPagarSelect(false);
    };


    //Constante que cambia el valor del id del pedido elegido
    const handlePedidoElegido = async (idPedido, isPagar, estado, calificacion, precioPedido) => {

        //Si es para pagar se muestra la vista correspondiente
        if (isPagar) {
            setPedidoSelect(false);
            setPagarSelect(true);
        } else {
            setPedidoSelect(true);
            setPagarSelect(false);
        }

        //Se asigna estado, id, calificacion y precio del pedido
        setPedidoElegido(idPedido);
        setEstadoPedido(estado);
        if(calificacion){
            setCalificacion(calificacion);
        }
        if(precioPedido){
            setPrecioSel(precioPedido);
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
                    <DetallesPedido handlePedido={handlePedidoElegido} idPedido={pedidoElegido} estadoPedido={estadoPedido} calificacion={calificacionPed}></DetallesPedido>
                </React.Fragment>
            ) : isPagarSelect ? (
                <React.Fragment>

                    <Button variant="outline-secondary" onClick={cambiarVista}>
                        {isPagarSelect ? 'Volver a mis pedidos' : 'VER PAGO'}
                    </Button>
                    <Row>
                        <Col></Col>
                        <Col className='div-pago'>
                            <PagoComponent idPedido={pedidoElegido} totalPedido={precioPedidoSel} />
                        </Col>
                        <Col></Col>
                    </Row>
                </React.Fragment>
            ) : null}



        </React.Fragment>

    )
}

export default GestionarCompras;