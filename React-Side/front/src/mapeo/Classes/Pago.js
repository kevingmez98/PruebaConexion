export default class Pago {
    constructor() {
            this._codigoPago = "";
            this._fecha = "";
            this._metodoPago = "";
            this._valorPago = "";
    }

    // Getter y Setter para _codigoPago
    get codigoPago() {
        return this._codigoPago;
    }

    set codigoPago(value) {
        this._codigoPago = value;
    }

    // Getter y Setter para _fecha
    get fecha() {
        return this._fecha;
    }

    set fecha(value) {
        this._fecha = value;
    }

    // Getter y Setter para _metodoPago
    get metodoPago() {
        return this._metodoPago;
    }

    set metodoPago(value) {
        this._metodoPago = value;
    }

    // Getter y Setter para _valorPago
    get valorPago() {
        return this._valorPago;
    }

    set valorPago(value) {
        this._valorPago = value;
    }   

}