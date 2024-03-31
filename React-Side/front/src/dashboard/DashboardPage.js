import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPenNib } from '@fortawesome/free-solid-svg-icons'

import SideBarComponent from "./SideBar/SideBarComponent";



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
                    <nav className="navbar navbar-expand-lg navbar-light bg-light dash-nav">

                        <button className="navbar-toggler" type="button" data-toggle="offcanvas"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation" onClick={toggle}>
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <a className="navbar-brand" href="#">Usuario: </a>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <FontAwesomeIcon icon={faPenNib} />

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                            </ul>
                        </div>
                    </nav>
                    <div className="user-dashboard">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoardPage;