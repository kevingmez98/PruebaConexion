
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
function convertirDatos(record, fields) {
    let producto = new Producto();
    
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
                    producto[campoApp] = record[index];
                }
            }
        });
    } else {
        // Itera sobre las claves del mapeo
        for (let campoDb in campoMap) {
            // Verifica si el campo mapeado está en el registro
            if (record[campoDb] !== undefined) {
                const campoApp = campoMap[campoDb];
                producto[campoApp] = record[campoDb];
            }
        }
    }
    return producto;
}


//Convierte muchos records de axios a una lista de productoes
function convertirMuchosDatos(records,fields) {
    let listaproductos = [];
    records.map((rec, index) => (
        listaproductos.push(convertirDatos(rec,fields))
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