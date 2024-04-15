
//CatProductoHelper contiene metodos de ayuda para manejar el mapeo

import CatProducto from "../CatProducto"

//convierte datos traidos de Axios a clase de catProducto
function convertirDatos(record) {
    let catProd = new CatProducto();
    catProd.idCatProducto = record[0];
    catProd.idCatProSup = record[1];
    catProd.nomCat = record[2];

    return catProd;
}

//Convierte muchos records de axios a una lista de categorias
function convertirMuchosDatos(records) {
    let listaCat = [];
    {
        records.map((rec, index) => (
            listaCat.push(convertirDatos(rec))
        ))
    }

    return listaCat;
}

//Analiza una lista de categorias y las organiza por listas dependiendo de sus categorias
function organizarCategorias(categorias) {

    let categoriasMap = new Map();

    // Crear un mapa con el id de la categoría como clave y la categoría como valor
    categorias.forEach(categoria => {
        categoriasMap.set(categoria.idCatProducto, categoria);
    });


    // Recorrer nuevamente para organizar las subcategorías
    categorias.forEach(categoria => {
        // Si la categoría tiene una categoría padre válida, agregarla como subcategoría

        if (categoria.idCatProSup !== null && categoriasMap.has(categoria.idCatProSup)) {
            //Se obtiene la categoria 'padre'
            let padre = categoriasMap.get(categoria.idCatProSup);
            padre.agregarSubcategoria(categoria);
        }
    });

    // Filtrar las categorías principales, es decir, aquellas sin categoria padre
    let categoriasPrincipales = categorias.filter(categoria => categoria.idCatProSup === null);

    // Agregar categorías sin padres (no null) al final de la lista de categorías principales
    categorias.forEach(categoria => {
        if (!categoriasMap.has(categoria._idCatProSup)) {
            categoriasPrincipales.push(categoria);
        }
    });

    //Las categorias principales ya tienen sus subcategorias
    return categoriasPrincipales;
}

export { convertirDatos, convertirMuchosDatos, organizarCategorias }