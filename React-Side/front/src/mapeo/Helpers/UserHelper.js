
//UserHelper contiene metodos de ayuda para manejar el mapeo

import Usuario from "../Classes/Usuario";

//convierte datos traidos de Axios a clase de region
function convertirDatos(record) {
    let user = new Usuario();
    user.region = record[0];
    user.primerNombre = record[1];
    user.segundoNombre = record[2];
    user.primerApellido = record[3];
    user.segundoApellido = record[4];
    user.correo = record[6];

    return user;
}

//Solo convierte los datos de nombre y correo
function convertirDatosParcial(record){
    let user = new Usuario();
    user.region = record[0];
    user.primerNombre = record[1];
    user.primerApellido = record[2];
    user.correo = record[3];

    return user;
}

export { convertirDatos, convertirDatosParcial}