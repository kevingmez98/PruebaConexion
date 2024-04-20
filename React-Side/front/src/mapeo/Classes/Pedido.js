export default class Pedido {
    constructor() {
        this._codigoPedido = "";
        this._documentoCliente = "";
        this._tipoDocumento = "";
        this._codigoRepresentante = "";
        this._codigoPago = "";
        this._estado = "";
        this._fechaPedido = "";
        this._calificacion = "";

        this._items = [];
    }

    // Método para agregar un ítem al pedido
    agregarItem(item) {
        this._items.push(item);
    }

    //metodo para obtener items
    get items(){
        return this._items;
    }


    // Getters
    get codigoPedido() {
        return this._codigoPedido;
    }

    get documentoCliente() {
        return this._documentoCliente;
    }

    get tipoDocumento() {
        return this._tipoDocumento;
    }

    get codigoRepresentante() {
        return this._codigoRepresentante;
    }

    get codigoPago() {
        return this._codigoPago;
    }

    get estado() {
        return this._estado;
    }

    get fechaPedido() {
        return this._fechaPedido;
    }

    get calificacion() {
        return this._calificacion;
    }

    // Setters

    set codigoPedido(codigo) {
        this._codigoPedido = codigo;
    }


    set documentoCliente(documentoCliente) {
        this._documentoCliente = documentoCliente;
    }

    set tipoDocumento(tipoDocumento) {
        this._tipoDocumento = tipoDocumento;
    }

    set codigoRepresentante(codigoRepresentante) {
        this._codigoRepresentante = codigoRepresentante;
    }

    set codigoPago(codigoPago) {
        this._codigoPago = codigoPago;
    }

    set estado(estado) {
        this._estado = estado;
    }

    set fechaPedido(fechaPedido) {
        this._fechaPedido = fechaPedido;
    }

    set calificacion(calificacion) {
        this._calificacion = calificacion;
    }
}