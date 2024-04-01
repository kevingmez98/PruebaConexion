package com.example.DAO;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.example.ConnectionPool.Conexion;

public class DAO {
static private DAO repositorio;

    DAO(){

    }
    public static DAO getRepositorio(){
        if(repositorio==null){
            repositorio=new DAO();
            return repositorio;
        }
        return repositorio;
    }
    public ResultSet consultarClientesporRepresentante(Conexion solicitante){
            System.out.println(solicitante.user);
        try {
            String sql = "select K_COD_REP_INTRO  ,N_PRIMER_NOMBRE,O_EMAIL,Q_NUM_TELEFONO FROM SGA.CLIENTE where K_COD_REP_INTRO=?";
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

    public ResultSet consultarRepresentantesregion(Conexion solicitante){
        System.out.println(solicitante.user);
    try {
        String sql = "select representante.k_cod_representante,representante.n_primer_nombre,representante.n_segundo_nombre,representante.n_primer_apellido,representante.n_segundo_Apellido,representante.O_EMAIL,representante.I_GENERO,representante.F_Nacimiento,representante.F_contrato,representante.Q_NUM_TELEFONO,representante.O_Direccion,representante.K_COD_REP_SUP,representante.K_COD_CLASIFICACION,representante.K_COD_REGION from sga.representante, sga.region  where sga.representante.k_cod_region=sga.region.k_cod_region and sga.region.k_rep_encargado=?";
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
public ResultSet ConsultarRepresentanteAsignado(Conexion solicitante){
    System.out.println(solicitante.user);
try {
    String sql = "select representante.n_primer_nombre, representante.n_primer_apellido from sga.representante, sga.cliente where sga.cliente.k_cod_rep_intro=sga.representante.k_cod_representante and sga.cliente.k_doc_cliente=?";
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
