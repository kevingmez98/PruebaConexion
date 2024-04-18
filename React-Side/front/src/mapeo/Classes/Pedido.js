export default class Pedido {
    constructor(codigoPedido, documentoCliente, tipoDocumento, codigoRepresentante, codigoPago, estado, fechaPedido, calificacion) {
        this._codigoPedido = codigoPedido;
        this._documentoCliente = documentoCliente;
        this._tipoDocumento = tipoDocumento;
        this._codigoRepresentante = codigoRepresentante;
        this._codigoPago = codigoPago;
        this._estado = estado;
        this._fechaPedido = fechaPedido;
        this._calificacion = calificacion;

        this._items = [];
    }

    // Método para agregar un ítem al pedido
    agregarItem(item) {
        this._items.push(item);
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