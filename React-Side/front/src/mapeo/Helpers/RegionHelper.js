
//RegionHelper contiene metodos de ayuda para manejar el mapeo

import Region from "../Region"

//convierte datos traidos de Axios a clase de region
function convertirDatos(record) {
    let region = new Region();
    region.codRegion = record[0];
    region.nomRegion = record[1];
    region.codPais = record[2];
    region.repEncargado = record[3];

    return region;
}

//Convierte muchos records de axios a una lista de regiones
function convertirMuchosDatos(records) {
    let listaRegion = [];
    records.map((rec, index) => (
        listaRegion.push(convertirDatos(rec))
    ))
    return listaRegion;
}

export { convertirDatos, convertirMuchosDatos }