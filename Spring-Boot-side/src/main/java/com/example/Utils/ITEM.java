package com.example.Utils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ITEM {
private String _codigoProducto;
private String _catProducto;
private int _cantidad;
@JsonCreator
public ITEM(String _codigoProducto, int _cantidad) {
    this._codigoProducto = _codigoProducto;
    this._cantidad = _cantidad;
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
