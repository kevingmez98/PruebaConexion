package com.example.userServices;

import java.sql.ResultSet;
import java.util.ArrayList;

import org.javatuples.Pair;
import org.json.JSONArray;
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

    public Pair<JSONObject,Conexion> getCategorias(String serial){
        Conexion solicitante=Pool.getPool().getConexionbyserial(serial);
         JSONObject resultado =new JSONObject();
        try{ 
             resultado=JsonManager.convert(ClienteRepository.getRepositorio().ConsultarCategorias(solicitante),solicitante);
        return new Pair<JSONObject,Conexion>(resultado,solicitante);
    }catch(Exception e){
        System.out.println("Error en cliente service");
    }
        return new Pair<JSONObject,Conexion>(null,solicitante);
    }

    public Pair<JSONObject,Conexion> getProductosRegion(String region ,String serial, String categoria, String subcategoria){
        Conexion solicitante=Pool.getPool().getConexionbyserial(serial);
         JSONObject resultado =new JSONObject();
        try{ 
             resultado=JsonManager.convert(ClienteRepository.getRepositorio().ConsultarProductosRegion(solicitante,region,categoria,subcategoria),solicitante);
        return new Pair<JSONObject,Conexion>(resultado,solicitante);
    }catch(Exception e){
        System.out.println("Error en cliente service");
    }
        return new Pair<JSONObject,Conexion>(null,solicitante);
    }

    public JSONArray ObtenerRegiones(){
        JSONArray Regiones=new JSONArray(Pool.getPool().getRegiones());
        System.out.println(Regiones.toString());
        return Regiones;
    }

}
