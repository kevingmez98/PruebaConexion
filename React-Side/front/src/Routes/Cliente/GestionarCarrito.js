import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { obtenerCarrito, actualizarCarrito } from "../../public-component/Product/Carrito/CarritoSession";
import SimpleProductCard from '../../public-component/Product/CardProduct/SimpleProductCard';

function GestionarCarrito() {
    const [isBtnLoading, setLoading] = useState(false);
    var [carrito, SetCarrito] = React.useState('');
    const [ErroMessage, setMessage] = React.useState('');
    var [listaProductos, setListaProductos] = React.useState([]);


    React.useEffect(() => {
        try {
            // Se consiguen los datos del carrito
            SetCarrito(obtenerCarrito("1"));
        } catch (error) {
            // Manejamos cualquier error que pueda ocurrir
            console.error('Error al obtener los datos:', error);
        }

    }, []);

    //Revisar el cambio en el carrito y actualizar la lista que se muestra

    React.useEffect(() => {
        if (carrito) {
            let records = carrito.productos;
            console.log("cambiooo");
            console.log(carrito);   

            //Se divide el array de productos(records) en grupos de 3
            let lista = dividirArray(records, 3);
            setListaProductos(lista);
            console.log("editao");
            console.log(lista);
        }
    }, [carrito])

    // Función para dividir un array en grupos de tamaño dado
    function dividirArray(array, size) {
        const listaDividida = [];
        for (let i = 0; i < array.length; i += size) {
            listaDividida.push(array.slice(i, i + size));
        }
        return listaDividida;
    }

    const modificarProducto = (productoId, formId) => {
        try {
            //Congelar botones
            setLoading(true);

            //Obtener cantidad del formulario
            const prodForm = document.getElementById(formId);

            const cant = prodForm.elements["cantidad"].value;
            const nom = prodForm.elements["nombre"].value;
            console.log(cant);
            if (cant >= 0) {
                setTimeout(() => {
                    setLoading(false);
                }, 1000); // Tiempo de espera

                //Se coloca en negativo para restar la diferencia
                actualizarCarrito("1", nom, productoId, cant, true)
                .then((actualizacionExitosa) => {
                  if (actualizacionExitosa) {
                    alert(`Producto ${nom}. Actualizado a ${cant} unidades`);
                    SetCarrito(obtenerCarrito("1"));
                    if(cant!=0){
                        prodForm.elements["cantidad"].value = cant;
                    }
                  } else {
                    alert('Hubo un error al actualizar el carrito.');
                  }
                }); 
                  
            } else {
                setTimeout(() => {
                    setLoading(false);
                }, 1000); // Tiempo de espera
                throw new Error('Ingrese un valor valido para la cantidad');
            }
        } catch (error) {
            alert(error);
        }

    };


    return (
        <React.Fragment>
            {/*Mensaje de error */}
            <p style={{ color: 'red' }}>{ErroMessage}</p>
            <p>Precio total:</p>
            <Button>Pagar</Button>
            {/*Recorrer la lista de productos agregados al carrito */}
            {listaProductos.map((grupoProd, index) => (
                <Row key={index}>
                    {grupoProd.map((producto, ix) => (
                        <Col key={`${index}-${ix}`}>
                            <SimpleProductCard idProd={producto.idProducto} nomProducto={producto.nombreProducto} key={index}>
                                <Form id={`form-prod-${index}-${ix}`}>
                                    <Form.Label htmlFor={`cant-${index}-${ix}`}>Cantidad actual en el carrito: {producto.cantidad}</Form.Label>
                                    <br />
                                    <Form.Control type='number'
                                        defaultValue={producto.cantidad}
                                        min={0}
                                        max={producto.cantidad}
                                        name="cantidad"
                                        className='mb-3 '
                                        id={`cant-${index}-${ix}`}
                                    />
                                    <Form.Group className="mb-3">
                                        <Form.Control size="sm" type="hidden" name="nombre" value={producto.nombreProducto} disabled readOnly />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Button variant="secondary" size="lg" type="submit" disabled={isBtnLoading}
                                            onClick={() => modificarProducto(`${producto.idProducto}`, `form-prod-${index}-${ix}`)}>
                                            {isBtnLoading ? 'Cargando...' : 'Modificar cantidad'}
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </SimpleProductCard>

                        </Col>
                    )
                    )}
                </Row>
            ))
            }
        </React.Fragment>
    )
}

export default GestionarCarrito;