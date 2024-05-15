package com.example.demo;
import com.example.ConnectionPool.Conexion;
import com.example.ConnectionPool.Pool;
import com.example.Repositorios.ClienteRepository;
import com.example.Utils.JsonManager;

import org.javatuples.*;
import org.json.JSONObject;
//Clase que funciona como mediador entre la capa de acceso a datos y la capa de negocio para el proceso de autenticacion.
public class LoginService {
    public LoginService(){

    }
    /*Metodo que recibe las credenciales del usuario y las envia al pool de conexiones
     * Parametros de entrada: String User,
     *                        String pass.
     * Parametros de salida:  TRIPLET<Boolean,String,String> confirmacion
     */
    public Triplet<Boolean,String,String> autenticar(String user, String pass){
        Conexion Resultado =Pool.getPool().createConnection(user, pass);
        Triplet<Boolean,String,String> confirmacion=new Triplet<Boolean,String,String>(Resultado.successful,Resultado.message,Resultado.serial);
        return confirmacion;
        
    }
    /*Metodo que retorna los datos basicos del usuario logeado
     * Parametros de entrada: String Serial,
     *                    
     * Parametros de salida:  Pair<JSONObject,Conexion> (Un objeto PAIR con el wrapper de conexion y los datos basicos del usuario en formato JSON)
     */
    public Pair<JSONObject,Conexion> getdatosbasicos(String serial){
        Conexion solicitante=Pool.getPool().getConexionbyserial(serial);
         JSONObject resultado =new JSONObject();
        try{ 
             resultado=JsonManager.convert(ClienteRepository.getRepositorio().getdatosbasicos(solicitante),solicitante);
        return new Pair<JSONObject,Conexion>(resultado,solicitante);
    }catch(Exception e){
        System.out.println("Error en cliente service");
    }
        return new Pair<JSONObject,Conexion>(null,solicitante);
    }
}
