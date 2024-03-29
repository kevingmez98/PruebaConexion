import React, { useEffect } from 'react';

import LoginForm from './LoginForm';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


import './css/login-styles.css';

//import '../global-assets/css/fontawesome-all.css'

function LoginPage() {


    useEffect(() => {
        // Asignar una clase al body al montar el componente
        document.body.classList.add('body-login-image'); 
        return () => {
        // Eliminar la clase del body al desmontar el componente
            document.body.classList.remove('body-login-image'); // Elimina la clase 'loginpage-body' del body
        };
    }, []); // El segundo argumento del useEffect vacío asegura que este efecto se ejecute solo una vez al montar el componente

    return ( 
        <Container className='container'>
            <Row>
                <Col sm></Col>
                <Col sm>
                    <LoginForm></LoginForm>
                </Col>
                <Col sm></Col>
            </Row   >

        </Container>
    )
}

export default LoginPage;