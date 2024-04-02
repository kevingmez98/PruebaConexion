import CardComponent from "../../public-component/Card/CardComponent";
import SimpleTable from "../../public-component/JSONTable/SimpleTable";
import BtnTable from "../../public-component/JSONTable/BtnTable";
import React from 'react';
import Axios from 'axios';

function GestionarRepresentante() {
    const [ErroMessage, setMessage] = React.useState('');
    var [jsonData,SetjsonData]=React.useState('');
    
    

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // Esperamos la resolución de la promesa usando await
                const data = await peticion();
                // Una vez que la promesa se resuelve, actualizamos el estado con los datos recibidos
                SetjsonData(data);
                console.log(data); // Aquí puedes ver los datos en la consola
            } catch (error) {
                // Manejamos cualquier error que pueda ocurrir
                console.error('Error al obtener los datos:', error);
            }
        };
    
        fetchData();
    }, []);
    
    var peticion = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/Director/representantesA', { "Serial": window.sessionStorage.getItem("Serial")})
                .then((response) => {
                    // Resolvemos la promesa con los datos recibidos
                    resolve(response.data);
                })
                .catch((error) => {
                    // Rechazamos la promesa con el mensaje de error
                    setMessage(error.response.data.errors);
                });
        });
    };
    
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