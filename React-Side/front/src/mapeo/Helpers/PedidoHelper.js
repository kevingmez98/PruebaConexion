
//pedidoHelper contiene metodos de ayuda para manejar el mapeo

import Pedido from "../Classes/Pedido"

// Define un mapeo de nombres de campo entre la base de datos y la aplicación
const campoMap = {
    k_cod_pedido: 'codigoPedido',
    documento_cliente: 'documentoCliente',
    tipo_documento: 'tipoDocumento',
    k_cod_representante: 'codigoRepresentante',
    k_cod_pago: 'codigoPago',
    i_estado: 'estado',
    fecha_pedido: 'fechaPedido',
    q_calificacion: 'calificacion'
};

//convierte datos traidos de Axios a clase de pedido
function convertirDatos(record,fields) {
    let pedido = new Pedido();
 
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
                pedido[campoApp] = record[index];
            }
        }
    });
} else {
    // Itera sobre las claves del mapeo
    for (let campoDb in campoMap) {
        // Verifica si el campo mapeado está en el registro
        if (record[campoDb] !== undefined) {
            const campoApp = campoMap[campoDb];
            pedido[campoApp] = record[campoDb];
        }
    }
}

    return pedido;
}

//Convierte muchos records de axios a una lista de pedidos
function convertirMuchosDatos(records,fields) {
    let listaPedidos = [];
    records.map((rec, index) => (
        listaPedidos.push(convertirDatos(rec,fields))
    ))
    return listaPedidos;
}

export {convertirDatos, convertirMuchosDatos}
