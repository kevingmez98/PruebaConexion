import React from 'react';
import Axios from 'axios';

import TableHeader from '../../public-component/JSONTable/Part/TableHeader';
import TableCell from '../../public-component/JSONTable/Part/TableCell';


import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import Usuario from "../../mapeo/Classes/Usuario";
import { convertirMuchosDatos, concatenarNombre } from "../../mapeo/Helpers/UserHelper"
function GestionarRepCl() {
    const [ErroMessage, setMessage] = React.useState('');
    var [jsonData, SetjsonData] = React.useState('');

    //Variable usuario representante
    var [representante, setRepresentante] = React.useState('');

    //Variable con el nombre completo del representante
    var [nomRepresentante, setNomRep] = React.useState('');

    //Campos que se verán en la tabla
    const headers = [
        { name: "Nombre" },
        { name: "Telefono" },
        { name: "Correo electronico" }
    ];



    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // Esperamos la resolución de la promesa usando await
                const data = await peticion();

                // Una vez que la promesa se resuelve, actualizamos el estado con los datos recibidos
                SetjsonData(data);

            } catch (error) {
                // Manejamos cualquier error que pueda ocurrir
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, []);

    //UseEffect que Revisa el cambio en dataJson y actualiza las variables
    React.useEffect(() => {
        if (jsonData) {
            //Se convierte la respuesta a clase usuario
            let userRep = convertirMuchosDatos(jsonData.records, jsonData.fields)[0];
            setRepresentante(userRep);
        }
    }, [jsonData]);

    //UseEffeect que revisa el cambio en representante
    React.useEffect(() => {
        if (representante) {
            setNomRep(concatenarNombre(representante));
        }
    }, [representante]);



    var peticion = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/cliente/representanteAsignado', { "Serial": window.sessionStorage.getItem("Serial") })
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
            <Alert variant="light">¿Quien es mi representante?</Alert>
            {/*Mensaje de error */}
            {ErroMessage && (
                <Alert variant="danger">{ErroMessage}</Alert>
            )}

            <Table responsive striped bordered hover variant="dark">
                <TableHeader headers={headers} extraHeaders={['Acciones']}></TableHeader>
                <tbody>
                    {/* Se generan los datos de la tabla */}
                    {representante && (
                        <tr>
                            {/* mostrar las propiedades del pedido */}
                            <TableCell>{nomRepresentante}</TableCell>
                            <TableCell>{representante.numTelefono}</TableCell>
                            <TableCell>{representante.correo}</TableCell> 
                            <TableCell><Button>Cambiar</Button></TableCell>
                        </tr>
                    )}
                </tbody>
            </Table>
        </React.Fragment>
    )
}

export default GestionarRepCl;