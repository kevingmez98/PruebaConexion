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

public ResultSet ConsultarProductosRegion(Conexion solicitante,String region, String categoria, String subcategoria){
    System.out.println(solicitante.user);
    System.out.println(region); 
    System.out.println(categoria);
    System.out.println(subcategoria);
try {
    int parametros=0;
    String sql = "select P.N_NOM_PRODUCTO, V.K_COD_PRODUCTO,V.I_ID_CAT_PRODUCTO,C.I_ID_CAT_PRO_SUP,Q_PRECIO_UNITARIO,Q_CANTIDAD_EN_STOCK "
    +"FROM NATAME.PRODUCTO P,NATAME.INVENTARIO V, NATAME.CAT_PRODUCTO C WHERE V.K_COD_REGION=?" 
    +"AND P.K_COD_PRODUCTO = V.K_COD_PRODUCTO AND P.I_ID_CAT_PRODUCTO=C.I_ID_CAT_PRODUCTO ";
    String sqlcategoria= "AND C.I_ID_CAT_PRO_SUP=?";
    String sqlsubcategoria= "AND V.I_ID_CAT_PRODUCTO=?";
    if(region!=null){
        parametros++;
    }
    if(categoria!=null){
        parametros++;
        sql=sql+sqlcategoria;
    }
    if(subcategoria!=null){
        parametros++;
        sql=sql+sqlsubcategoria;
    }
    PreparedStatement stmt= solicitante.getConexion().prepareStatement(sql);
    if(region!=null){
        stmt.setString(1,region.toUpperCase());
    }
    if(categoria!=null){
        stmt.setString(2,categoria.toUpperCase());
    }
    if(subcategoria!=null){
        stmt.setString(3,subcategoria.toUpperCase());
    }
    ResultSet rs=stmt.executeQuery();
    
    return rs;
    
} catch (Exception e) {
    System.out.println("Fallo la recuperacion del serial de conexion");
    System.out.println(e.getMessage());
    solicitante.message=e.getMessage();
}
return null;
}






}
