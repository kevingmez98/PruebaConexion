package com.example.ConnectionPool;

import java.util.ArrayList;

public class Pool {
static Pool  pool= null;
static ArrayList<Conexion> ConexionesActivas = new ArrayList<Conexion>();
private static Conexion System=new Conexion("system","huesos2011");
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
        System.conectar();
        nuevaConexion.Role=System.getRole(user);
        ConexionesActivas.add(nuevaConexion);
    }
    return nuevaConexion;


}









}