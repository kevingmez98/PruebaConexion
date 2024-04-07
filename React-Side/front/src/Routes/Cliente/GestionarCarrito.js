import React, { useState } from 'react';
import { obtenerCarrito } from "../../public-component/Product/Carrito/CarritoSession";

function GestionarCarrito() {
    var listaCarrito = (obtenerCarrito("1"));
    const [ErroMessage, setMessage] = React.useState('');


    return (
        <React.Fragment>
            {/*Verificar que el carrito no sea Null*/}
         {console.log(listaCarrito.productos)}  
            {listaCarrito ? (
                listaCarrito.productos.map((producto, index) => (
                    <div key={index}>
                        <p>ID:{producto.idProducto}</p>
                        <p>Nombre: {producto.nombreProducto}</p>
                        <p>Cantidad: {producto.cantidad}</p>
                    </div>

                ))
            ) : (
                <p>No hay elementos en el carrito.</p>
            )}
        </React.Fragment>
    )
}

export default GestionarCarrito;