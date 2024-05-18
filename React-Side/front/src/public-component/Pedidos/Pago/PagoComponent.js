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
function PagoComponent({ idPedido, totalPedido }) {

    //Metodos de pago
    // (''e'') Efectivo, (''t'') Tarjeta de credito o debito, (''p'') PSE, (''b'') Transferencia bancaria
    const metodosPago = [
        { "value": "e", "nombre": "Efectivo" },
        { "value": "t", "nombre": "Tarjeta credito o debito" },
        { "value": "p", "nombre": "PSE" },
        { "value": "b", "nombre": "Transferencia bancaria" }
    ];


    //Mensaje de error
    const [ErroMessage, setMessage] = React.useState('');

    //codigo del pedido seleccionado
    const [pedidoSel, setPedidoSel] = useState('');

    //cliente activo
    const [cliente, setCliente] = useState('');

    //Metodo de pago seleccionado 
    const [metodoPago, setMetodo] = useState('');

    //Direccion de un cliente, este campo es porque se puede editar para el pago
    const [direccionCliente, setDireccion] = useState('');

    // Constante que cambia el valor del cliente activo
    const handleMetodoPago = () => {
        const valorInput = document.getElementById("metodoSel").value;
        setMetodo(valorInput);
    }

    //Constante que maneja el cambio del pedido
    const handlePago = async() => {
        if (direccionCliente && metodoPago) {
            // Busca el objeto en metodosPago que coincida con el valor seleccionado
            const metodoSeleccionado = metodosPago.find(metodo => metodo.value === metodoPago);
            console.log(metodoPago)
            await peticionPago();
            alert("entregando a " + direccionCliente + " va a pagar con " + metodoSeleccionado.nombre);
            window.location.reload();

        } else {
            alert("Verifique los campos");
        }

    }

    //Use effect inicial para cuando cargue la pagina
    React.useEffect(() => {
        const traerDatos = async () => {
            try {
                //Se espera la promesa de peticion cliente
                const dataCl = await peticionCliente();
                // Se consiguen los datos del cliente
                let cl = convertirClientes(dataCl.records, dataCl.fields)[0];
                setCliente(cl);
                setDireccion(cl.direccion);
                setPedidoSel(idPedido);

            } catch (error) {
                // Manejamos cualquier error que pueda ocurrir
                console.error('Error al obtener los datos:', error);
                setMessage(error);
            }
        };
        traerDatos();

    }, []);

    //UseEffect para verificar el cambio en idPedido
    useEffect(() => {
        try {
            setPedidoSel(idPedido);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }, [idPedido]);

    //Handler de la dirección del cliente
    const handleDireccion = (event) => {
        setDireccion(event.target.value);
    }

    //Peticion para conseguir datos del cliente
    var peticionCliente = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/cliente/datos', { "Serial": window.sessionStorage.getItem("Serial") })
                .then((response) => {
                    // Resolvemos la promesa con los datos recibidos
                    resolve(response.data);
                })
                .catch((error) => {
                    // Rechazamos la promesa con el mensaje de error
                    setMessage(error.response.data.errors);
                });
        });
    }

    /*Peticion para realizar el pago. 
        Envia el id del pedido, el precio total, el meetodo de pago y la sesión activa */
    var peticionPago = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/cliente/PagarPedido', 
                    {
                     "codPedido":idPedido, "serial": window.sessionStorage.getItem("Serial"), "metodoP":metodoPago,
                     "valor": totalPedido
                     })
                .then((response) => {
                    // Resolvemos la promesa con los datos recibidos
                    resolve(response.data);
                })
                .catch((error) => {
                    // Rechazamos la promesa con el mensaje de error
                    setMessage(error.response.data.errors);
                });
        });
    }

    return (
        <React.Fragment>
            <Alert variant="light">Realizar pago del pedido
                {pedidoSel && (
                    ' ' + pedidoSel
                )}
            </Alert>
            {ErroMessage && (
                <Alert variant="danger">{ErroMessage}</Alert>
            )}
            <hr />
            {/*Formulario de seleccion de metodo de pago */}
            <Form>
                <Form.Label>Total a pagar: {totalPedido}</Form.Label>
                <br/>
                <Form.Label>Metodo de pago:</Form.Label>
                <Form.Select id='metodoSel' onChange={handleMetodoPago} required>
                    <option>Seleccione</option>
                    {metodosPago && metodosPago.map((metodo, index) => (
                        <option key={index} value={metodo.value}>
                            {metodo.nombre}
                        </option>
                    ))};
                </Form.Select>

            </Form>
            <hr />  

            {/*Formulario con datos del cliente y metodo para confirmar pago*/}
            <Form>
                <label><strong>Datos del cliente</strong></label>
                <br/>  
                <br/>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label className='mb-0'>Tipo documento: </Form.Label>
                            <span className="ms-2">{cliente.tipoDoc}</span>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label className='mb-0'>Documento: </Form.Label>
                            <span className="ms-2">  {cliente.docCliente}</span>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label className='mb-0'>Nombre:</Form.Label>
                            <span className="ms-2">
                                {cliente.primerNombre} {cliente.segundoNombre} {cliente.primerApellido} {cliente.segundoApellido}
                            </span>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label className='mb-0'>Email: </Form.Label>
                            <span className="ms-2">
                                {cliente.email}
                            </span>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>

                        <Form.Group>
                            <Form.Label className='mb-0'>Numero de telefono: </Form.Label>
                            <span className="ms-2">
                                {cliente.numTelefono}
                            </span>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>

                        <Form.Group>
                            <Form.Label className='mb-0'>Dirección de entrega: </Form.Label>
                            <Form.Control
                                id="dir-cliente"
                                value={direccionCliente}
                                onChange={handleDireccion}
                                required>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <br />
                <div className="d-grid gap-2">
                    <Button variant="outline-success" onClick={handlePago} size="lg">Realizar pago</Button>
                </div>
            </Form>

        </React.Fragment>


    );

}

export default PagoComponent;