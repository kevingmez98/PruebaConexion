import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import CarritoComponent from '../../public-component/Product/Carrito/CarritoComponent';


function GestionarCarritoCl() {

    //Mensaje de error
    const [ErroMessage, setMessage] = React.useState('');

    return (
        <React.Fragment>
            {/*Mensaje de error */}
            {ErroMessage && (
                <Alert variant="danger">{ErroMessage}</Alert>
            )}

            <Alert variant="secondary">Gestionar mi carrito</Alert>
            <CarritoComponent isCliente={true}></CarritoComponent>
        </React.Fragment>
    )
}

export default GestionarCarritoCl;