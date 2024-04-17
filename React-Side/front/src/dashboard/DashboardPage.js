import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import SideBarComponent from "./SideBar/SideBarComponent";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import './CSS/dashboard-styles.css';
import './CSS/own-dashboard-styles.css';



function DashBoardPage() {

    useEffect(() => {
        // Asignar una clase al body al montar el componente
        document.body.classList.add('home');
        return () => {
            // Eliminar la clase del body al desmontar el componente
            document.body.classList.remove('home'); // Elimina la clase 'loginpage-body' del body
        };
    }, []); // El segundo argumento del useEffect vacío asegura que este efecto se ejecute solo una vez al montar el componente


    //Ocultar y mostrar la barra lateral (responsive)
    const [isOpen, setIsOpen] = useState(false);

    function toggle() {
        setIsOpen(!isOpen);
    }
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
                                Conectado como: <strong>Mark Otto</strong>
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