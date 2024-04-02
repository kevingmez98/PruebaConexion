import CardComponent from "../../public-component/Card/CardComponent";
import SimpleTable from "../../public-component/JSONTable/SimpleTable";
import BtnTable from "../../public-component/JSONTable/BtnTable";
import React from 'react';
import Axios from 'axios';

function GestionarRepresentante() {
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
        Axios.post('http://localhost:8080/Director/representantesA', { "Serial":window.sessionStorage.getItem("Serial")})
            .then((response) => {
             SetjsonData(JSON.stringify(response.data,null,4));
             console.log(jsonData);
            
                // Redireccion
            }
            ).catch((error) => {
                setMessage(error.response.data.errors)
            })
    }
    
    return (
        <div className="container">
            <CardComponent titulo={"Gestion de representantes"}>
                <div className="p-3 mb-2 bg-info text-white">Gestion de representante</div>
                <p style={{ color: 'red' }}>{ErroMessage}</p>
            </CardComponent>
            <SimpleTable dataJson={jsonData}></SimpleTable>
            <BtnTable dataJson={jsonData}></BtnTable>
            
                
            
            <div className="form-group">
                    <input type="button" name="btn" value="Iniciar" onClick={peticion}
                        className="btn btn-outline-danger float-right login_btn" />
                </div>
        </div>
        

    )
}

export default GestionarRepresentante;