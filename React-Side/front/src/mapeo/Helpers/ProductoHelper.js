
//productoHelper contiene metodos de ayuda para manejar el mapeo

import Producto from "../Classes/Producto"

// Define un mapeo de nombres de campo entre la base de datos y la aplicación
const campoMap = {
    k_cod_producto: 'codProducto',
    n_nom_producto: 'nomProducto',
    i_id_cat_producto: 'idCatProducto',
    i_id_cat_pro_sup: 'idCatProSuo',
    q_precio_unitario: 'precioUnitario',
    q_cantidad_en_stock: 'cantidadStock',
};

//convierte datos traidos de Axios a clase de producto
function convertirDatos(record) {
    let producto = new Producto();
    
    // Itera sobre las claves del mapeo
    for (let campoDb in campoMap) {
        
        /*Se verifica si record tiene una propiedad que coincida con el valor del map evaluado*/
        if (record[campoDb] !== undefined) {

            //Se recupera el valor del map que pertence al de la clase que se mapea
            const campoApp = campoMap[campoDb];
            producto[campoApp] = record[campoDb];
        }
    }
    return producto;
}

//Convierte muchos records de axios a una lista de productoes
function convertirMuchosDatos(records) {
    let listaproductos = [];
    records.map((rec, index) => (
        listaproductos.push(convertirDatos(rec))
    ))
    return listaproductos;
}

//Busca en una lista de productos un producto con un id en especifico
function buscarProducto(lista,idProducto){
    let producto = new Producto();

    for (let i = 0; i < lista.length; i++) {
        let p = lista[i];
        if(p.codProducto== idProducto){
            producto = p;
            break;
        }
    }
    return producto;
}


export { convertirDatos, convertirMuchosDatos, buscarProducto }