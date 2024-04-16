
//ClienteHelper contiene metodos de ayuda para manejar el mapeo

import Cliente from "../Cliente";

//convierte datos traidos de Axios a clase de region
function convertirDatos(record) {
    let cliente = new Cliente();
    cliente.docCliente = record[0];
    cliente.tipoDoc = record[1];
    cliente.primerNombre = record[2];
    cliente.segundoNombre = record[3];
    cliente.primerApellido = record[4];
    cliente.segundoApellido = record[5];
    
    cliente.email = record[6];
    cliente.numTelefono = record[7];
    cliente.direccion = record[8];
    
    return cliente;
}

//Convierte muchos records de axios a una lista de regiones
function convertirMuchosDatos(records) {
    let listaCliente = [];
    records.map((rec, index) => (
        listaCliente.push(convertirDatos(rec))
    ))
    return listaCliente;
}

export { convertirDatos, convertirMuchosDatos }