//Un js con metodos para manejar operaciones del pedido en el front

// Función para calcular el precio total dada una lista de productos
function calcularTotalPedido(listaProductos) {
    let productos = listaProductos;

    let total= 0;

    for (let i = 0; i < productos.length; i++) {
        const prod = productos[i];
        total += prod.precioUnitario*prod.cantidad;
    }

    return total;
}

// Función para calcular el precio total dada una lista de Items
function calcularTotalPedidoItems(listaItems) {
    let items = listaItems;

    let total= 0;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        total += item.producto.precioUnitario*item.cantidad;
    }

    return total;
}

export {calcularTotalPedido, calcularTotalPedidoItems}