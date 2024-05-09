package com.example.Utils;
import com.example.Utils.SerialPOJO;
import com.fasterxml.jackson.annotation.JsonCreator;

public class CALIFICACIONPOJO {
   private  String idpedido;
   private  int calificacion;
   private  String serial;
   
public String getIdpedido() {
    return idpedido;
}

public void setIdpedido(String idpedido) {
    this.idpedido = idpedido;
}

public int getCalificacion() {
    return calificacion;
}

public void setCalificacion(int calificacion) {
    this.calificacion = calificacion;
}

public String getSerial() {
    return serial;
}

public void setSerial(String serial) {
    this.serial = serial;
}
@JsonCreator
public CALIFICACIONPOJO(String idpedido, int calificacion, String serial) {
    this.idpedido = idpedido;
    this.calificacion = calificacion;
    this.serial = serial;
}


}
