export default class Region {
    constructor() {
        this._codRegion = "";
        this._nomRegion = "";
        this._codPais = "";
        this._repEncargado = "";
    }


    // Getter y Setter para codRegion
    get codRegion() {
        return this._codRegion;
    }

    set codRegion(value) {
        this._codRegion = value;
    }

    // Getter y Setter para nomRegion
    get nomRegion() {
        return this._nomRegion;
    }

    set nomRegion(value) {
        this._nomRegion = value;
    }

    // Getter y Setter para codPais
    get codPais() {
        return this._codPais;
    }

    set codPais(value) {
        this._codPais = value;
    }

    // Getter y Setter para repEncargado
    get repEncargado() {
        return this._repEncargado;
    }

    set repEncargado(value) {
        this._repEncargado = value;
    }
}