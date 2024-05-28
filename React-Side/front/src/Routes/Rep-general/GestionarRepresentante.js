import CardComponent from "../../public-component/Card/DarkCard/CardComponent";
import SimpleTable from "../../public-component/JSONTable/SimpleTable";
import React, { useState } from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

function GestionarRepresentante() {

    //Variable para mostrar error
    const [ErroMessage, setMessage] = React.useState('');

    var [jsonData, SetjsonData] = React.useState('');


    //Variable que contiene los datos del form
    const [formData, setFormData] = useState({
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        email: '',
        genero: '',
        numTelefono: '',
        direccion: '',
        fechaNacimiento: '',
        documento:'',
        tipoDoc:''
    });

    //Variable con los posibles genero
    const genero = [
        { "value": "F", "nombre": "Femenino" },
        { "value": "M", "nombre": "Masculino" },
        { "value": "O", "nombre": "Otro" }
    ];

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

        console.log("====?");

        if (validarFecha()) {
            peticionCrearRep();
        }
    }


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

    //Peticion para crear representante
    var peticionCrearRep = () => {
        return new Promise((resolve, reject) => {
            setMessage("");

            //Toma los datos del formulario
            Axios.post('http://localhost:8080/Director/crearRepresentante', {
                "serial": window.sessionStorage.getItem("Serial"),
                "primernombre": formData.primerNombre, "segundonombre": formData.segundoNombre,
                "primerapellido": formData.primerApellido, "segundoapellido": formData.segundoApellido, "email": formData.email,
                "numtelefono": formData.numTelefono, "direccion": formData.direccion, "genero": formData.genero, 
                "fechanacimiento": formData.fechaNacimiento, "documento": formData.documento, "tipodocumento": formData.tipoDoc
            })
                .then((response) => {
                    // Resolvemos la promesa con los datos recibidos
                    resolve(response.data);
                })
                .catch((error) => {
                    // Rechazamos la promesa con el mensaje de error
                    if (error.response && error.response.data && error.response.data.errors) {
                        setMessage(error.response.data.errors);
                    } else {
                        setMessage("Error desconocido");
                    }
                });
        });
    };

    function validarFecha() {
        const today = new Date();
        const selected = new Date(formData.fechaNacimiento);
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(today.getFullYear() - 18);

        console.log(selected);
        console.log(eighteenYearsAgo);

        // Validar que la fecha seleccionada sea al menos 18 años antes de la fecha actual
        if (selected > eighteenYearsAgo) {
            alert('Debe tener al menos 18 años.');
            return false;
        } else {
            return true;
        }
    }

    var peticion = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/Director/representantesA', { "Serial": window.sessionStorage.getItem("Serial") })
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
        <React.Fragment>
            <CardComponent titulo={"Ver representantes a cargo"}>
                <div className="p-3 mb-2 bg-info text-white">Representantes</div>
                <p style={{ color: 'red' }}>{ErroMessage}</p>
            </CardComponent>
            <br />
            <hr />
            <SimpleTable dataJson={jsonData}></SimpleTable>
            <br />
            <hr />
            <Alert variant="info">Crear representante</Alert>
            {/*Mensaje de error */}
            {ErroMessage && (
                <Alert variant="danger">{ErroMessage}</Alert>
            )}
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
                </Row>

                <Row>
                    <Form.Group as={Col} controlId="formGridDireccion">
                        <Form.Label>Direccion</Form.Label>
                        <Form.Control placeholder="Cll 123"
                            name="direccion" value={formData.direccion}
                            onChange={handleFormChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Fecha de Nacimiento</Form.Label>
                        <Form.Control
                            type="date"
                            name="fechaNacimiento"
                            value={formData.fechaNacimiento}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Genero</Form.Label>
                        <br />
                        {genero.map((gen) => (
                            <Form.Check
                                key={gen.value}
                                type="radio"
                                label={gen.nombre}
                                name="genero"
                                value={gen.value}
                                checked={formData.genero === gen.value}
                                onChange={handleFormChange}
                                required
                                inline
                            />
                        ))}
                    </Form.Group>
                </Row>
                <hr />
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" size="lg">
                        Registrar
                    </Button>
                </div>
                <br />

            </Form>
        </React.Fragment>


    )
}

export default GestionarRepresentante;