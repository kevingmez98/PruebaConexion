package com.example.Repositorios;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.example.ConnectionPool.Conexion;

public class RepresentanteRepository {
static private RepresentanteRepository repositorio;

    RepresentanteRepository(){

    }
    public static RepresentanteRepository getRepositorio(){
        if(repositorio==null){
            repositorio=new RepresentanteRepository();
            return repositorio;
        }
        return repositorio;
    }
    
    
    public ResultSet consultarClientesporRepresentante(Conexion solicitante){
        System.out.println(solicitante.user);
    try {
        String sql = "select K_COD_REP_INTRO  ,N_PRIMER_NOMBRE,O_EMAIL,Q_NUM_TELEFONO FROM system.CLIENTE where K_COD_REP_INTRO=?";
        PreparedStatement stmt = solicitante.getConexion().prepareStatement(sql);
       stmt.setString(1,solicitante.user.toUpperCase());
       
        
        ResultSet rs = stmt.executeQuery();
        
        return rs;
        
    } catch (Exception e) {
        System.out.println("Fallo la recuperacion del serial de conexion");
        System.out.println(e.getMessage());
        solicitante.message=e.getMessage();
    }
    return null;
}

}
