import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import SimpleProductCard from "../../public-component/Product/CardProduct/SimpleProductCard";
import { actualizarCarrito, eliminarCarrito } from '../../public-component/Product/Carrito/CarritoSession';


function RealizarCompraCl() {

    const [isBtnLoading, setLoading] = useState(false);

    const dataJson = {
        "records": [
            [
                "Prod0001",
                "Huevos",
                "2000"
            ],
            [
                "Prod0002",
                "Aguacate",
                "500"
            ],
            [
                "Prod0003",
                "Agua",
                "5030"
            ],
            [
                "Prod0004",
                "cate",
                "1500"
            ],
            [
                "Prod0005",
                "tIERRA",
                "500"
            ]
        ],
        "fields": [
            {
                "name": "ID_PROD",
                "type": "OTHER"
            },
            {
                "name": "N_PROD",
                "type": "OTHER"
            },
            {
                "name": "Precio",
                "type": "OTHER"
            }
        ]
    }
    const { records, fields } = dataJson;

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
            if (cant > 0) {
                setTimeout(() => {
                    //Guardar en el carrito
                    setLoading(false);
                }, 1000); // Tiempo de espera
                actualizarCarrito("1", productoId, cant);
                alert(`Producto ${productoId} agregado con ${cant} unidades`);
                prodForm.elements["cantidad"].value="";
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

    //Se divide el array de productos(records) en grupos de 3
    const listaProductos = dividirArray(records, 3);

    return (
        <React.Fragment>
            <button onClick={()=> eliminarCarrito("1")}></button>
            {listaProductos.map((grupoProd, index) => (
                <Row key={index}>
                    {grupoProd.map((producto, i) => (
                        <Col key={i}>
                            <SimpleProductCard idProd={producto[0]} nomProducto={producto[1]} precio={producto[2]}>
                                <Form id={`form-prod-${index}-${i}`}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Cantidad</Form.Label>
                                        <Form.Control size="sm" type="number" placeholder="1" min="1" name="cantidad" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Button variant="secondary" size="lg" type="submit" disabled={isBtnLoading}
                                            onClick={() => cargarProducto(`${producto[0]}`, `form-prod-${index}-${i}`)}>
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