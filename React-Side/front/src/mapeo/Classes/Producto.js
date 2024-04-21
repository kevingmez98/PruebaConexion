export default class Producto {

    constructor() {
        this._codProducto = "";
        this._idCatProducto = "";
        this._nomProducto = "";
        this._precioUnitario = "";
        this._idCatProSup = "";
        this._cantidadStock = "";
    }

    // Getter y setter para _codProducto
    get codProducto() {
        return this._codProducto;
    }
    set codProducto(value) {
        this._codProducto = value;
    }

    // Getter y setter para _idCatProducto
    get idCatProducto() {
        return this._idCatProducto;
    }
    set idCatProducto(value) {
        this._idCatProducto = value;
    }

    // Getter y setter para _nomProducto
    get nomProducto() {
        return this._nomProducto;
    }
    set nomProducto(value) {
        this._nomProducto = value;
    }

    // Getter y setter para _precioUnitario
    get precioUnitario() {
        return this._precioUnitario;
    }
    set precioUnitario(value) {
        this._precioUnitario = value;
    }

    // Getter y setter para _idCatProSup
    get idCatProSup() {
        return this._idCatProSup;
    }
    set idCatProSup(value) {
        this._idCatProSup = value;
    }

    // Getter y setter para _cantidadStock
    get cantidadStock() {
        return this._cantidadStock;
    }
    set cantidadStock(value) {
        this._cantidadStock = value;
    }
}

