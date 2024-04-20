package com.example.Utils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ITEM {
private String _codigoProducto;
private String _catProducto;
private String _region;
private int _cantidad;
@JsonCreator
public ITEM(String _codigoProducto, int _cantidad,String _catProducto,String _region) {
    this._codigoProducto = _codigoProducto;
    this._cantidad = _cantidad;
}
public String get_catProducto() {
    return _catProducto;
}
public String get_region() {
    return _region;
}
public void set_region(String _region) {
    this._region = _region;
}
public void set_catProducto(String _catProducto) {
    this._catProducto = _catProducto;
}

public String get_codigoProducto() {
    return _codigoProducto;
}

public void set_codigoProducto(String _codigoProducto) {
    this._codigoProducto = _codigoProducto;
}

public int get_cantidad() {
    return _cantidad;
}
public void set_cantidad(int _cantidad) {
    this._cantidad = _cantidad;
}

}
