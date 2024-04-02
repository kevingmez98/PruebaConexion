import CardComponent from "../../public-component/Card/CardComponent";
import React from 'react';
import Axios from 'axios';
function GestionarRepCl() {
    const [ErroMessage, setMessage] = React.useState('');
    var [jsonData,SetjsonData]=React.useState('');

    React.useEffect(() => {
        try {
            
            peticion.apply();
            
        } catch (error) {

        }
    }, []);
    var peticion = () => {
        setMessage("");
        Axios.post('http://localhost:8080/cliente/representanteAsignado', { "Serial":window.sessionStorage.getItem("Serial")})
            .then((response) => {
                
             SetjsonData(JSON.stringify(response.data,null,4));
             console.log(jsonData);
                // Redireccion
            }
            ).catch((error) => {
                setMessage(error.response.data.errors);
            })
    }
    return (
        <CardComponent titulo={"Gestionar representante - cliente"}>
           <div className="p-3 mb-2 bg-info text-white">Representante</div>
           <p style={{ color: 'red' }}>{ErroMessage}</p>
        </CardComponent>
        
    )
}

export default GestionarRepCl;