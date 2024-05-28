package com.example.Utils;

import com.fasterxml.jackson.annotation.JsonCreator;

public class CLIENTEPOJO {

private String usuario;
private String documento;
private String tipodocumento;
private String codigociudad;
private String primernombre;
private String segundonombre;
private String primerapellido;
private String segundoapellido;
private String email;
private String numtelefono;
private String direccion;
private String serial;
private String pass;
private String genero;
private String fechanacimiento;





@JsonCreator
public CLIENTEPOJO(String usuario, String documento, String tipodocumento, String codigociudad, String primernombre,
        String segundonombre, String primerapellido, String segundoapellido, String email, String numtelefono,
        String direccion,String serial,String pass,String genero,String fechanacimiento) {
    this.usuario = usuario;
    this.documento = documento;
    this.tipodocumento = tipodocumento;
    this.codigociudad = codigociudad;
    this.primernombre = primernombre;
    this.segundonombre = segundonombre;
    this.primerapellido = primerapellido;
    this.segundoapellido = segundoapellido;
    this.email = email;
    this.numtelefono = numtelefono;
    this.direccion = direccion;
    this.serial = serial;
    this.pass=pass;
    this.genero=genero;
    this.fechanacimiento=fechanacimiento;
}
public String getSerial() {
    return serial;
}
public void setSerial(String serial) {
    this.serial = serial;
}
public String getUsuario() {
    return usuario;
}
public void setUsuario(String usuario) {
    this.usuario = usuario;
}
public String getDocumento() {
    return documento;
}
public void setDocumento(String documento) {
    this.documento = documento;
}
public String getTipodocumento() {
    return tipodocumento;
}
public void setTipodocumento(String tipodocumento) {
    this.tipodocumento = tipodocumento;
}
public String getCodigociudad() {
    return codigociudad;
}
public void setCodigociudad(String codigociudad) {
    this.codigociudad = codigociudad;
}
public String getPrimernombre() {
    return primernombre;
}
public void setPrimernombre(String primernombre) {
    this.primernombre = primernombre;
}
public String getSegundonombre() {
    return segundonombre;
}
public void setSegundonombre(String segundonombre) {
    this.segundonombre = segundonombre;
}
public String getPrimerapellido() {
    return primerapellido;
}
public void setPrimerapellido(String primerapellido) {
    this.primerapellido = primerapellido;
}
public String getSegundoapellido() {
    return segundoapellido;
}
public void setSegundoapellido(String segundoapellido) {
    this.segundoapellido = segundoapellido;
}
public String getEmail() {
    return email;
}
public void setEmail(String email) {
    this.email = email;
}
public String getNumtelefono() {
    return numtelefono;
}
public void setNumtelefono(String numtelefono) {
    this.numtelefono = numtelefono;
}
public String getDireccion() {
    return direccion;
}
public void setDireccion(String direccion) {
    this.direccion = direccion;
}
public String getPass() {
    return pass;
}
public void setPass(String pass) {
    this.pass = pass;
}
public String getGenero() {
    return genero;
}
public void setGenero(String genero) {
    this.genero = genero;
}
public String getFechanacimiento() {
    return fechanacimiento;
}
public void setFechanacimiento(String fechanacimiento) {
    this.fechanacimiento = fechanacimiento;
}

}
