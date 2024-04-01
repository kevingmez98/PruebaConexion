package com.example.userServices;

import org.javatuples.Pair;
import org.json.JSONObject;
import org.json.JSONArray;

import com.example.ConnectionPool.Conexion;
import com.example.ConnectionPool.Pool;
import com.example.Repositorios.RepresentanteRepository;
import com.example.Utils.JsonManager;

public class RepresentanteService {
    public Pair<JSONObject,Conexion> getClientesrepresentante(String serial){
        Conexion solicitante=Pool.getPool().getConexionbyserial(serial);
        RepresentanteRepository.getRepositorio().consultarClientesporRepresentante(solicitante);
        try{
        JSONObject resultado=JsonManager.convert(RepresentanteRepository.getRepositorio().consultarClientesporRepresentante(solicitante),solicitante);
        return new Pair<JSONObject,Conexion>(resultado,solicitante);
        }catch(Exception e){
            System.out.println("Error en representante service");
        }
        return new Pair<JSONObject,Conexion>(null,solicitante);
    }

}
