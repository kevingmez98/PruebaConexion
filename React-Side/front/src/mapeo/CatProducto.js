export default class CatProducto {

    /*
    IdCatProducto es el id de la categoria producto
    idCatProSup es el id de la categoria padre
    NomCat es el nombre de la categoria
    */
    constructor() {
        this._idCatProducto = "";
        this._idCatProSup = "";
        this._nomCat = "";
        this._subcategorias = [];
    }

     // Método para agregar una subcategoría
     agregarSubcategoria(subcategoria) {
        this._subcategorias.push(subcategoria);
    }

    // Método para obtener todas las subcategorías
    obtenerSubcategorias() {
        return this._subcategorias;
    }

    // Getter para obtener el ID de la categoría del producto
    get idCatProducto() {
        return this._idCatProducto;
    }

    // Setter para establecer el ID de la categoría del producto
    set idCatProducto(idCatProducto) {
        this._idCatProducto = idCatProducto;
    }

    // Getter para obtener el ID de la categoría padre
    get idCatProSup() {
        return this._idCatProSup;
    }

    // Setter para establecer el ID de la categoría padre
    set idCatProSup(idCatProSup) {
        this._idCatProSup = idCatProSup;
    }

    // Getter para obtener el nombre de la categoría
    get nomCat() {
        return this._nomCat;
    }

    // Setter para establecer el nombre de la categoría
    set nomCat(nomCat) {
        this._nomCat = nomCat;
    }

}

