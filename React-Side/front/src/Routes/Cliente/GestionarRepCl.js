import CardComponent from "../../public-component/Card/CardComponent";
import SimpleTable from "../../public-component/JSONTable/SimpleTable";
import BtnTable from "../../public-component/JSONTable/BtnTable";
import React from 'react';
import Axios from 'axios';
function GestionarRepCl() {
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
            Axios.post('http://localhost:8080/cliente/representanteAsignado', { "Serial": window.sessionStorage.getItem("Serial")})
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
        <CardComponent titulo={"Gestionar representante - cliente"}>
           <div className="p-3 mb-2 bg-info text-white">Representante</div>
           <p style={{ color: 'red' }}>{ErroMessage}</p>
        </CardComponent>
            <SimpleTable dataJson={jsonData}></SimpleTable>
            <BtnTable dataJson={jsonData}></BtnTable>
        </div>
    )
}

export default GestionarRepCl;