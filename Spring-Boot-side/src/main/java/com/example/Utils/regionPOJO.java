package com.example.Utils;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;

public class regionPOJO {
private List<String> codRegiones;
private List<String> nomRegiones;

@JsonCreator
public regionPOJO(ArrayList<String> codRegiones, ArrayList<String> nomRegiones) {
    this.codRegiones =codRegiones;
    this.nomRegiones=nomRegiones;

}

public List<String> getCodRegiones() {
    return codRegiones;
}
public void setCodRegiones(List<String> codRegiones) {
    this.codRegiones = codRegiones;
}
public List<String> getNomRegiones() {
    return nomRegiones;
}
public void setNomRegiones(List<String> nomRegiones) {
    this.nomRegiones = nomRegiones;
}




}
