export default class Ciudad {
    constructor() {
        this._codCiudad = "";
        this._codRegion = "";
        this._nomCiudad = "";
    }

    
    // Getter para el código de la ciudad
    get codCiudad() {
        return this._codCiudad;
    }

    // Setter para el código de la ciudad
    set codCiudad(value) {
        this._codCiudad = value;
    }

    // Getter para el código de la región
    get codRegion() {
        return this._codRegion;
    }

    // Setter para el código de la región
    set codRegion(value) {
        this._codRegion = value;
    }

    // Getter para el nombre de la ciudad
    get nomCiudad() {
        return this._nomCiudad;
    }

    // Setter para el nombre de la ciudad
    set nomCiudad(value) {
        this._nomCiudad = value;
    }
}