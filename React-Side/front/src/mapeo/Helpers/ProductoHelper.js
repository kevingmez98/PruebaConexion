
//productoHelper contiene metodos de ayuda para manejar el mapeo

import Producto from "../Producto"

//convierte datos traidos de Axios a clase de producto
function convertirDatos(record) {
    let producto = new Producto();
    
    producto.nomProducto = record[0];
    
    producto.codProducto = record[1];
    producto.idCatProducto = record[2];
    producto.idCatProSup = record[3];
    producto.precioUnitario = record[4];
    producto.cantidadStock = record[5];
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
    console.log(lista);
    console.log(idProducto);
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