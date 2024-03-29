import CardComponent from '../public-component/Card/CardComponent';
import InputGroup from '../public-component/Form/InputGroup';

function LoginForm() {

    return (

        <CardComponent titulo="Inicio de sesion">

            <form action="" method="post">

                <InputGroup icon="fas fa user" type="text" name="email" placeholder="Usuario" />

                <InputGroup icon="fas fa-key" type="password" name="password" placeholder="Contraseña" />

                <br/>
                <div className="form-group">
                    <input type="submit" name="btn" value="Iniciar"
                        className="btn btn-outline-danger float-right login_btn" />
                </div>

            </form>

        </CardComponent>


    )
}


export default LoginForm;