import CardComponent from "../../public-component/Card/DarkCard/CardComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faK, faKey, faSignIn } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import SimpleCard from "../../public-component/Card/SimpleCard/SimpleCard";


function RealizarCompraCl() {

    const [isBtnLoading, setLoading] = useState(false);



    const cargarProducto = (productoId,formId) => {
        //Congelar botones
        setLoading(true);

        //Obtener cantidad del formulario
        const prodForm = document.getElementById(formId);
        const cant = prodForm.elements["cantidad"].value;
        if(cant>0){
                setTimeout(() => {
                    console.log(`Producto ${productoId} enviado desde el formulario ${formId} con cantidad ${cant}`);
                    //Acá se haría lo del envío del formulario al back
                    setLoading(false); 
                }, 1000); // Tiempo de espera
        }else{
            alert('Ingrese un valor valido para la cantidad');
            setTimeout(() => {
                setLoading(false); 
            }, 1000); // Tiempo de espera
        }

    };

    return (

        <Container>
            <Row>
                <Col>
                    <SimpleCard header={"Producto 1"} title={"$44.000"}>
                        <Form id="form-prod-1">
                            <Form.Group className="mb-3">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control size="sm" type="number" placeholder="1" min="1" name="cantidad"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Button variant="secondary" size="lg" type="submit" disabled={isBtnLoading}
                                    onClick={() => cargarProducto('1',"form-prod-1")}>
                                    {isBtnLoading?'Cargando...':'Agregar al carrito'}
                                </Button>
                            </Form.Group>
                        </Form>
                    </SimpleCard>
                </Col>
                <Col>
                    <SimpleCard header={"Producto 2"} title={"$44.000"}>
                        <Form id="form-prod-2">
                            <Form.Group className="mb-3">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control size="sm" type="number" placeholder="1" min="1" name="cantidad" required="required"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Button variant="secondary" size="lg" type="submit" disabled={isBtnLoading}
                                    onClick={() => cargarProducto('1',"form-prod-2")}>
                                    {isBtnLoading?'Cargando...':'Agregar al carrito'}
                                </Button>
                            </Form.Group>
                        </Form>
                    </SimpleCard>
                </Col>
            </Row>
        </Container >
    )
}

export default RealizarCompraCl;