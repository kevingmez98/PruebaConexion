
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
    calificacion: 'calificacion'
};

//convierte datos traidos de Axios a clase de producto
function convertirDatos(record) {
    let pedido = new Pedido();
 
    // Itera sobre las claves del mapeo
    for (let campoDb in campoMap) {
        
        /*Se verifica si record tiene una propiedad que coincida con el valor del map evaluado*/
        if (record[campoDb] !== undefined) {

            //Se recupera el valor del map que pertence al de la clase que se mapea
            const campoApp = campoMap[campoDb];
            pedido[campoApp] = record[campoDb];
        }
    }
    return pedido;
}

//Convierte muchos records de axios a una lista de pedidos
function convertirMuchosDatos(records) {
    let listaPedidos = [];
    records.map((rec, index) => (
        listaPedidos.push(convertirDatos(rec))
    ))
    return listaPedidos;
}

export {convertirDatos, convertirMuchosDatos}
