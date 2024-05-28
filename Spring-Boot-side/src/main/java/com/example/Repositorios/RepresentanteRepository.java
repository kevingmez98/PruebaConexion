package com.example.Repositorios;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.example.ConnectionPool.Conexion;

public class RepresentanteRepository {
static private RepresentanteRepository repositorio;

    RepresentanteRepository(){

    }
    /*
     * Implementacion del patron singleton para el repositorio del representante
     */
    public static RepresentanteRepository getRepositorio(){
        if(repositorio==null){
            repositorio=new RepresentanteRepository();
            return repositorio;
        }
        return repositorio;
    }
    
    /*
     * Consulta de los clientes del representante logeado
     * PARAMETROS DE ENTRADA: Conexion solicitante
     * PARAMETROS DE SALIDA:ResultSet rs.
     */
    public ResultSet consultarClientesporRepresentante(Conexion solicitante){
        System.out.println(solicitante.user);
    try {
        String sql = "select C.K_DOC_CLIENTE, C.I_TIPO_DOC, C.N_PRIMER_NOMBRE,C.N_SEGUNDO_NOMBRE,C.N_PRIMER_APELLIDO,C.N_SEGUNDO_APELLIDO,C.O_EMAIL,C.Q_NUM_TELEFONO,C.O_DIRECCION from  S_CLIENTE c, S_CONTRATO cn where cn.K_COD_REPRESENTANTE=? and cn.F_termino is null " 
        + "and cn.K_DOC_CLIENTE=c.K_DOC_CLIENTE and cn.I_TIPO_DOC=c.I_TIPO_DOC";
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

/*
 *  Consulta de las ciudades de la region del representante logeado
 * PARAMETROS DE ENTRADA: Conexion solicitante,
 * PARAMETROS DE SALIDA: ResultSet rs;
 */
public ResultSet RecuperarCiudades(Conexion solicitante){
    System.out.println(solicitante.user);
try {
    String sql = "select C.N_NOM_CIUDAD,C.K_COD_CIUDAD from S_CIUDAD c,S_REPRESENTANTE r where r.K_COD_REPRESENTANTE=? and r.K_COD_REGION=c.K_COD_REGION";
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

public String cambiarRepresentante(Conexion solicitante){
    try{
        //Llamar al procedimiento almacenado

        
    }catch(Exception e){
        return "Sorry socio";
    }
    return "Se ha cambiado el representante con exito";
}

public String verEstadisticas(Conexion solicitante){
    try{
        //Llamar al procedimiento almacenado para ver las estadisticas de un solo representante

        
    }catch(Exception e){
        return "Sorry socio";
    }
    return "Se ha cambiado el representante con exito";
}


}
