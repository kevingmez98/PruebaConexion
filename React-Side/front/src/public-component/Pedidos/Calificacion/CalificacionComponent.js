//Calificacion component es el componente encargado de calificar un pedido 

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

/*
El id del pedido a calificar se lo pasa el padre
*/
function CalificacionComponent({ idPedido }) {
    const [calificacion, setCalificacion] = useState(0);

    //codigo del pedido seleccionado
    const [pedidoSel, setPedidoSel] = useState('');

    //Mensaje de error
    const [ErroMessage, setMessage] = useState('');

    //Cambir valor de la calificacion en los botones
    const handleCalificacionClick = (value) => {
        setCalificacion(value);
    };


    //UseEffect para verificar el cambio en idPedido
    useEffect(() => {
        const actualizarDatosPedido = async () => {
            try {

                //Se asigna el id del pedido recibido
                setPedidoSel(idPedido);

            } catch (error) {
                // Manejamos cualquier error que pueda ocurrir
                console.error('Error al obtener los datos:', error);
                setMessage(error);
            }
        };
        actualizarDatosPedido();
    }, [idPedido]);

    //Enviar la calificacion
    const enviarCalificacion = () => {
        if(calificacion<=5 && calificacion>=1){
            alert("Calificando pedido #" + pedidoSel + " con calificación " + calificacion);
            window.location.reload();
             //calificarPedidoPeticion();
            
        }else{
            alert("Ingrese un valor valido de calificación");
        }

    };

    //Peticion para calificar el pedido
    var calificarPedidoPeticion = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/cliente/', { "Serial": window.sessionStorage.getItem("Serial"), "Utilitary": idPedido })
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
        <div>
            <Alert variant="light">Calificar pedido
                {pedidoSel && (
                    ' ' + pedidoSel
                )}
            </Alert>
            {ErroMessage && (
                <Alert variant="danger">{ErroMessage}</Alert>
            )}

            <React.Fragment>
                <ButtonToolbar className="mb-3">
                    <h2>Estado sin calificacion</h2>
                    <h1>Puntuación: {calificacion}</h1>

                    {/*Se genera un boton por cada posible valor de calificación */}
                    <ButtonGroup className="me-2" aria-label="calificacion">
                        {[1, 2, 3, 4, 5].map((value) => (
                            //Si el valor del boton coincide con el de calificación coloca una variante diferente
                            <Button
                                key={value}
                                variant={calificacion === value ? 'warning' : 'secondary'}
                                onClick={() => handleCalificacionClick(value)}
                            >
                                {value}
                            </Button>
                        ))}
                    </ButtonGroup>
                </ButtonToolbar>
                <Button variant="outline-info" size="lg" onClick={() => enviarCalificacion()}>
                    Calificar
                </Button>
            </React.Fragment>

        </div>
    );
}

export default CalificacionComponent;