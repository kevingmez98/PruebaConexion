package com.example.userServices;

import java.sql.ResultSet;

import org.javatuples.Pair;
import org.json.JSONObject;
import org.json.JSONArray;

import com.example.ConnectionPool.Conexion;
import com.example.ConnectionPool.Pool;
import com.example.DAO.DAO;
import com.example.Utils.JsonManager;

public class ClienteService {
    public Pair<JSONObject,Conexion> getrepresentanteasignado(String serial){
        Conexion solicitante=Pool.getPool().getConexionbyserial(serial);
        ResultSet rs=DAO.getRepositorio().ConsultarRepresentanteAsignado(solicitante);
         JSONObject representante =new JSONObject();
        try{ 
            
        if(rs.next()){
            representante.put("Pnombre",rs.getString("N_PRIMER_NOMBRE"));
            representante.put("Apellido",rs.getString("N_PRIMER_APELLIDO"));
            
        }
        return new Pair<JSONObject,Conexion>(representante,solicitante);
    }catch(Exception e){
        System.out.println("Error en cliente service");
    }
        return new Pair<JSONObject,Conexion>(null,solicitante);
    }

}
