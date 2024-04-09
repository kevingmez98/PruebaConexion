import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import SimpleProductCard from "../../public-component/Product/CardProduct/SimpleProductCard";
import { actualizarCarrito, eliminarCarrito } from '../../public-component/Product/Carrito/CarritoSession';
import Axios from 'axios';


function RealizarCompraCl() {

    const [isBtnLoading, setLoading] = useState(false);
    const [ErroMessage, setMessage] = React.useState('');
    var [dataJson, SetjsonData] = React.useState('');
    var [listaProductos, setListaProductos] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // Esperamos la resolución de la promesa usando await
                const data = await peticion();
                // Una vez que la promesa se resuelve, actualizamos el estado con los datos recibidos
                SetjsonData(data);
                console.log(data); // Aquí puedes ver los datos en la consola
            } catch (error) {
                // Manejamos cualquier error que pueda ocurrir
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchData();
    }, []);

    //Revisar el cambio en dataJson y actualiza la lista
    React.useEffect(() => {
        if (dataJson) {
            //Records o resultados
            let { records, fields } = dataJson;
            //Se divide el array de productos(records) en grupos de 3
            let lista = dividirArray(records, 3);
            setListaProductos(lista);
    }
    }, [dataJson])

    var peticion = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/cliente/Productosregion', { "Serial": window.sessionStorage.getItem("Serial") })
                .then((response) => {
                    // Resolvemos la promesa con los datos recibidos
                    resolve(response.data);
                })
                .catch((error) => {
                    // Rechazamos la promesa con el mensaje de error
                    console.log(error);
                    setMessage(error.response.data.errors);

                });
        });
    };

    // Función para dividir un array en grupos de tamaño dado
    function dividirArray(array, size) {
        const listaDividida = [];
        for (let i = 0; i < array.length; i += size) {
            listaDividida.push(array.slice(i, i + size));
        }
        return listaDividida;
    }

    const cargarProducto = (productoId, formId) => {
        try {
            console.log(dataJson);
            //Congelar botones
            setLoading(true);

            //Obtener cantidad del formulario
            const prodForm = document.getElementById(formId);
            const cant = prodForm.elements["cantidad"].value;
            const nom = prodForm.elements["nombre"].value;
            const precio = prodForm.elements["precio"].value;
            if (cant > 0) {
                setTimeout(() => {
                    //Guardar en el carrito
                    setLoading(false);
                }, 1000); // Tiempo de espera
                actualizarCarrito("1",nom, productoId, cant,precio);
                alert(`Producto ${nom} agregado con ${cant} unidades`);
                prodForm.elements["cantidad"].value = "";
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
            <button onClick={() => eliminarCarrito("1")}>Borrar todo el carro</button>
            <p style={{ color: 'red' }}>{ErroMessage}</p>
            {listaProductos.map((grupoProd, index) => (
                <Row key={index}>
                    {grupoProd.map((producto, i) => (
                        <Col key={i}>
                            <SimpleProductCard idProd={producto[1]} nomProducto={producto[0]} precio={producto[3]}>
                                <Form id={`form-prod-${index}-${i}`}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Cantidad</Form.Label>
                                        <Form.Control size="sm" type="number" min="1" name="cantidad" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control size="sm" type="hidden" placeholder="1" min="1" name="nombre" value={producto[0]} disabled readOnly/>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control size="sm" type="hidden" placeholder="1" min="1" name="precio" value={producto[3]} disabled readOnly/>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Button variant="secondary" size="lg" type="submit" disabled={isBtnLoading}
                                            onClick={() => cargarProducto(`${producto[1]}`, `form-prod-${index}-${i}`)}>
                                            {isBtnLoading ? 'Cargando...' : 'Agregar al carrito'}
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </SimpleProductCard>
                        </Col>
                    ))}
                </Row>
            ))}


        </React.Fragment>
    )

}

export default RealizarCompraCl;