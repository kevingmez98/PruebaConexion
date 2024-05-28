import CardComponent from "../../public-component/Card/DarkCard/CardComponent";
import React from 'react';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Axios from 'axios';
import Alert from 'react-bootstrap/Alert';

function GestionarClasificacion() {

    //Mensaje de error
    const [ErroMessage, setMessage] = React.useState('');


    //Funcion para realizar la clasificacion general
    function handleClasificacionGeneral() {
        var peticion = () => {
            setMessage("");
            //Se hace la peticion al back
            Axios.post('http://localhost:8080/Director/clasificacionGeneral', { "Serial": sessionStorage.getItem("Serial") })
                .then((response) => {
                    console.log(response);
                }
                ).catch((error) => {
                    setMessage(error.response.data.errors)
                })

            alert("Clasificación realizada con exito. Verifique la pagina de estadisticas");
        }
    }


    //Funcion para realizar la clasificacion por region
    function handleClasificacionRegional() {
        var peticion = () => {
            setMessage("");
            //Se hace la peticion al back
            Axios.post('http://localhost:8080/Director/clasificacionRegional', { "Serial": sessionStorage.getItem("Serial") })
                .then((response) => {
                    console.log(response);
                }
                ).catch((error) => {
                    setMessage(error.response.data.errors)
                })

            alert("Clasificación regional realizada con exito. Verifique la pagina de estadisticas");
        }
        //Llamar la petición
        peticion.call();
    }

    return (
        <React.Fragment>
            <CardComponent titulo={"Gestion de clasificación"}>
                <div className="p-3 mb-2 bg-info text-white">Gestion de clasificación</div>
            </CardComponent>
            {/*Mensaje de error */}
            {ErroMessage && (
                <Alert variant="danger">{ErroMessage}</Alert>
            )}
            <br />
            <hr />
            <br />
            <hr />
            <Row>
                <Col></Col>
                <Col>
                    <Button variant="outline-dark" size="lg" onClick={handleClasificacionRegional}>
                        Realizar nueva clasificación regional
                    </Button>
                </Col>
                <Col></Col>
            </Row>

        </React.Fragment>



    )
}

export default GestionarClasificacion;