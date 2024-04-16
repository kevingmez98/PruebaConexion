import CardComponent from "../../public-component/Card/DarkCard/CardComponent";
import SimpleTable from "../../public-component/JSONTable/SimpleTable";
import BtnTable from "../../public-component/JSONTable/BtnTable";
import React from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function GestionarCliente() {
    const [ErroMessage, setMessage] = React.useState('');
    var [jsonData, SetjsonData] = React.useState('');



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


    return (
        //El react fragment no afecta el DOM pero permite envolver componentes
        <React.Fragment>
            <p style={{ color: 'red' }}>{ErroMessage}</p>

            {/*Formulario para crear clientes */}
            <Form>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridTipoDoc">
                        <Form.Label>Tipo de documento.</Form.Label>
                        <Form.Select defaultValue="" required>
                            <option>Escoger</option>
                            <option value="CC">Cedula de ciudadania</option>
                            <option value="TI">Tarjeta de identidad</option>
                            <option value="CE">Cedula de extranjeria</option>
                            <option value="PS">Pasaporte</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDoc">
                        <Form.Label>Documento</Form.Label>
                        <Form.Control required />
                    </Form.Group>
                    <Row as={Col}>
                    <Form.Group as={Col} controlId="formGridCiudad">
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Select defaultValue="" required>
                            <option>Escoger</option>
                            <option value="C">Bogotá</option>
                            <option value="T">Medellin</option>
                            <option value="C">Barranquilla</option>
                        </Form.Select>
                    </Form.Group>
                </Row>  
                </Row>
                
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPrimerNom">
                        <Form.Label>Primer nombre</Form.Label>
                        <Form.Control required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridSegNom">
                        <Form.Label>Segundo nombre</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPrimerApe">
                        <Form.Label>Primer apellido</Form.Label>
                        <Form.Control required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridSegApe">
                        <Form.Label>Segundo apellido</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridNumTel">
                        <Form.Label>Numero de telefono</Form.Label>
                        <Form.Control required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDireccion">
                        <Form.Label>Direccion</Form.Label>
                        <Form.Control placeholder="Cll 123" />
                    </Form.Group>

                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridUser">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPass">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password"/>
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