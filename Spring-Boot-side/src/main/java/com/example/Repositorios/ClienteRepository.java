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
    String sql = "select representante.n_primer_nombre, representante.n_primer_apellido from system.representante, system.cliente where system.cliente.k_cod_rep_intro=system.representante.k_cod_representante and system.cliente.k_doc_cliente=?";
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
