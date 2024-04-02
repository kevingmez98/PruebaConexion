import CardComponent from '../public-component/Card/CardComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faK, faKey, faSignIn } from '@fortawesome/free-solid-svg-icons';
import { Navigate, redirect, useNavigate } from 'react-router-dom';

import React from 'react';
import Axios from 'axios';

function LoginForm() {
    const [user, setUser] = React.useState('0');
    const [pass, setPass] = React.useState('0');
    const [ErroMessage, setMessage] = React.useState('');

    const navigate = useNavigate();

    /*React.useEffect(() => {
        try {
            setUser(window.sessionStorage.getItem("user"))
            setPass(window.sessionStorage.getItem("pass"))
            window.sessionStorage.getItem("Role")
            peticion.call();
        } catch (error) {

        }
    }, []); */

    var peticion = () => {
        setMessage("");
        Axios.post('http://localhost:8080/Login/Autenticar', { pass: pass, user: user })
            .then((response) => {
                window.sessionStorage.setItem("Serial", response.data.Serial);
                setMessage("Usuario autenticado");
                // Redireccion
                navigate("/home");
            }
            ).catch((error) => {
                setMessage(error.response.data.errors)
            })
    }

    return (

        <CardComponent titulo="Inicio de sesion">

            <form method="post" id='login-form'>

                <div className="input-group form-group">
                    <div className="form-group input-group">
                        <label>Usuario</label>
                    </div>
                    <div className="input-group-prepend">
                        <span className="input-group-text"><FontAwesomeIcon icon={faSignIn}></FontAwesomeIcon></span>
                    </div>
                    <input icon="fas fa user" type="text" name="email" placeholder="Usuario" value={user || ''} onChange={(event) => { setUser(event.target.value) }} className='form-control' />
                </div>

                <br />
                <div className="input-group form-group">
                    <div className="form-group input-group">
                        <label>Contraseña</label>
                    </div>
                    <div className="input-group-prepend">
                        <span className="input-group-text"><FontAwesomeIcon icon={faKey}></FontAwesomeIcon></span>
                    </div>
                    <input icon="fas fa-key" type="password" name="password" placeholder="Contraseña" value={pass || ''} onChange={(event) => { setPass(event.target.value) }} className='form-control' />
                </div>


                <br />
                <div className="form-group">
                    <input type="button" name="btn" value="Iniciar" onClick={peticion}
                        className="btn btn-outline-danger float-right login_btn" />
                </div>

            </form>
            <div className="form-group">
                <p style={{ color: 'red' }}>{ErroMessage}</p>
            </div>
        </CardComponent>



    )
}
function authenticate(e) {
    console.log(document.getElementById("user"));
}

export default LoginForm;