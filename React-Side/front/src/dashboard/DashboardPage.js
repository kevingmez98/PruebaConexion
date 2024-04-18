import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Axios from 'axios';

import SideBarComponent from "./SideBar/SideBarComponent";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { convertirDatosParcial } from '../mapeo/Helpers/UserHelper';

import './CSS/dashboard-styles.css';
import './CSS/own-dashboard-styles.css';



function DashBoardPage() {

     //Ocultar y mostrar la barra lateral (responsive)
     const [isOpen, setIsOpen] = useState(false);

     //Nombre del usuario activo
     const [nombre, setNombre] = useState('');
     
    //Mensaje de error
    const [ErroMessage, setMessage] = React.useState('');

    useEffect(() => {
        //Se llama la peticion de usuario
        async function fetchData() {
                // Esperamos la resolución de la promesa usando await
                const data = await peticionUser();
                // Una vez que la promesa se resuelve, se crea un objeto Persona y se le asigna el nombre
                //Solo se espera recibir un usuario, por eso se usa el primer resultado
                let persona = convertirDatosParcial(data.records[0]);

                setNombre(persona.primerNombre+" "+persona.segundoNombre+ " "+persona.primerApellido+ " "+persona.segundoApellido);
        }

        // Asignar una clase al body al montar el componente
        document.body.classList.add('home');

        fetchData();
        return () => {
            // Eliminar la clase del body al desmontar el componente
            document.body.classList.remove('home'); // Elimina la clase 'loginpage-body' del body
        };
    }, []); // El segundo argumento del useEffect vacío asegura que este efecto se ejecute solo una vez al montar el componente



    function toggle() {
        setIsOpen(!isOpen);
    }

    //Peticion para traer a un usuario
    var peticionUser = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/Login/datosbasicos', { "Serial": window.sessionStorage.getItem("Serial")})
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
        <div className="container-fluid display-table">
            <div className="row display-table-row">
                <div className={`col-md-2 col-2 ${isOpen ? 'd-none' : ''} d-sm-block display-table-cell v-align box`} id="navigation" >
                    <SideBarComponent></SideBarComponent>
                </div>
                <div className="col-md-10 col-10 display-table-cell v-align" id="main-content">
                    <Navbar expand="lg" className="bg-body-tertiary sticky-top">
                        <Container>
                            <Navbar.Brand>
                                <img
                                    alt=""
                                    width="40"
                                    height="40"
                                    className="d-inline-block align-top"
                                />{' '}
                                Natame</Navbar.Brand>
                            <Navbar.Toggle onClick={toggle} />
                            <Navbar.Text>
                                Conectado como: <strong>{nombre}</strong>
                            </Navbar.Text>
                        </Container>
                    </Navbar>

                    <div className="user-dashboard">
                        <Container> 
                            <Outlet></Outlet>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoardPage;