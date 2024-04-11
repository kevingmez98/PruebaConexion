import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import SimpleProductCard from "../../public-component/Product/CardProduct/SimpleProductCard";
import { actualizarCarrito, eliminarCarrito } from '../../public-component/Product/Carrito/CarritoSession';
import Axios from 'axios';

import SimpleModal from '../../public-component/Modal/SimpleModal';
import CategorySelect from '../../public-component/Product/CategoryComponent/CategorySelect';


function RealizarCompraCl() {

    const [isBtnLoading, setLoading] = useState(false);
    const [ErroMessage, setMessage] = React.useState('');
    var [dataJson, SetjsonData] = React.useState('');
    var [listaProductos, setListaProductos] = React.useState([]);

    const [showModal, setShowModal] = useState(true);

    const showRegModal = () => setShowModal(!setShowModal);

    // Estado para almacenar los valores de los checkboxes de categoria 
    const [checkData, setCheckData] = useState([]);

    // Función para manejar el cambio de estado de los checkbox de categoria
    /*
        Se guarda el id de los formularios activados, el nombre del check
        tambien la categoria y posible categoria padre
    */
    const handleCheckBox = (formCheck, idCat, idCatPadre, nombreCheck) => {

        //obtener el valor del check de categorias
        const prodForm = document.getElementById(formCheck);

        const valor = prodForm.elements[nombreCheck].checked;

        // Obtener el índice del formData actual si existe en checkData
        const index = checkData.findIndex(data => data['id-cat'] === idCat);

        //Si no existe se agrega
        if (index === -1) {

            const formData = { 'id-form': formCheck, 'nombre-check': nombreCheck, 'id-cat': idCat, 'id-cat-padre': idCatPadre, 'value': valor };

            // ...checkData permite tener una copia superficial de la variable
            setCheckData([
                ...checkData,
                formData
            ]);
        };
        //Si el valor es true indica que se activa el check
        if (valor) {
            //Se desactivan todos los check exceto el que activó el metodo
            checkData.forEach(data => {
                data['value'] = false;
                cambiarCheck(data['id-form'], data['nombre-check'], false);

                //Si la categoria que se activa tiene categoria padre tambien se activa
                if (data['id-cat'] == idCat) {
                    data['value'] = true;
                    cambiarCheck(data['id-form'], data['nombre-check'], true);
                }

            });
        }

    };

    //Hacer la consulta de filtros con categorias
    const aplicarFiltroCat = () => {
        let cat = "No se especificó una categoria";
        for (let i = 0; i < checkData.length; i++) {
            if (checkData[i]['value']) {
                cat = "categoria con id " + checkData[i]['id-cat'];
                if(checkData[i]['id-cat-padre']){
                    cat += ". tiene el id padre "+checkData[i]['id-cat-padre'];
                }
            }
        }
        alert(cat);
    }

    function cambiarCheck(idForm, nombreCheck, valor) {
        const prodForm = document.getElementById(idForm);

        // Cambiar el valor del checkbox
        prodForm.elements[nombreCheck].checked = valor;

    }



    const categoriesData =
    {
        "records": [
            ["HG2", "HG", "Artículos de cocina"],
            ["HG3", "HG", "Productos de lavandería"],
            ["HG4", "HG", "Limpieza de pisos"],
            ["HG5", "HG", "Desinfectantes"],
            ["CP1", "CP", "Cuidado de la piel"],
            ["CP2", "CP", "Higiene bucal"],
            ["CP3", "CP", "Cuidado del cabello"],
            ["CP4", "CP", "Cuidado de las uñas"],
            ["CP5", "CP", "Fragancias"],
            ["EL1", "EL", "Teléfonos móviles"],
            ["EL2", "EL", "Computadoras"],
            ["EL3", "EL", "Tablets"],
            ["EL4", "EL", "Relojes inteligentes"],
            ["EL5", "EL", "Televisores"],
            ["EL", "", "Electronica"],
            ["BL", "", "Belleza"],
            ["CP", "", "Cuidado personal"],
            ["HG", "", "Hogar"],
            ["EL51", "EL5", "ElectronicaTesst"]
        ],
        "fields": [
            { "name": "I_ID_CAT_PRODUCTO", "type": "VARCHAR2(5)" },
            { "name": "I_ID_CAT_PRO_SUP", "type": "VARCHAR2(5)" },
            { "name": "N_NOM_CAT_PRODUCTO", "type": "VARCHAR2(50)" }
        ]
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // Esperamos la resolución de la promesa usando await
                const data = await peticion();
                // Una vez que la promesa se resuelve, actualizamos el estado con los datos recibidos
                SetjsonData(data);
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
            Axios.post('http://localhost:8080/cliente/Productosregion', { "serial": window.sessionStorage.getItem("Serial"), "region": "AND", "categoria": "EL" })
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
                actualizarCarrito("1", nom, productoId, cant, precio);
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
            <SimpleModal show={showModal} titulo={"Cambio de región"} handleClose={showRegModal}>
                <Form id="form-region">
                    <Form.Select>
                        <option>Seleccionar</option>
                        <option value="1">Uno</option>
                        <option value="2">Dos</option>
                        <option value="3">Tre</option>
                    </Form.Select>
                    <Button variant="primary">Seleccionar</Button>

                </Form>
            </SimpleModal>

            <Button variant="primary" onClick={() => setShowModal(true)}>
                Cambiar región
            </Button>

            <br />
            <Button variant="danger" onClick={() => eliminarCarrito("1")}>Borrar todo el carro</Button>

            <br />

            <CategorySelect categorias={categoriesData.records} handlerPadre={handleCheckBox} />
            <br />
            <Button variant="primary" onClick={() => aplicarFiltroCat()}>
                Aplicar filtro de categorias
            </Button>
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
                                        <Form.Control size="sm" type="hidden" placeholder="1" min="1" name="nombre" value={producto[0]} disabled readOnly />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control size="sm" type="hidden" placeholder="1" min="1" name="precio" value={producto[3]} disabled readOnly />
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