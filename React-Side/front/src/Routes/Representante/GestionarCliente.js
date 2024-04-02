import CardComponent from "../../public-component/Card/CardComponent";
import React from 'react';
import Axios from 'axios';
function GestionarCliente() {
    const [ErroMessage, setMessage] = React.useState('');
    var [jsonData,SetjsonData]=React.useState('');

    React.useEffect(() => {
        try {
            
            peticion.apply();
            console.log(jsonData);
            
        } catch (error) {

        }
    }, []);
    var peticion = () => {
        setMessage("");
        Axios.post('http://localhost:8080/representante/clientes', { "Serial":window.sessionStorage.getItem("Serial")})
            .then((response) => {
                
             SetjsonData(JSON.stringify(response.data,null,4));
             console.log(jsonData);
                // Redireccion
            }
            ).catch((error) => {
                console.log(error.response.data.errors)
            })
    }
    return (
        <CardComponent titulo={"Gestion de clientess"}>
           <div className="p-3 mb-2 bg-info text-white">Gestion de clientes</div>
           <p style={{ color: 'red' }}>{ErroMessage}</p>
        </CardComponent>
    )
}

export default GestionarCliente;