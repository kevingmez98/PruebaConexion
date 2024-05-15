package com.example.Utils;

import com.fasterxml.jackson.annotation.JsonCreator;

public class PAGOPOJO {
private String codPedido;
private String Serial;
private String metodoP;
private Long valor;

@JsonCreator
public PAGOPOJO(String codPedido, String serial, String metodoP, Long valor) {
    this.codPedido = codPedido;
    Serial = serial;
    this.metodoP = metodoP;
    this.valor = valor;
}
public String getCodPedido() {
    return codPedido;
}
public void setCodPedido(String codPedido) {
    this.codPedido = codPedido;
}
public String getSerial() {
    return Serial;
}
public void setSerial(String serial) {
    Serial = serial;
}
public String getMetodoP() {
    return metodoP;
}
public void setMetodoP(String metodoP) {
    this.metodoP = metodoP;
}
public long getValor() {
    return valor;
}
public void setValor(long valor) {
    this.valor = valor;
}





}
