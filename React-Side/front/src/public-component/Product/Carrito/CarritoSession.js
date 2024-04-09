
export const actualizarCarrito = async (usuario, nomProducto, idProducto, cantidad,precio, reemplazar) => {
    try {
        //En lugar de sumar el valor de la cantidad se reemplaza deltodo
        if(!reemplazar){
            reemplazar = false;
        }
        //Obtener el carrito, si no existe se crea uno
        const claveCarrito = "carrito_" + usuario;

        let carritoActual = JSON.parse(sessionStorage.getItem(claveCarrito));
        if (!carritoActual) {
            carritoActual = { userId: usuario, productos: [] };
        }

        let cant;

        //Se busca el producto en el carrito
        const indiceProducto = carritoActual.productos.findIndex(item => item.idProducto === idProducto);

        // Se obtiene primero cual sería la cantidad total del producto si existe o no en el carrito
        if (indiceProducto !== -1) {
            cant = carritoActual.productos[indiceProducto].cantidad + parseInt(cantidad);

        } else {
            cant = cantidad;
        }

        //Se valida que el producto esté en inventario
        await validarProducto(idProducto, cant);

        // Si el producto ya está en el carrito, aumentar la cantidad
        if (indiceProducto !== -1) {
            
            //Si no se debe reemplazar se aumenta la cantidad
            if(!reemplazar){
                carritoActual.productos[indiceProducto].cantidad += parseInt(cantidad);
            }else{
                //Reeemplazar por el valor dado inicialmente
                carritoActual.productos[indiceProducto].cantidad = parseInt(cantidad);
                if(cantidad===0){
                    carritoActual.productos.splice(indiceProducto,1);
                }
            }
           

        } else {
            carritoActual.productos.push({ idProducto: idProducto, nombreProducto: nomProducto, cantidad: parseInt(cantidad),precio:parseInt(precio) });
        }

        //Calcular el precio
        carritoActual.total= calcularTotalCarrito(carritoActual.productos);
        //Se actualiza el carrito en sesion
        sessionStorage.setItem(claveCarrito, JSON.stringify(carritoActual));  
        return true;   
    } catch (error) {
        throw error;
    }

};

export const calcularTotalCarrito= (listaProductos) =>{
    let productos = listaProductos;

    let total= 0;

    console.log(productos.length);

    for (let i = 0; i < productos.length; i++) {
        const prod = productos[i];
        total += prod.precio*prod.cantidad;
    }

    return total;
}

export const obtenerCarrito = (usuario) => {
    const claveCarrito = "carrito_" + usuario;
    const valor = sessionStorage.getItem(claveCarrito);
    return valor ? JSON.parse(valor) : null;
};

export const eliminarCarrito = (usuario) => {
    const claveCarrito = "carrito_" + usuario;
    sessionStorage.removeItem(claveCarrito);
};


//Acá se valida lo de que esté en inventario un producto
const validarProducto = async (producto,cantidadProd) => {
    try {
        return true;
    } catch (error) {
        throw error;
    }
}