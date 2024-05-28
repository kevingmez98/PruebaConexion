import CardComponent from "../../public-component/Card/DarkCard/CardComponent";
import SimpleTable from "../../public-component/JSONTable/SimpleTable";
import React, { useState } from 'react';
import Axios from 'axios';
import Alert from 'react-bootstrap/Alert';

//Funcion para ver una lista de estadissticass de diferentes representantes
function VerListaEstadisticas() {

    //Mensaje de error
    const [ErroMessage, setMessage] = React.useState('');

    //Datos que serán traidos
    var [datosJson, SetDatosJson] = React.useState('');

    //UseEffect inicial. Carga al inicio con la pagina
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // Esperamos la resolución de la promesa usando await
                const data = await peticionEstadisticas();

                // Una vez que la promesa se resuelve, actualizamos el estado con los datos recibidos
                SetDatosJson(data);

            } catch (error) {
                // Manejamos cualquier error que pueda ocurrir
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, []);


    var peticionEstadisticas = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/Director/verListaEstadisticas', { "Serial": window.sessionStorage.getItem("Serial") })
                .then((response) => {
                    // Resolvemos la promesa con los datos recibidos
                    resolve(response.data);
                })
                .catch((error) => {
                    // Rechazamos la promesa con el mensaje de error
                    if (error.response && error.response.data && error.response.data.errors) {
                        setMessage(error.response.data.errors);
                        reject(error.response.data.errors);
                    } else {
                        setMessage("Error desconocido");
                        reject("Error desconocido");
                    }
                });
        });
    };

    return (
        <React.Fragment>
            <CardComponent titulo={"Ver representantes a cargo"}>
                <div className="p-3 mb-2 bg-info text-white">Lista estadisticas</div>
                {/*Mensaje de error */}
                {ErroMessage && (
                    <Alert variant="danger">{ErroMessage}</Alert>
                )}
            </CardComponent>
            <br />
            <hr />
            <SimpleTable dataJson={datosJson}></SimpleTable>
        </React.Fragment>


    )

}

export default VerListaEstadisticas;