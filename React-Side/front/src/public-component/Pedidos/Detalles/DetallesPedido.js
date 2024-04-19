import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { dividirArray } from '../../../public-component/Common-functions/ArrayFunct'
import SimpleProductCard from '../../../public-component/Product/CardProduct/SimpleProductCard';

import { convertirMuchosDatos as convertirItems, asignarProductos } from '../../../mapeo/Helpers/ItemHelper';
import { convertirMuchosDatos as convertirProductos } from '../../../mapeo/Helpers/ProductoHelper';
/*
HandlePedido es un handler de un componente padre para pasarle cuando se elije un pedido para pagar

*/
function DetallesPedido({ handlePedido, idPedido }) {

    //Items del pedido
    const [items, setItems] = useState([]);

    //Lista con los items organizados
    const [itemsOrg, setItemsOrg] = useState([]);

    //codigo del pedido seleccionado
    const [pedidoSel, setPedidoSel] = useState('');


    //Variable temporal con items

    const itemsTemp = [
        {
            "k_cod_item": "102",
            "n_nom_producto": "Papitas",
            "q_cantidad": "4",
            "k_cod_producto": "12",
            "k_cod_pedido": idPedido,
            "q_precio_unitario": "4400"

        },
        {
            "k_cod_item": "1004",
            "n_nom_producto": "gaseosa",
            "q_cantidad": "4",
            "k_cod_producto": "166",
            "k_cod_pedido": idPedido,
            "q_precio_unitario": "4400"
        },
        {
            "k_cod_item": "102",
            "n_nom_producto": "Papitas_2",
            "k_cod_producto": "14",
            "q_cantidad": "3",
            "k_cod_pedido": idPedido,

            "q_precio_unitario": "4400"

        },
        {
            "k_cod_item": "1404",
            "n_nom_producto": "Platanos",
            "k_cod_producto": "15",
            "q_cantidad": "14",
            "k_cod_pedido": idPedido,

            "q_precio_unitario": "4400"
        },
        {
            "k_cod_item": "1023",
            "n_nom_producto": "Jabon",
            "q_cantidad": "1",
            "k_cod_producto": "125",
            "k_cod_pedido": idPedido,

            "q_precio_unitario": "4400"

        },
        {
            "k_cod_item": "1304",
            "n_nom_producto": "Dinosaurio gigante",
            "k_cod_producto": "1255",
            "q_cantidad": "33",
            "k_cod_pedido": idPedido,

            "q_precio_unitario": "4400"
        },
        {
            "k_cod_item": "6059",
            "n_nom_producto": "Un cohete",
            "q_cantidad": "55",
            "k_cod_producto": "12493",
            "k_cod_pedido": idPedido,
            "q_precio_unitario": "4400"
        }
    ];



    /* Funcion para pasar al padre el pedido que se pagaria*/
    const handlePagoPedido = () => {
        handlePedido(idPedido,true);
    }

    //Use effect inicial para cuando cargue la pagina
    useEffect(() => {
        try {
            setPedidoSel(idPedido);
            // Se consiguen los datos de los pedidos
            //Aca se haria la peticion

            //Acá se convierte la peticion a instancias de item
            let petItems = convertirItems(itemsTemp);

            /*
            Se convierten los datos disponibles de productos. Acá podria haber una consulta con los productos de items
            de no haberla se tendrian que incluir en la consulta de items
            */
            let petProductos = convertirProductos(itemsTemp);

            //Se asignan los productos a los items por medio del helper
            petItems = asignarProductos(petProductos, petItems);
            setItems(petItems);

            //Se organizan los items en grupos de 3 para mostrarse en la vista
            setItemsOrg(dividirArray(petItems, 3));


        } catch (error) {
            // Manejamos cualquier error que pueda ocurrir
            console.error('Error al obtener los datos:', error);
        }

    }, []);

    //UseEffect para verificar el cambio en idPedido
    useEffect(() => {
        try {
            setPedidoSel(idPedido);
            // Se consiguen los datos de los pedidos
            //Aca se haria la peticion

            //Acá se convierte la peticion a instancias de item
            let petItems = convertirItems(itemsTemp);

            /*
            Se convierten los datos disponibles de productos. Acá podria haber una consulta con los productos de items
            de no haberla se tendrian que incluir en la consulta de items
            */
            let petProductos = convertirProductos(itemsTemp);

            //Se asignan los productos a los items por medio del helper
            petItems = asignarProductos(petProductos, petItems);
            setItems(petItems);

            //Se organizan los items en grupos de 3 para mostrarse en la vista
            setItemsOrg(dividirArray(petItems, 3));


        } catch (error) {
            // Manejamos cualquier error que pueda ocurrir
            console.error('Error al obtener los datos:', error);
        }
    }, [idPedido]); // Asegúrate de incluir idPedido como una dependencia

    



    return (
        <React.Fragment>
            <Alert variant="light">Ver detalles del pedido
                {pedidoSel && (
                    pedidoSel
                )}
            </Alert>
            <Button variant="outline-info" size="lg" onClick={() => handlePagoPedido()}>
                Pagar pedido
            </Button>
            {itemsOrg.length === 0 ? (
                <p>No hay productos disponibles que cumplan con los criterios</p>
            ) : (

                itemsOrg.map((grupoItem, index) => (
                    <Row key={index}>
                        {grupoItem.map((item, i) => (
                            <Col key={i}>
                                <SimpleProductCard idProd={item.codProducto} nomProducto={item.producto.nomProducto} precio={item.producto.precioUnitario}>
                                    <Form id={`form-prod-${index}-${i}`}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Cantidad: {item.cantidad}</Form.Label>
                                        </Form.Group>
                                    </Form>
                                </SimpleProductCard>
                            </Col>
                        ))}
                    </Row>
                ))

            )}


        </React.Fragment>

    );
}

export default DetallesPedido;