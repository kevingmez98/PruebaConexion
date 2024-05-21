package com.example.userServices;

import org.javatuples.Pair;
import org.json.JSONObject;

import com.example.ConnectionPool.Conexion;
import com.example.ConnectionPool.Pool;
import com.example.Repositorios.DirectorRepository;
import com.example.Utils.JsonManager;

/*
 * Clase que implementa todas las funcionalidades que un director puede realizar dentro de la aplicacion
 */
public class DirectorService {
    public Pair<JSONObject,Conexion> getRepresentantesacargo(String serial){
        Conexion solicitante=Pool.getPool().getConexionbyserial(serial);
        
        try{
        JSONObject resultado=JsonManager.convert(DirectorRepository.getRepositorio().consultarRepresentantesregion(solicitante),solicitante);
        return new Pair<JSONObject,Conexion>(resultado,solicitante);
        }catch(Exception e){
            System.out.println("Error en representante service");
        }
        return new Pair<JSONObject,Conexion>(null,solicitante);
    }
    public JSONObject reclasificar(String serial, String regionogeneral){
        Conexion solicitante=Pool.getPool().getConexionbyserial(serial);
        JSONObject respuesta=new JSONObject();
        respuesta.put("message",DirectorRepository.getRepositorio().volarcorea(solicitante,regionogeneral));
        return respuesta;
        


    }
}
