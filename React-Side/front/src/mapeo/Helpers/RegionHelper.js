
//RegionHelper contiene metodos de ayuda para manejar el mapeo

import Region from "../Classes/Region"


// Define un mapeo de nombres de campo entre la base de datos y la aplicación
const campoMap = {
    k_cod_region: 'codRegion',
    k_cod_pais: 'codPais',
    k_rep_encargado: 'repEncargado',
    n_nom_region: 'nomRegion',
};

//convierte datos traidos de Axios a clase de region
function convertirDatos(record,fields) {
    let region = new Region();
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
                    region[campoApp] = record[index];
                }
            }
        });
    } else {
        // Itera sobre las claves del mapeo
        for (let campoDb in campoMap) {
            // Verifica si el campo mapeado está en el registro
            if (record[campoDb] !== undefined) {
                const campoApp = campoMap[campoDb];
                region[campoApp] = record[campoDb];
            }
        }
    }


    return region;
}

//Convierte muchos records de axios a una lista de regiones
function convertirMuchosDatos(records, fields) {
    let listaRegion = [];
    records.map((rec, index) => (
        listaRegion.push(convertirDatos(rec, fields))
    ))
    return listaRegion;
}

//Convierte un formato de doss listas (nomRegion, idRegion) a objetos
function convertirFormatoRegion(listaNom, listaId) {
    let regiones = [];
    for (let i = 0; i < listaNom.length; i++) {
        let region = new Region();
        region.codPais = 'COL';
        region.codRegion = listaId[i];
        region.nomRegion = listaNom[i];
        regiones.push(region);
    }
    return regiones;
}

export { convertirDatos, convertirMuchosDatos, convertirFormatoRegion }