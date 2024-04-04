package com.example.Repositorios;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.example.ConnectionPool.Conexion;

public class DirectorRepository {
static private DirectorRepository repositorio;

    DirectorRepository(){

    }
    public static DirectorRepository getRepositorio(){
        if(repositorio==null){
            repositorio=new DirectorRepository();
            return repositorio;
        }
        return repositorio;
    }
   

    public ResultSet consultarRepresentantesregion(Conexion solicitante){
        System.out.println(solicitante.user);
    try {
        String sql = "select representante.k_cod_representante,representante.n_primer_nombre,representante.n_segundo_nombre,representante.n_primer_apellido,representante.n_segundo_Apellido,representante.O_EMAIL,representante.I_GENERO,representante.F_Nacimiento,representante.F_contrato,representante.Q_NUM_TELEFONO,representante.O_Direccion,representante.K_COD_REP_SUP,representante.K_COD_CLASIFICACION,representante.K_COD_REGION" 
        +" from natame.representante, natame.region "
        +" where natame.representante.k_cod_region=natame.region.k_cod_region and natame.representante.k_cod_rep_sup=?";
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
