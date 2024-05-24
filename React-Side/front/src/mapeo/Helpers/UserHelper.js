
//UserHelper contiene metodos de ayuda para manejar el mapeo

import Usuario from "../Classes/Usuario";

const campoMap = {
    k_cod_ciudad: 'ciudad',
    n_primer_nombre: 'primerNombre',
    n_segundo_nombre: 'segundoNombre',
    n_primer_apellido: 'primerApellido',
    n_segundo_apellido: 'segundoApellido',
    o_email: 'correo',
    q_num_telefono: 'numTelefono',
    o_direccion: 'direccion',
    k_cod_region: 'region'
};


//convierte datos traidos de Axios a clase de usuario
function convertirDatos(record,fields) {
    let usuario = new Usuario();
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
                    usuario[campoApp] = record[index];
                }
            }
        });
    } else {
        // Itera sobre las claves del mapeo
        for (let campoDb in campoMap) {
            // Verifica si el campo mapeado está en el registro
            if (record[campoDb] !== undefined) {
                const campoApp = campoMap[campoDb];
                usuario[campoApp] = record[campoDb];
            }
        }
    }
    return usuario;

}

//Convierte muchos records de axios a una lista de pedidos
function convertirMuchosDatos(records,fields) {
    let listausuarios = [];
    records.map((rec, index) => (
        listausuarios.push(convertirDatos(rec, fields))
    ))
    return listausuarios;
}

//Forma el nombre sin los espacioss en null
function concatenarNombre(usuario){
    //Traer componentes del nombre
    const { primerNombre, segundoNombre, primerApellido, segundoApellido } = usuario;

    const nombresYApellidos = [primerNombre, segundoNombre, primerApellido, segundoApellido]
        .filter(nombre => nombre) // Filtra los valores que no sean null ni undefined
        .join(' '); // Únelos con un espacio

    return nombresYApellidos;
}


export { convertirDatos, convertirMuchosDatos, concatenarNombre}