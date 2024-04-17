export default class Producto {

    constructor() {
        this._codProducto = "";
        this._idCatProducto = "";
        this._nomProducto = "";
        this._precioUnitario = "";
        this._idCatProSup = "";
        this._cantidadStock = "";
    }
    // Getter y setter para _cod_producto
    get codProducto() {
        return this._codProducto;
    }
    set codProducto(value) {
        this._codProducto = value;
    }

    // Getter y setter para _id_cat_producto
    get idCatProducto() {
        return this._idCatProducto;
    }
    set idCatProducto(value) {
        this._idCatProducto = value;
    }

    // Getter y setter para _id_cat_producto_sup
    get idCatProSup() {
        return this._idCatProSup;
    }
    set idCatProSup(value) {
        this._idCatProSup = value;
    }


    // Getter y setter para _nom_producto
    get nomProducto() {
        return this._nomProducto;
    }
    set nomProducto(value) {
        this._nomProducto = value;
    }

    //Getter y setter para precio
    get precioUnitario() {
        return this._precioUnitario;
    }

    set precioUnitario(precio) {
        this._precioUnitario = precio;
    }

    
    // Getter y setter para cantidad stock
    get cantidadStock() {
        return this._cantidadStock;
    }
    set cantidadStock(value) {
        this._cantidadStock = value;
    }
}

