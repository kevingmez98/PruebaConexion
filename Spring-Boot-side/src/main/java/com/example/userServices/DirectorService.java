package com.example.userServices;

import org.javatuples.Pair;
import org.json.JSONObject;
import org.json.JSONArray;

import com.example.ConnectionPool.Conexion;
import com.example.ConnectionPool.Pool;
import com.example.DAO.DAO;
import com.example.Utils.JsonManager;

public class DirectorService {
    public Pair<JSONObject,Conexion> getRepresentantesacargo(String serial){
        Conexion solicitante=Pool.getPool().getConexionbyserial(serial);
        
        try{
        JSONObject resultado=JsonManager.convert(DAO.getRepositorio().consultarRepresentantesregion(solicitante),solicitante);
        return new Pair<JSONObject,Conexion>(resultado,solicitante);
        }catch(Exception e){
            System.out.println("Error en representante service");
        }
        return new Pair<JSONObject,Conexion>(null,solicitante);
    }
}
