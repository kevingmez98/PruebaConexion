package com.example.demo;
import com.example.ConnectionPool.Conexion;
import com.example.ConnectionPool.Pool;
import com.example.Repositorios.ClienteRepository;
import com.example.Utils.JsonManager;

import org.javatuples.*;
import org.json.JSONObject;
public class LoginService {
    public LoginService(){

    }
    public Triplet<Boolean,String,String> autenticar(String user, String pass){
        Conexion Resultado =Pool.getPool().createConnection(user, pass);
        Triplet<Boolean,String,String> confirmacion=new Triplet<Boolean,String,String>(Resultado.successful,Resultado.message,Resultado.serial);
        return confirmacion;
        
    }
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
