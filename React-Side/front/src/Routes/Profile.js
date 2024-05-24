import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import Alert from 'react-bootstrap/Alert';

import { convertirDatos, convertirMuchosDatos } from '../mapeo/Helpers/UserHelper';
import CardComponent from '../public-component/Card/DarkCard/CardComponent';

function Profile() {


    //Usuario activo
    const [usuario, setUsuario] = useState('');

    //Mensaje de error
    const [ErroMessage, setMessage] = React.useState('');

    //UseEffect inicial
    useEffect(() => {
        //Se llama la peticion de usuario
        async function fetchData() {
            // Esperamos la resolución de la promesa usando await
            const data = await peticionUser();
            // Una vez que la promesa se resuelve, se crea un objeto Persona y se le asigna el nombre
            //Solo se espera recibir un usuario, por eso se usa el primer resultado
            if (data) {
                let usuario = convertirMuchosDatos(data.records, data.fields)[0];
                console.log(usuario);
                console.log(data);
                setUsuario(usuario);
            }

        }
        fetchData();
    }, []); // El segundo argumento del useEffect vacío asegura que este efecto se ejecute solo una vez al montar el componente



    //Peticion para traer al usuario
    var peticionUser = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/Login/datosbasicos', { "Serial": window.sessionStorage.getItem("Serial") })
                .then((response) => {
                    // Resolvemos la promesa con los datos recibidos
                    resolve(response.data);
                })
                .catch((error) => {
                    // Rechazamos la promesa con el mensaje de error
                    if (error.response) {
                        setMessage(error.response.data.errors);
                    } else {
                        setMessage("error en la peticion de la busqueda del usuario");
                    }
                });
        });
    };

    return (
        <React.Fragment>

            <Alert variant="secondary">Verificando datos del perfil</Alert>
            {/*Mensaje de error */}
            {ErroMessage && (
                <CardComponent titulo={"Error"}>
                    <Alert variant="danger">{ErroMessage}</Alert>
                </CardComponent>
            )}
            {usuario && (
                <Form>
                    <Form.Group>
                        <Form.Label>Ciudad: </Form.Label>
                        <Form.Label>{usuario.ciudad}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Primer Nombre: </Form.Label>
                        <Form.Label>{usuario.primerNombre}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Segundo Nombre: </Form.Label>
                        <Form.Label>{usuario.segundoNombre}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Primer Apellido: </Form.Label>
                        <Form.Label>{usuario.primerApellido}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Segundo apellido: </Form.Label>
                        <Form.Label> {usuario.segundoApellido}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Correo:</Form.Label>
                        <Form.Label>{usuario.correo}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Telefono:</Form.Label>
                        <Form.Label>{usuario.numTelefono}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Direccion registrada:</Form.Label>
                        <Form.Label>{usuario.direccion}</Form.Label>
                    </Form.Group>
                </Form>
            )}
        </React.Fragment>
    )
}

export default Profile;