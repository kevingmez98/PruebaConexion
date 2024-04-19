//ItemHelper contiene metodos de ayuda para manejar el mapeo

import Item from "../Classes/Item"

// Define un mapeo de nombres de campo entre la base de datos y la aplicación
const campoMap = {
    k_cod_item: 'codigoItem',
    k_cod_pedido: 'codigoPedido',
    k_cod_region: 'codRegion',
    k_cod_producto: 'codProducto',
    i_id_cat_producto: 'idCategoriaProducto',
    q_cantidad: 'cantidad'
};

//convierte datos traidos de Axios a clase de producto
function convertirDatos(record) {
    let item = new Item();
    // Itera sobre las claves del mapeo
    for (let campoDb in campoMap) {

        /*Se verifica si record tiene una propiedad que coincida con el valor del map evaluado*/
        if (record[campoDb] !== undefined) {

            //Se recupera el valor del map que pertence al de la clase que se mapea
            const campoApp = campoMap[campoDb];
            item[campoApp] = record[campoDb];
        }
    }
    return item;
}

//Convierte muchos records de axios a una lista de pedidos
function convertirMuchosDatos(records) {
    let listaItems = [];
    records.map((rec, index) => (
        listaItems.push(convertirDatos(rec))
    ))
    return listaItems;
}

//Asignar productos a items
function asignarProductos(listaProd, listaItems) {
    // Itera sobre los items
    for (let i = 0; i < listaItems.length; i++) {
        const item = listaItems[i];

        // Encuentra el producto correspondiente al código del producto del item
        const productoAsociado = listaProd.find(producto => producto.codProducto === item.codProducto);
       
        // Si se encuentra el producto correspondiente se asigna
        if (productoAsociado) {
            item.producto = productoAsociado;
        }
    }
    return listaItems;
}


export { convertirDatos, convertirMuchosDatos, asignarProductos }
