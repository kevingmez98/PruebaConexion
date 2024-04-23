import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { obtenerCarrito, actualizarCarrito } from "./CarritoSession";
import SimpleProductCard from '../CardProduct/SimpleProductCard';
import { convertirMuchosDatos as convertirProductos, buscarProducto } from '../../../mapeo/Helpers/ProductoHelper';
import Pedido from '../../../mapeo/Classes/Pedido';
import Item from '../../../mapeo/Classes/Item';
import Axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { dividirArray } from '../../../public-component/Common-functions/ArrayFunct';

function CarritoComponent({isCliente}) {

    //Btn para gestionar el estado de los botones
    const [isBtnLoading, setLoading] = useState(false);

    //Variable que contiene al carrito
    var [carrito, SetCarrito] = React.useState('');

    //Mensaje de error
    const [ErroMessage, setMessage] = React.useState('');

    //Lista de productos del carrito
    var [listaProductos, setListaProductos] = React.useState([]);

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


    //Revisar el cambio en el carrito y actualizar la lista que se muestra
    React.useEffect(() => {
        if (carrito) {
            let records = carrito.productos;

            //Se divide el array de productos(records) en grupos de 3
            let lista = dividirArray(records, 3);
            setListaProductos(lista);
        }
    }, [carrito])

    const modificarProducto = (productoId, formId) => {
        try {
            //Congelar botones
            setLoading(true);

            //Obtener cantidad del formulario
            const prodForm = document.getElementById(formId);

            const cant = prodForm.elements["cantidad"].value;

            let prod = "";
            //Se recorre la lista de listas de productos hasta encontrar al producto respectivo
            for (let i = 0; i < listaProductos.length; i++) {
                let listaP = listaProductos[i];

                prod = buscarProducto(listaP, productoId);
                if (prod.codProducto) {
                    break;
                }
            }
            if (cant >= 0) {
                setTimeout(() => {
                    setLoading(false);
                }, 1000); // Tiempo de espera

                actualizarCarrito(null, prod.nomProducto, prod.codProducto, cant, prod.precioUnitario, true)
                    .then((actualizacionExitosa) => {
                        if (actualizacionExitosa) {
                            alert(`Producto ${prod.nomProducto}. Actualizado a ${cant} unidades`);
                            SetCarrito(obtenerCarrito);
                            if (cant != 0) {
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


    function crearPedido() {
        let carrito = obtenerCarrito();
        let listaProd = carrito.productos;
        let pedido = new Pedido();
        console.log(listaProd[0].codProducto);
        for (let i = 0; i < listaProd.length; i++) {
            let item = new Item();

            /*Debido a la conversion de productos a JSON se usa el nombre privado de las variables, 
            no se puede acceder al getter y setter al no ser objetos tipo producto. 
            Convertirlos en este punto no aporta nada.*/

   
            item.codProducto = listaProd[i].producto._codProducto;
            item.cantidad = listaProd[i].cantidad;
            item.codRegion = carrito.region;
            item.idCategoriaProducto = listaProd[i].producto._idCatProducto;
            item.producto = listaProd[i].producto;
            pedido.agregarItem(item);   
        }

        var peticion = () => {
            setMessage("");
            if (isCliente) {
                pedido.documentoCliente=carrito.idCliente;
       
                //Se hace pago como cliente se envia solamente el serial
                Axios.post('http://localhost:8080/cliente/CrearPedido', { "_items": pedido.items, "Serial": sessionStorage.getItem("Serial") })
                    .then((response) => {

                        setMessage("Carrito enviado");
                        // Redireccion

                    }
                    ).catch((error) => {
                        setMessage(error.response.data.errors)
                    })

                alert("pago enviado como cliente. Serial "+sessionStorage.getItem("Serial")+" id/serial: "+carrito.idCliente);
            }else{
                //Se hace pago como representante. Se envia la sesion del representante y el id del cliente
                    /* Axios.post('http://localhost:8080/cliente/CrearPedido', { "_items": pedido._items, "Serial": sessionStorage.getItem("Serial") })
                    .then((response) => {

                        setMessage("Carrito enviado");
                        // Redireccion

                    }
                    ).catch((error) => {
                        setMessage(error.response.data.errors)
                    })*/
                alert("pago enviado como representante. Serial "+sessionStorage.getItem("Serial")+" para cliente "+carrito.idCliente);
            }
        }
        peticion.call();
    }




    return (
        <React.Fragment>
            {/*Mensaje de error */}
            <p style={{ color: 'red' }}>{ErroMessage}</p>
            <p>Precio total: {carrito && carrito.total ? carrito.total : 0}</p>
            <Button onClick={crearPedido}>Realizar pedido</Button>
            {/*Recorrer la lista de productos agregados al carrito */}
            {listaProductos.map((grupoProd, index) => (
                <Row key={index}>
                    {grupoProd.map((producto, ix) => (
                        <Col key={`${index}-${ix}`}>
                            <SimpleProductCard idProd={producto.codProducto} nomProducto={producto.nomProducto} precio={producto.precioUnitario} key={index}>
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
                                        <Button variant="secondary" size="lg" type="submit" disabled={isBtnLoading}
                                            onClick={() => modificarProducto(`${producto.codProducto}`, `form-prod-${index}-${ix}`)}>
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

export default CarritoComponent;