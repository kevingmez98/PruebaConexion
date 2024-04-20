
//ClienteHelper contiene metodos de ayuda para manejar el mapeo

import Cliente from "../Classes/Cliente";

// Define un mapeo de nombres de campo entre la base de datos y la aplicación
const campoMap = {
    n_username: 'username',
    k_doc_cliente: 'docCliente',
    i_tipo_doc: 'tipoDoc',
    k_cod_ciudad: 'codCiudad',
    n_primer_nombre: 'primerNombre',
    n_segundo_nombre: 'segundoNombre',
    n_primer_apellido: 'primerApellido',
    n_segundo_apellido: 'segundoApellido',
    o_email: 'email',
    q_num_telefono: 'numTelefono',
    o_direccion: 'direccion',
};

//convierte datos traidos de Axios a clase de region
function convertirDatos(record) {
    let cliente = new Cliente();
    for (let campoDb in campoMap) {

        /*Se verifica si record tiene una propiedad que coincida con el valor del map evaluado*/
        if (record[campoDb] !== undefined) {

            //Se recupera el valor del map que pertence al de la clase que se mapea
            const campoApp = campoMap[campoDb];
            cliente[campoApp] = record[campoDb];
        }
    }
    
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