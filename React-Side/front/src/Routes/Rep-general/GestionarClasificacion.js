import CardComponent from "../../public-component/Card/DarkCard/CardComponent";
import React from 'react';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function GestionarClasificacion() {
    return (
        <React.Fragment>
            <CardComponent titulo={"Gestion de clasificación"}>
                <div className="p-3 mb-2 bg-info text-white">Gestion de clasificación</div>
            </CardComponent>
            <br />
            <hr />
            <Row>
                <Col></Col>

                <Col>
                    <Button variant="outline-dark" size="lg">
                        Realizar nueva clasificación
                        </Button>
                </Col>

                <Col></Col>
            </Row>

        </React.Fragment>



    )
}

export default GestionarClasificacion;