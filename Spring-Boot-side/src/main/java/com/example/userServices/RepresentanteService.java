package com.example.userServices;

import org.javatuples.Pair;
import org.json.JSONObject;
import org.json.JSONArray;

import com.example.ConnectionPool.Conexion;
import com.example.ConnectionPool.Pool;
import com.example.Repositorios.ClienteRepository;
import com.example.Repositorios.RepresentanteRepository;
import com.example.Utils.CLIENTEPOJO;
import com.example.Utils.JsonManager;

/*Clase que representa el servicio del representante con todas las funcionalidades que un representante puede realizar
 * en la aplicacion
 */
public class RepresentanteService {
    public Pair<JSONObject,Conexion> getClientesrepresentante(String serial){
        Conexion solicitante=Pool.getPool().getConexionbyserial(serial);
        
        try{
        JSONObject resultado=JsonManager.convert(RepresentanteRepository.getRepositorio().consultarClientesporRepresentante(solicitante),solicitante);
        return new Pair<JSONObject,Conexion>(resultado,solicitante);
        }catch(Exception e){
            System.out.println("Error en representante service");
        }
        return new Pair<JSONObject,Conexion>(null,solicitante);
    }
    public Pair<JSONObject,Conexion> getciudades(String serial){
        Conexion solicitante=Pool.getPool().getConexionbyserial(serial);
        try{
        JSONObject resultado=JsonManager.convert(RepresentanteRepository.getRepositorio().RecuperarCiudades(solicitante),solicitante);
        return new Pair<JSONObject,Conexion>(resultado,solicitante);
        }catch(Exception e){
            System.out.println("Error en representante service");
        }
        return new Pair<JSONObject,Conexion>(null,solicitante);
    }

    public String crearCliente(CLIENTEPOJO cliente){
        Conexion solicitante=Pool.getPool().getConexionbyserial(cliente.getSerial());
        ClienteRepository.getRepositorio().crearCliente(solicitante,cliente);
        return solicitante.message;
    }
    public String cambiarRepresentante(String serial){
        Conexion solicitante=Pool.getPool().getConexionbyserial(serial);
        
        String resultado= RepresentanteRepository.getRepositorio().cambiarRepresentante(solicitante);
        return resultado;
    }

    public JSONObject verEstadisticas(String serial){
        Conexion solicitante=Pool.getPool().getConexionbyserial(serial);
        JSONObject resultado=new JSONObject();
        resultado.put("message", RepresentanteRepository.getRepositorio().verEstadisticas(solicitante));
        return resultado;
    }

    
    
    
}
