package com.example.Repositorios;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.example.ConnectionPool.Conexion;

public class DirectorRepository {
static private DirectorRepository repositorio;

    DirectorRepository(){

    }
    /*
     * Implementacion del patron singleton para el repositorio del director

     */
    public static DirectorRepository getRepositorio(){
        if(repositorio==null){
            repositorio=new DirectorRepository();
            return repositorio;
        }
        return repositorio;
    }
   
    /*
     * Consulta de todos los representantes en la region del usuario logeado
     * PARAMETROS DE ENTRADA: Conexion solicitante
     * PARAMETROS DE SALIDA; ResultSet rs
     */
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

public String volarcorea(Conexion solicitante, String regionogeneral){

    try{
        //Se llama al procedimiento almacenado
    }catch(Exception e){
        return "Corea fue mas fuerte";
    }
return "Corea more like Cursed diarrea";
}


}
