
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
function convertirDatos(record,fields) {
    let cliente = new Cliente();
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
                    cliente[campoApp] = record[index];
                }
            }
        });
    } else {
        // Itera sobre las claves del mapeo
        for (let campoDb in campoMap) {
            // Verifica si el campo mapeado está en el registro
            if (record[campoDb] !== undefined) {
                const campoApp = campoMap[campoDb];
                cliente[campoApp] = record[campoDb];
            }
        }
    }
    return cliente;

    
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