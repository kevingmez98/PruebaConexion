package com.example.ConnectionPool;

import java.util.ArrayList;

public class Pool {
static Pool  pool= null;
static ArrayList<Conexion> ConexionesActivas = new ArrayList<Conexion>();
private static Conexion system=new Conexion("adminsession","session123");
public Pool(){
 
}

public static Pool getPool(){
    if(pool!=null){
        return pool;
     }
     pool =new Pool();
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








}