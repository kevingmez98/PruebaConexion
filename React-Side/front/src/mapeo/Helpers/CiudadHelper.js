
//CiudadHelper contiene metodos de ayuda para manejar el mapeo

import Ciudad from "../Classes/Ciudad";

// Define un mapeo de nombres de campo entre la base de datos y la aplicación
const campoMap = {
    k_cod_ciudad:"codCiudad",
    k_cod_region:"codRegion",
    n_nom_ciudad:"nomCiudad" 
};

//convierte datos traidos de Axios a clase de region
function convertirDatos(record,fields) {
    let ciudad = new Ciudad();
    // Verifica si se proporciona una lista de campos
    if (Array.isArray(fields)) {
        // Itera sobre los campos y asigna los valores correspondientes
        fields.forEach((campoDb, index) => {
            // Verifica si el índice está dentro del rango de la lista de campos
            if (index < record.length) {
                // Verifica si el campo mapeado está en el campo de fields
                if (campoDb.name.toLowerCase() in campoMap) {
                    //Se asigna el campo corresponiente en records
                    const campoApp = campoMap[campoDb.name.toLowerCase()];
                    ciudad[campoApp] = record[index];
                }
            }
        });
    } else {
        // Itera sobre las claves del mapeo
        for (let campoDb in campoMap) {
            // Verifica si el campo mapeado está en el registro
            if (record[campoDb] !== undefined) {
                const campoApp = campoMap[campoDb];
                ciudad[campoApp] = record[campoDb];
            }
        }
    }
    return ciudad;

}

//Convierte muchos records de axios a una lista de regiones
function convertirMuchosDatos(records, fields) {
    let listaCiudad = [];
    records.map((rec, index) => (
        listaCiudad.push(convertirDatos(rec,fields))
    ))
    return listaCiudad;
}

export { convertirDatos, convertirMuchosDatos }