import React, { useState } from 'react';


function NavBarComponent(idOcultar) {


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <button className="navbar-toggler" type="button" data-toggle="offcanvas"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation" onClick={ocultar(idOcultar)}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">Usuario: </a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                </ul>
            </div>
        </nav>
    )
}

function ocultar(idElement) {
    var elemento = document.getElementById(idElement);
    if (elemento.classList.contains('clase-a-agregar')) {
        // Si la tiene, la eliminamos
        elemento.classList.remove('clase-a-agregar');
    } else {
        // Si no la tiene, la agregamos
        elemento.classList.add('clase-a-agregar');
    }
}

export default NavBarComponent;