//Un js con metodos para manejar listas


// Función para dividir un array en grupos de tamaño dado
function dividirArray(array, size) {
    const listaDividida = [];
    for (let i = 0; i < array.length; i += size) {
        listaDividida.push(array.slice(i, i + size));
    }
    return listaDividida;
}

export {dividirArray}