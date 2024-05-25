import SimpleTable from "../../public-component/JSONTable/SimpleTable";
import BtnTable from "../../public-component/JSONTable/BtnTable";
import React, { useState } from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Ciudad from "../../mapeo/Classes/Ciudad";
import { convertirMuchosDatos as convertirCiudades } from "../../mapeo/Helpers/CiudadHelper";

function GestionarCliente() {
    //Variable para mostrar error
    const [ErroMessage, setMessage] = React.useState('');

    //Variable que contiene la lista de clientes
    var [jsonData, SetjsonData] = React.useState('');

    //Variable con la lista de ciudades
    var [ciudades, setCiudades] = React.useState('');

    //Variable que contiene los datos del form
    const [formData, setFormData] = useState({
        tipoDoc: '',
        documento: '',
        ciudad: '',
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        email: '',
        numTelefono: '',
        direccion: '',
        usuario: ''
    });

    //Funcion para manejar el cambio en los datos del formulario
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //Funcion para manejar la peeticion de creacion del cliente del boton
    const handleForm = async (event) => {

        //Evitar que se actualice
        event.preventDefault();

        console.log(formData);

        peticionCrearCliente();

    }

    //Use effect inicial
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // Esperamos la resolución de la promesa usando await
                const data = await peticion();
                // Una vez que la promesa se resuelve, actualizamos el estado con los datos recibidos
                SetjsonData(data);

                let ciudadesData = await peticionCiudades();

                setCiudades(convertirCiudades(ciudadesData.records, ciudadesData.fields));

            } catch (error) {
                // Manejamos cualquier error que pueda ocurrir
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, []);

    var peticion = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/representante/clientes', { "Serial": window.sessionStorage.getItem("Serial") })
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

    //Peticion ciudades
    var peticionCiudades = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/representante/ciudades', { "Serial": window.sessionStorage.getItem("Serial") })
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

    var peticionCrearCliente = () => {
        return new Promise((resolve, reject) => {
            setMessage("");

            //Toma los datos del formulario
            Axios.post('http://localhost:8080/representante/crearCliente', {
                "serial": window.sessionStorage.getItem("Serial"),
                "usuario": formData.usuario, "documento": formData.documento, "tipodocumento": formData.tipoDoc,
                "codigociudad": formData.ciudad, "primernombre": formData.primerNombre, "segundonombre": formData.segundoNombre,
                "primerapellido": formData.primerApellido, "segundoapellido": formData.segundoApellido, "email": formData.email,
                "numtelefono": formData.numTelefono, "direccion": formData.direccion
            })
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
        //El react fragment no afecta el DOM pero permite envolver componentes
        <React.Fragment>
            <p style={{ color: 'red' }}>{ErroMessage}</p>

            {/*Formulario para crear clientes */}
            <Form onSubmit={handleForm}>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridTipoDoc">
                        <Form.Label>Tipo de documento.</Form.Label>
                        <Form.Select
                            name="tipoDoc" value={formData.tipoDoc}
                            onChange={handleFormChange}
                            required >

                            <option value="">Escoger</option>
                            <option value="CC">Cedula de ciudadania</option>
                            <option value="TI">Tarjeta de identidad</option>
                            <option value="CE">Cedula de extranjeria</option>
                            <option value="PS">Pasaporte</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDoc">
                        <Form.Label>Documento</Form.Label>
                        <Form.Control required
                            name="documento" value={formData.documento}
                            onChange={handleFormChange} />
                    </Form.Group>
                    <Row as={Col}>
                        <Form.Group as={Col} controlId="formGridCiudad">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Select required
                                name="ciudad" value={formData.ciudad}
                                onChange={handleFormChange}>
                                <option value="">Escoger</option>
                                {ciudades && ciudades.map((ciudad, index) => (
                                    <option key={index} value={ciudad.codCiudad}>
                                        {ciudad.nomCiudad}
                                    </option>
                                ))};
                            </Form.Select>
                        </Form.Group>
                    </Row>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPrimerNom">
                        <Form.Label>Primer nombre</Form.Label>
                        <Form.Control required
                            name="primerNombre" value={formData.primerNombre}
                            onChange={handleFormChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridSegNom">
                        <Form.Label>Segundo nombre</Form.Label>
                        <Form.Control
                            name="segundoNombre" value={formData.segundoNombre}
                            onChange={handleFormChange} />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPrimerApe">
                        <Form.Label>Primer apellido</Form.Label>
                        <Form.Control required
                            name="primerApellido" value={formData.primerApellido}
                            onChange={handleFormChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridSegApe">
                        <Form.Label>Segundo apellido</Form.Label>
                        <Form.Control
                            name="segundoApellido" value={formData.segundoApellido}
                            onChange={handleFormChange} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                            name="email" value={formData.email}
                            onChange={handleFormChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNumTel">
                        <Form.Label>Numero de telefono</Form.Label>
                        <Form.Control required
                            name="numTelefono" value={formData.numTelefono}
                            onChange={handleFormChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDireccion">
                        <Form.Label>Direccion</Form.Label>
                        <Form.Control placeholder="Cll 123"
                            name="direccion" value={formData.direccion}
                            onChange={handleFormChange} />
                    </Form.Group>

                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridUser">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control required
                            name="usuario" value={formData.usuario}
                            onChange={handleFormChange} />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Registrar
                </Button>
            </Form>


            <SimpleTable dataJson={jsonData}></SimpleTable>
            <BtnTable dataJson={jsonData}></BtnTable>
        </React.Fragment>
    )
}

export default GestionarCliente;