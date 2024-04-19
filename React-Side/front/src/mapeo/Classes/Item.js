export default class Item {

    constructor() {
        this._codigoItem = "";
        this._codigoPedido = "";
        this._codRegion = "";
        this._codProducto = "";
        this._idCategoriaProducto = "";
        this._cantidad = "";

        //Este es un objeto tipo producto
        this._producto = "";
    }

    // Getter y setter para _codigoItem
    get codigoItem() {
        return this._codigoItem;
    }
    set codigoItem(valor) {
        this._codigoItem = valor;
    }

    // Getter y setter para _producto
    get producto() {
        return this._producto;
    }
    set producto(valor) {
        this._producto = valor;
    }
    // Getter y setter para _codigoPedido
    get codigoPedido() {
        return this.codigoPedido;
    }
    set codigoPedido(valor) {
        this._codigoPedido = valor;
    }
    // Getter y setter para _codigoProducto
    get codigoProducto() {
        return this._codigoProducto;
    }
    set codigoProducto(valor) {
        this._codigoProducto = valor;
    }

    // Getter y setter para _codRegion
    get codRegion() {
        return this._codRegion;
    }
    set codRegion(valor) {
        this._codRegion = valor;
    }

    // Getter y setter para _codProducto
    get codProducto() {
        return this._codProducto;
    }
    set codProducto(valor) {
        this._codProducto = valor;
    }

    // Getter y setter para _idCategoriaProducto
    get idCategoriaProducto() {
        return this._idCategoriaProducto;
    }
    set idCategoriaProducto(valor) {
        this._idCategoriaProducto = valor;
    }

    // Getter y setter para _cantidad
    get cantidad() {
        return this._cantidad;
    }
    set cantidad(valor) {
        this._cantidad = valor;
    }
}

