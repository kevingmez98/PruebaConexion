export default class Inventario {

    constructor() {
        this._codRegion = "";
        this._codProducto = "";
        this._idCategoriaProducto = "";
        this._cantidadStock = "";
        this._precioUnitario = "";
    }

    // Getter y setter para _codRegion
    get codRegion() {
        return this._codRegion;
    }
    set codRegion(codRegion) {
        this._codRegion = codRegion;
    }

    // Getter y setter para _codProducto
    get codProducto() {
        return this._codProducto;
    }
    set codProducto(codProducto) {
        this._codProducto = codProducto;
    }

    // Getter y setter para _idCategoriaProducto
    get idCategoriaProducto() {
        return this._idCategoriaProducto;
    }
    set idCategoriaProducto(idCategoriaProducto) {
        this._idCategoriaProducto = idCategoriaProducto;
    }

    // Getter y setter para _cantidadStock
    get cantidadStock() {
        return this._cantidadStock;
    }
    set cantidadStock(cantidadStock) {
        this._cantidadStock = cantidadStock;
    }

    // Getter y setter para _precioUnitario
    get precioUnitario() {
        return this._precioUnitario;
    }
    set precioUnitario(precioUnitario) {
        this._precioUnitario = precioUnitario;
    }
}

