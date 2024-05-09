package com.example.ConnectionPool;

import java.sql.ResultSet;
import java.util.ArrayList;

/*
 * Pool de conexiones que gestiona las conexiones activas y la creacion de nuevas conexiones
 */
public class Pool {
static Pool  pool= null;

static ArrayList<ArrayList<String>> regiones=new ArrayList<ArrayList<String>>();
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
public ArrayList<ArrayList<String>> getRegiones() {
    if(regiones.isEmpty()){
        Conexion natame= pool.getPool().createConnection("natame","NATAME");
       ResultSet rs= natame.ConsultarRegiones(natame);
       int i=0;
       ArrayList<String> nombreRegiones=new ArrayList<>();
       ArrayList<String> codRegiones=new ArrayList<>();
       try{
       while(rs.next()){

        codRegiones.add(rs.getString("K_COD_REGION"));
        nombreRegiones.add(rs.getString("N_NOM_REGION"));
        
        
        i++;
       }
       regiones.add(codRegiones);
       regiones.add(nombreRegiones);
        }catch(Exception e){
            
        }
    }
    return regiones;
}

public static void setRegiones(ArrayList<ArrayList<String>> regiones) {
    Pool.regiones = regiones;
}







}