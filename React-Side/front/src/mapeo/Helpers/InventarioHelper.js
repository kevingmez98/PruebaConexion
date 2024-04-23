
//InventarioHelper contiene metodos de ayuda para manejar el mapeo

import Inventario from "../Classes/Inventario"

// Define un mapeo de nombres de campo entre la base de datos y la aplicación
const campoMap = {
    k_cod_region: 'codProducto',
    k_cod_producto: 'nomProducto',
    i_id_cat_producto: 'idCatProducto',
    q_precio_unitario: 'precioUnitario',
    q_cantidad_en_stock: 'cantidadStock',
};

//convierte datos traidos de Axios a clase de inventario
function convertirDatos(record, fields) {
    let inventario = new Inventario();
    
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
                    inventario[campoApp] = record[index];
                }
            }
        });
    } else {
        // Itera sobre las claves del mapeo
        for (let campoDb in campoMap) {
            // Verifica si el campo mapeado está en el registro
            if (record[campoDb] !== undefined) {
                const campoApp = campoMap[campoDb];
                inventario[campoApp] = record[campoDb];
            }
        }
    }
    return inventario;
}


//Convierte muchos records de axios a una lista de inventarios
function convertirMuchosDatos(records,fields) {
    let listaInv= [];
    records.map((rec, index) => (
        listaInv.push(convertirDatos(rec,fields))
    ))
    return listaInv;
}

export { convertirDatos, convertirMuchosDatos }