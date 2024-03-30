import CardComponent from '../public-component/Card/CardComponent';
import InputGroup from '../public-component/Form/InputGroup';
import React from 'react';
import Axios from 'axios';
function LoginForm() {
const [user,setUser]=React.useState('');
const [pass,setPass]=React.useState('');
const [ErroMessage,setMessage]=React.useState('');

React.useEffect(() => {
    try{
       setUser(window.sessionStorage.getItem("user"))
       setPass(window.sessionStorage.getItem("pass"))
       window.sessionStorage.getItem("Role")
       peticion.call();
    }catch(error){

    }
  }, []);

    var peticion=()=>{
        setMessage("");
        Axios.post('http://localhost:8080/ola/sex',{pass:pass,user:user})
        .then((response)=>{
        window.sessionStorage.setItem("user",response.data.user);
        window.sessionStorage.setItem("pass",response.data.pass);
        window.sessionStorage.setItem("Role",response.data.Role);
        setMessage("Usuario autenticado");
        // Aqui se ejecutaria la funcion que redirige al dashboart si la autenticacion es correcta
        }
        ).catch((error)=>{ 
            setMessage(error.response.data.errors)
        })
}

    return (

        <CardComponent titulo="Inicio de sesion">

            <form  method="post">

                <input icon="fas fa user" type="text" name="email" placeholder="Usuario" value={user} onChange={(event)=>{setUser(event.target.value)}} />

                <input icon="fas fa-key" type="password" name="password" placeholder="Contraseña" value={pass} onChange={(event)=>{setPass(event.target.value)}} />

                <br/>
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
function authenticate(e){
   console.log(document.getElementById("user"));
}

export default LoginForm;