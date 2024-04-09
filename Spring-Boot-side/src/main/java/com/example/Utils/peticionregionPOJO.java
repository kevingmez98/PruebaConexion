package com.example.Utils;

import com.fasterxml.jackson.annotation.JsonCreator;

public class peticionregionPOJO {
private String Serial;
private String Region;
private String Categoria;
private String Subcategoria;
@JsonCreator 
public peticionregionPOJO(String serial, String region, String categoria, String subcategoria) {
    Serial = serial;
    Region = region;
    Categoria = categoria;
    Subcategoria = subcategoria;
}
public String getSerial() {
    return Serial;
}
public void setSerial(String serial) {
    Serial = serial;
}
public String getRegion() {
    return Region;
}
public void setRegion(String region) {
    Region = region;
}
public String getCategoria() {
    return Categoria;
}
public void setCategoria(String categoria) {
    Categoria = categoria;
}
public String getSubcategoria() {
    return Subcategoria;
}
public void setSubcategoria(String subcategoria) {
    Subcategoria = subcategoria;
}
}
