export default class Cliente {
    constructor() {
        this._username = "";
        this._docCliente = "";
        this._tipoDoc = "";
        this._codCiudad = "";
        this._primerNombre = "";
        this._segundoNombre = "";
        this._primerApellido = "";
        this._segundoApellido = "";
        this._email = "";
        this._numTelefono = "";
        this._direccion = "";
    }

    
    // Getter y setter para _username
    get username() {
        return this._username;
    }
    set username(value) {
        this._username = value;
    }
        // Getter y setter para _codCiudad
        get codCiudad() {
            return this._u;
        }
        set codCiudad(value) {
            this._codCiudad = value;
        }
    

    // Getter y setter para _docCliente
    get docCliente() {
        return this._docCliente;
    }
    set docCliente(value) {
        this._docCliente = value;
    }

    // Getter y setter para _tipoDoc
    get tipoDoc() {
        return this._tipoDoc;
    }
    set tipoDoc(value) {
        this._tipoDoc = value;
    }

    // Getter y setter para _primerNombre
    get primerNombre() {
        return this._primerNombre;
    }
    set primerNombre(value) {
        this._primerNombre = value;
    }

    // Getter y setter para _segundoNombre
    get segundoNombre() {
        return this._segundoNombre;
    }
    set segundoNombre(value) {
        this._segundoNombre = value;
    }

    // Getter y setter para _primerApellido
    get primerApellido() {
        return this._primerApellido;
    }
    set primerApellido(value) {
        this._primerApellido = value;
    }

    // Getter y setter para _segundoApellido
    get segundoApellido() {
        return this._segundoApellido;
    }
    set segundoApellido(value) {
        this._segundoApellido = value;
    }

    // Getter y setter para _email
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }

    // Getter y setter para _numTelefono
    get numTelefono() {
        return this._numTelefono;
    }
    set numTelefono(value) {
        this._numTelefono = value;
    }

    // Getter y setter para _direccion
    get direccion() {
        return this._direccion;
    }
    set direccion(value) {
        this._direccion = value;
    }
}