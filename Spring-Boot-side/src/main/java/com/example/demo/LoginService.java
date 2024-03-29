package com.example.demo;
import com.example.ConnectionPool.Conexion;
import com.example.ConnectionPool.Pool;
import org.javatuples.*;
public class LoginService {
    public LoginService(){

    }
    public Triplet<Boolean,String,String> autenticar(String user, String pass){
        Conexion Resultado =Pool.getPool().createConnection(user, pass);
        Triplet<Boolean,String,String> confirmacion=new Triplet<Boolean,String,String>(Resultado.successful,Resultado.message,Resultado.Role);
        return confirmacion;
        
    }
}
