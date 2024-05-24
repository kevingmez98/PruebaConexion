//Clase para guardar datos de una Usuario sea representante o cliente
export default class Usuario {

    constructor() {
        this._region = "";
        this._primerNombre = "";
        this._primerApellido = "";
        this._segundoNombre = "";
        this._segundoApellido = "";
        this._correo = "";
        this._ciudad = "";
        this._numTelefono = "";
        this._direccion = "";
    }

    // Getter y setter para la región
    get region() {
        return this._region;
    }

    set region(region) {
        this._region = region;
    }
    // Getter y setter para la telefono
    get numTelefono() {
        return this._numTelefono;
    }

    set numTelefono(numTelefono) {
        this._numTelefono = numTelefono;
    }

     // Getter y setter para la telefono
     get direccion() {
        return this._direccion;
    }

    set direccion(direccion) {
        this._direccion = direccion;
    }

    // Getter y setter para la ciudad
    get ciudad() {
        return this._ciudad;
    }

    set ciudad(ciudad) {
        this._ciudad = ciudad;
    }
    // Getter y setter para el primer nombre
    get primerNombre() {
        return this._primerNombre;
    }

    set primerNombre(primerNombre) {
        this._primerNombre = primerNombre;
    }

    // Getter y setter para el primer apellido
    get primerApellido() {
        return this._primerApellido;
    }

    set primerApellido(primerApellido) {
        this._primerApellido = primerApellido;
    }

    // Getter y setter para el segundo nombre
    get segundoNombre() {
        return this._segundoNombre;
    }

    set segundoNombre(segundoNombre) {
        this._segundoNombre = segundoNombre;
    }

    // Getter y setter para el segundo apellido
    get segundoApellido() {
        return this._segundoApellido;
    }

    set segundoApellido(segundoApellido) {
        this._segundoApellido = segundoApellido;
    }

    // Getter y setter para el correo
    get correo() {
        return this._correo;
    }

    set correo(correo) {
        this._correo = correo;
    }
}