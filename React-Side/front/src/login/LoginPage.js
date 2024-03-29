import LoginForm from './LoginForm';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


import './css/login-styles.css';
import '../global-assets/css/bootstrap.min.css'

//import '../global-assets/css/fontawesome-all.css'

function LoginPage() {

    return (
        <Container>
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