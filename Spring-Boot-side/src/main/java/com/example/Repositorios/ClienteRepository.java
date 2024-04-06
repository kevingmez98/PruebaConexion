package com.example.Repositorios;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.example.ConnectionPool.Conexion;

public class ClienteRepository {
static private ClienteRepository repositorio;

    ClienteRepository(){

    }
    public static ClienteRepository getRepositorio(){
        if(repositorio==null){
            repositorio=new ClienteRepository();
            return repositorio;
        }
        return repositorio;
    }

    
public ResultSet ConsultarRepresentanteAsignado(Conexion solicitante){
    System.out.println(solicitante.user);
try {
    String sql = "SELECT rc.n_primer_nombre, rc.n_primer_apellido"+
                  " FROM natame.rep_cliente rc, natame.cliente c"+
                  " WHERE c.k_cod_rep_intro = rc.k_cod_representante"+ 
                  " AND c.n_username = ?";
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

public ResultSet ConsultarProductosRegion(Conexion solicitante){
    System.out.println(solicitante.user);
try {
    String sql = "SELECT RC.K_COD_REGION FROM NATAME.CLIENTE RC WHERE RC.N_USERNAME=?";
    PreparedStatement stmt = solicitante.getConexion().prepareStatement(sql);
    stmt.setString(1,solicitante.user.toUpperCase());
    
    ResultSet rs = stmt.executeQuery();
    rs.next();
    String regionCliente=rs.getString("K_COD_REGION");
    System.out.println("Region: "+regionCliente);
    
    sql = "select P.N_NOM_PRODUCTO, V.K_COD_PRODUCTO,V.I_ID_CAT_PRODUCTO,Q_PRECIO_UNITARIO,Q_CANTIDAD_EN_STOCK FROM NATAME.PRODUCTO P,NATAME.INVENTARIO V WHERE V.K_COD_REGION=?";
    stmt= solicitante.getConexion().prepareStatement(sql);
    stmt.setString(1,regionCliente);
    rs=stmt.executeQuery();
    
    return rs;
    
} catch (Exception e) {
    System.out.println("Fallo la recuperacion del serial de conexion");
    System.out.println(e.getMessage());
    solicitante.message=e.getMessage();
}
return null;
}






}
