import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import CarritoComponent from '../../public-component/Product/Carrito/CarritoComponent';
import { obtenerCarrito } from '../../public-component/Product/Carrito/CarritoSession';

function GestionarCarritoRep() {
    //Mensaje de error
    const [ErroMessage, setMessage] = React.useState('');


    //Variable que contiene al carrito
    var [carrito, SetCarrito] = React.useState('');

    //Use effect inicial para cuando cargue la pagina
    React.useEffect(() => {
        try {
            // Se consiguen los datos del carrito
            SetCarrito(obtenerCarrito());
        } catch (error) {
            // Manejamos cualquier error que pueda ocurrir
            console.error('Error al obtener los datos:', error);
        }

    }, []);

    return (
        <React.Fragment>
            {/*Mensaje de error */}
            {ErroMessage && (
                <Alert variant="danger">{ErroMessage}</Alert>
            )}

            <Alert variant="secondary">Gestionar carrito del cliente                 
                {carrito && (
                    carrito.idCliente
                )}
            </Alert>
            <CarritoComponent isCliente={false}></CarritoComponent>
        </React.Fragment>
    )
}

export default GestionarCarritoRep;