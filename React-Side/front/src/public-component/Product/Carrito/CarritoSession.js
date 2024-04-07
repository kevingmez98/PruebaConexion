
export const actualizarCarrito = async (usuario, producto, cantidad) => {
    try {
        //Obtener el carrito, si no existe se crea uno
        const claveCarrito = "carrito_" + usuario;
        
        let carritoActual = JSON.parse(sessionStorage.getItem(claveCarrito));
        if (!carritoActual) {
            carritoActual = { userId: usuario, productos: [] };
        }
        //Se valida que el producto esté en inventario
        await validarProducto(producto);

        //Se busca el producto en el carrito
        const indiceProducto = carritoActual.productos.findIndex(item => item.idProducto === producto);

        // Si el producto ya está en el carrito, aumentar la cantidad
        if (indiceProducto !== -1) {
            carritoActual.productos[indiceProducto].cantidad += parseInt(cantidad);
        } else {
            carritoActual.productos.push({ idProducto: producto, cantidad: parseInt(cantidad) })
        }
        sessionStorage.setItem(claveCarrito, JSON.stringify(carritoActual));
    } catch (error) {
        throw error;
    }

};

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
const validarProducto = async (producto) => {
    try {
        return true;
    } catch (error) {
        throw error;
    }
}