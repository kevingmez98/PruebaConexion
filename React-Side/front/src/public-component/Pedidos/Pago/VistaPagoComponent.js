//Componente que trae los elementos necesarios para solamente ver un pago
import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { convertirMuchosDatos as convertirPagos } from '../../../mapeo/Helpers/PagoHelper';
import { convertirDatos } from '../../../mapeo/Helpers/PedidoHelper';

/*
El codigo de pedido lo pasa el padre
*/


function VistaPagoComponent({idPedido}) {

    //Metodos de pago
    // (''e'') Efectivo, (''t'') Tarjeta de credito o debito, (''p'') PSE, (''b'') Transferencia bancaria
    const metodosPago = [
        { "value": "e", "nombre": "Efectivo" },
        { "value": "t", "nombre": "Tarjeta credito o debito" },
        { "value": "p", "nombre": "PSE" },
        { "value": "b", "nombre": "Transferencia bancaria" }
    ];
      //Datos temporales de un pago
      const pagoTemp ={
        "records": [
            [
                "493993",
                "7/04/2021",
                "t",
                "309393"
            ]
        ],
        "fields": [
            {
                "name": "K_COD_PAGO",
                "type": "OTHER"
            },
            {
                "name": "F_FECHA",
                "type": "OTHER"
            },
            {
                "name": "I_METODO",
                "type": "OTHER"
            },
            {
                "name": "Q_Valor",
                "type": "OTHER"
            }
        ]
    }

    //Mensaje de error
    const [ErroMessage, setMessage] = React.useState('');

    //pago del pedido seleccionado
    const [pago, setPago] = useState('');

    //Valor de metodo de pago seleccionado 
    const [metodoPago, setMetodo] = useState('');


    
    //Use effect inicial para cuando cargue el componente
    React.useEffect(() => {
        const traerDatos = async () => {
            try {
                console.log(idPedido);
                //Se espera la promesa de la peticion 
                const dataPago = await peticionDatosPago();
                // Se consiguen los datos del cliente
                let pagoPet = convertirPagos(dataPago.records, dataPago.fields)[0];
                // let pagoPet = convertirPagos(pagoTemp.records, pagoTemp.fields)[0];;
                setPago(pagoPet);
                console.log(pagoTemp);
                console.log(dataPago);

                //Colocar el metodo correspondiente
                let metodoSeleccionado = metodosPago.find(metodo => metodo.value === pagoPet.metodoPago);
                
                setMetodo(metodoSeleccionado.nombre);

            } catch (error) {
                // Manejamos cualquier error que pueda ocurrir
                console.error('Error al obtener los datos:', error);
                setMessage(error);
            }
        };
        traerDatos();

    }, []);

    //Peticion para conseguir datos del pago
    var peticionDatosPago = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/cliente/detallePago', { "serial": window.sessionStorage.getItem("Serial"), "codPedido": idPedido})
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


    return(
        <React.Fragment>
            <Alert variant="light">Detalles del pago
                {pago && (
                    ' ' + pago.codigoPago
                )}
            </Alert>
            {ErroMessage && (
                <Alert variant="danger">{ErroMessage}</Alert>
            )}
            <hr />
            {/*Formulario de seleccion de metodo de pago */}
            <Form>
                <Form.Label>Total a pagar: {pago.valorPago}</Form.Label>
                <br/>
                <Form.Label>Metodo de pago:{metodoPago}</Form.Label>
                <br/>
                <Form.Label>Fecha de pago: {pago.fecha}</Form.Label>

            </Form>
            <hr />  

        </React.Fragment>

    );
}

export default VistaPagoComponent;
