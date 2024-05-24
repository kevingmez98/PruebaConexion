//PagoHelper contiene metodos de ayuda para manejar el mapeo

import Pago from "../Classes/Pago";

// Define un mapeo de nombres de campo entre la base de datos y la aplicación
const campoMap = {
    k_cod_pago: 'codigoPago',
    f_fecha: 'fecha',
    i_metodo: 'metodoPago',
    q_valor: 'valorPago'
};

//convierte datos traidos de Axios a clase de pago
function convertirDatos(record,fields) {
    let pago = new Pago();
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
                    pago[campoApp] = record[index];
                }
            }
        });
    } else {
        // Itera sobre las claves del mapeo
        for (let campoDb in campoMap) {
            // Verifica si el campo mapeado está en el registro
            if (record[campoDb] !== undefined) {
                const campoApp = campoMap[campoDb];
                pago[campoApp] = record[campoDb];
            }
        }
    }
    return pago;

}

//Convierte muchos records de axios a una lista de pedidos
function convertirMuchosDatos(records,fields) {
    let listaPagos = [];
    records.map((rec, index) => (
        listaPagos.push(convertirDatos(rec, fields))
    ))
    return listaPagos;
}


export { convertirDatos, convertirMuchosDatos}
