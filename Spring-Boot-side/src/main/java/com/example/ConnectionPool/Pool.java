package com.example.ConnectionPool;

import java.sql.ResultSet;
import java.util.ArrayList;

public class Pool {
static Pool  pool= null;

static ArrayList<String> regiones=new ArrayList<String>();
static ArrayList<Conexion> ConexionesActivas = new ArrayList<Conexion>();
private static Conexion system=new Conexion("adminsession","session123");
public Pool(){
 
}

public static Pool getPool(){
    if(pool!=null){
        
        return pool;
     }
     pool =new Pool();
     Pool.getPool().getRegiones();
     return pool;
}
public Conexion createConnection(String user, String pass){
    for(Conexion e : ConexionesActivas){
        if(e.user==user && e.pass==pass){
            return e;
        }
    }
    Conexion nuevaConexion=new Conexion(user,pass);
    nuevaConexion.conectar();
    if(nuevaConexion.successful==true){
        system.conectar(); 
        nuevaConexion.serial=system.getConnectionSerial(user);
        ConexionesActivas.add(nuevaConexion);
    }
    return nuevaConexion;
}
public Conexion getConexionbyserial(String serial){
    for(Conexion e : ConexionesActivas){
        System.out.println(e.serial + " "+serial);
        if(e.serial.equals(serial)){
            e.message="";
            System.out.println("se encontro la conexion solicitada");
            return e;
        }
    }
    Conexion error=new Conexion();
    error.message="No existe conexion con el serial suministrado";
    return error;
}
public ArrayList<String> getRegiones() {
    if(regiones.isEmpty()){
        Conexion natame= pool.getPool().createConnection("NATAME","natame");
       ResultSet rs= natame.ConsultarRegiones(natame);
       int i=0;
       try{
       while(rs.next()){

        regiones.add(rs.getString("K_COD_REGION"));
        System.out.println(regiones.get(i));
        i++;
       }
        }catch(Exception e){
            
        }
    }
    return regiones;
}

public static void setRegiones(ArrayList<String> regiones) {
    Pool.regiones = regiones;
}







}