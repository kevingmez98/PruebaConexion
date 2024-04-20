//Componente que trae 
import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { convertirMuchosDatos as convertirClientes } from '../../../mapeo/Helpers/ClienteHelper';

/*
El codigo de pedido lo pasa el padre
*/
function PagoComponent({ idPedido }) {

    //Metodos de pago
    // (''e'') Efectivo, (''t'') Tarjeta de credito o debito, (''p'') PSE, (''b'') Transferencia bancaria
    const metodosPago = [
        { "value": "e", "nombre": "Efectivo" },
        { "value": "t", "nombre": "Tarjeta credito o debito" },
        { "value": "p", "nombre": "PSE" },
        { "value": "b", "nombre": "Transferencia bancaria" }
    ];

    //Datos temporales de un cliente
    const clienteTemp = [{
        n_username: 'Cl',
        k_doc_cliente: '2323',
        i_tipo_doc: 'CC',
        k_cod_ciudad: '1',
        n_primer_nombre: 'BRAD',
        n_segundo_nombre: '',
        n_primer_apellido: 'Martinez',
        n_segundo_apellido: '',
        o_email: 'Eso@gmail.com',
        q_num_telefono: '304348384',
        o_direccion: 'Cll 130'
    }]


    //codigo del pedido seleccionado
    const [pedidoSel, setPedidoSel] = useState('');

    //cliente activo
    const [cliente, setCliente] = useState('');

    //Metodo de pago seleccionado 
    const [metodoPago, setMetodo] = useState('');

    // Constante que cambia el valor del cliente activo
    const handleMetodoPago = () => {
        const valorInput = document.getElementById("metodoSel").value;
        setMetodo(valorInput);
        alert('Pagando ' + pedidoSel);
    }

    //Constante que maneja el cambio del pedido
    const handlePago = () =>{
        alert("AAcá se paga!");
    }

    //Use effect inicial para cuando cargue la pagina
    React.useEffect(() => {
        try {
            // Se consiguen los datos del cliente
            let cliente = convertirClientes(clienteTemp)[0];
            setCliente(cliente);
            setPedidoSel = idPedido;

        } catch (error) {
            // Manejamos cualquier error que pueda ocurrir
            console.error('Error al obtener los datos:', error);
        }

    }, []);

    //UseEffect para verificar el cambio en idPedido
    useEffect(() => {
        try {
            setPedidoSel(idPedido);
            console.log(idPedido);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }, [idPedido]);


    /*
        Primero se elige el medio de pago
        Luego se verifica la información del cliente
        Luego se hace la confirmación de pago
    */

    return (
        <React.Fragment>
            <Alert variant="light">Realizar pago del pedido
                {pedidoSel && (
                    pedidoSel
                )}
            </Alert>
            <br/>
            {/*Formulario de seleccion de metodo de pago */}
            <Form>
                <Form.Label>Metodo de pago:</Form.Label>
                <Form.Select id='metodoSel'>
                    {metodosPago && metodosPago.map((metodo, index) => (
                        <option key={index} value={metodo.value}>
                            {metodo.nombre}
                        </option>
                    ))};
                </Form.Select>
                <br />
                <div className="d-grid gap-2">
                    <Button variant="primary" onClick={handleMetodoPago} size="lg">Seleccionar</Button>
                </div>
            </Form>


            {/*Formulario con datos del cliente y metodo para confirmar pago*/}
            <Form>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Tipo documento:</Form.Label>
                            <Form.Label>{cliente.tipoDoc}</Form.Label>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Documento:</Form.Label>
                            <Form.Label>{cliente.docCliente}</Form.Label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Label>
                                {cliente.primerNombre} {cliente.segundoNombre} {cliente.primerApellido} {cliente.segundoApellido}
                            </Form.Label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Email: </Form.Label>
                            <Form.Label>
                                {cliente.email}
                            </Form.Label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>

                        <Form.Group>
                            <Form.Label>Numero de telefono </Form.Label>
                            <Form.Label>
                                {cliente.numTelefono}
                            </Form.Label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>

                        <Form.Group>
                            <Form.Label>Dirección: </Form.Label>
                            <Form.Label>
                                {cliente.direccion}
                            </Form.Label>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-grid gap-2">
                    <Button variant="outline-success" onClick={handlePago} size="lg">Realizar pago</Button>
                </div>
            </Form>

        </React.Fragment>


    );

}

export default PagoComponent;