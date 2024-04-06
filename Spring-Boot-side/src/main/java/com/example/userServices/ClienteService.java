package com.example.userServices;

import java.sql.ResultSet;

import org.javatuples.Pair;
import org.json.JSONObject;

import com.example.ConnectionPool.Conexion;
import com.example.ConnectionPool.Pool;
import com.example.Repositorios.ClienteRepository;
import com.example.Utils.JsonManager;

public class ClienteService {
    public Pair<JSONObject,Conexion> getrepresentanteasignado(String serial){
        Conexion solicitante=Pool.getPool().getConexionbyserial(serial);
         JSONObject resultado =new JSONObject();
        try{ 
             resultado=JsonManager.convert(ClienteRepository.getRepositorio().ConsultarRepresentanteAsignado(solicitante),solicitante);
        return new Pair<JSONObject,Conexion>(resultado,solicitante);
    }catch(Exception e){
        System.out.println("Error en cliente service");
    }
        return new Pair<JSONObject,Conexion>(null,solicitante);
    }

    public Pair<JSONObject,Conexion> getProductosRegion(String serial){
        Conexion solicitante=Pool.getPool().getConexionbyserial(serial);
         JSONObject resultado =new JSONObject();
        try{ 
             resultado=JsonManager.convert(ClienteRepository.getRepositorio().ConsultarProductosRegion(solicitante),solicitante);
        return new Pair<JSONObject,Conexion>(resultado,solicitante);
    }catch(Exception e){
        System.out.println("Error en cliente service");
    }
        return new Pair<JSONObject,Conexion>(null,solicitante);
    }

}
