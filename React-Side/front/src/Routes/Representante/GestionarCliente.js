import CardComponent from "../../public-component/Card/CardComponent";
import React from 'react';
import Axios from 'axios';
function GestionarCliente() {
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
            Axios.post('http://localhost:8080/representante/clientes', { "Serial": window.sessionStorage.getItem("Serial")})
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
        <CardComponent titulo={"Gestion de clientess"}>
           <div className="p-3 mb-2 bg-info text-white">Gestion de clientes</div>
           <p style={{ color: 'red' }}>{ErroMessage}</p>
        </CardComponent>
    )
}

export default GestionarCliente;