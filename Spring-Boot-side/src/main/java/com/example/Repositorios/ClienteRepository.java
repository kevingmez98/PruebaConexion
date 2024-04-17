package com.example.Repositorios;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

import com.example.ConnectionPool.Conexion;
import com.example.Utils.CLIENTEPOJO;
import com.example.Utils.PEDIDOPOJO;

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
    String sql= "SELECT C.K_DOC_CLIENTE from natame.cliente C where  C.n_username='"+solicitante.user+"'";
    PreparedStatement stmt=solicitante.getConexion().prepareStatement(sql);
    ResultSet rs=stmt.executeQuery();
    rs.next();
    String documentocliente=rs.getString("K_DOC_CLIENTE");
    System.out.println(documentocliente);
    sql = "SELECT rc.n_primer_nombre, rc.n_primer_apellido FROM natame.contrato c, natame.representante rc where C.K_DOC_CLIENTE=? AND RC.K_COD_REPRESENTANTE=C.K_COD_REPRESENTANTE AND C.F_TERMINO is null";
    stmt = solicitante.getConexion().prepareStatement(sql);
    stmt.setString(1,documentocliente);
   
    
     rs = stmt.executeQuery();
        
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
    String sql = "select P.N_NOM_PRODUCTO, V.K_COD_PRODUCTO,V.I_ID_CAT_PRODUCTO,C.I_ID_CAT_PRO_SUP,V.Q_PRECIO_UNITARIO,V.Q_CANTIDAD_EN_STOCK "
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

public ResultSet ConsultarCategorias(Conexion solicitante){
try {
    int parametros=0;
    String sql = "select C.I_ID_CAT_PRODUCTO, C.I_ID_CAT_PRO_SUP, C.N_NOM_CAT_PRODUCTO from natame.CAT_PRODUCTO c" ;
    
    PreparedStatement stmt=solicitante.getConexion().prepareStatement(sql);

    ResultSet rs=stmt.executeQuery();
    
    return rs;
    
} catch (Exception e) {
    System.out.println("Fallo la recuperacion del serial de conexion");
    System.out.println(e.getMessage());
    solicitante.message=e.getMessage();
}
return null;
}
public ResultSet getdatosbasicos(Conexion solicitante){
    System.out.println(solicitante.user);
try {
    String sql= "SELECT R.K_COD_REGION,R.N_PRIMER_NOMBRE,R.N_PRIMER_APELLIDO,R.O_EMAIL from natame.representante R WHERE K_COD_REPRESENTANTE=?";
    PreparedStatement stmt=solicitante.getConexion().prepareStatement(sql);
    stmt.setString(1,solicitante.user.toUpperCase());
    ResultSet rs=stmt.executeQuery();
    if(rs.next()){
       rs= stmt.executeQuery();
       
        return rs;
    }
    sql= "SELECT C.K_COD_CIUDAD,C.N_PRIMER_NOMBRE,C.N_PRIMER_APELLIDO,C.O_EMAIL FROM NATAME.CLIENTE C WHERE C.N_USERNAME=?";
    stmt=solicitante.getConexion().prepareStatement(sql);
    stmt.setString(1,solicitante.user.toUpperCase());
    rs=stmt.executeQuery();
    
        
    return rs;
    
} catch (Exception e) {
    System.out.println("Fallo la recuperacion de los datos basicos");
    System.out.println(e.getMessage());
    solicitante.message=e.getMessage();
}
return null;
}
//Insert para crear el cliente nuevo
public void crearCliente(Conexion solicitante,CLIENTEPOJO cliente){
    
    try{
        String sql="INSERT INTO NATAME.CLIENTE VALUES(?,?,?,?,?,?,?,?,?,?,?)";
        PreparedStatement stmt=solicitante.getConexion().prepareStatement(sql);
        stmt.setString(1, cliente.getUsuario());
        stmt.setString(2, cliente.getDocumento());
        stmt.setString(3, cliente.getTipodocumento());
        stmt.setString(4, cliente.getCodigociudad());
        stmt.setString(5, cliente.getPrimernombre());
        if(cliente.getSegundonombre()!=null){
            stmt.setString(6, cliente.getSegundonombre());
        }else{
            stmt.setNull(6, Types.VARCHAR);
        }
        stmt.setString(7, cliente.getPrimerapellido());
        stmt.setString(8, cliente.getSegundoapellido());
        stmt.setString(9, cliente.getEmail());
        stmt.setString(10, cliente.getNumtelefono());
        stmt.setString(11, cliente.getDireccion());
        stmt.executeUpdate();
        
        sql="INSERT INTO natame.CONTRATO values('1',?,?,?,?,?)";
        stmt=solicitante.getConexion().prepareStatement(sql);
        stmt.setString(1,solicitante.user.toUpperCase());
        stmt.setString(2,cliente.getDocumento());
        stmt.setString(3,cliente.getTipodocumento());
        //Fecha actual
        LocalDate now = LocalDate.now();
		LocalDateTime startOfDay = now.atStartOfDay();
		java.util.Date hola=java.util.Date.from(startOfDay.atZone(ZoneId.systemDefault()).toInstant());
		Date today = new Date(hola.getTime());
        stmt.setDate(4,today);
        stmt.setNull(5,Types.DATE);
        stmt.executeUpdate();
        solicitante.getConexion().commit();
        solicitante.message="Cliente creado con exito";
        stmt.close();
    }catch(Exception e){
        e.printStackTrace();
        try {
            solicitante.getConexion().rollback();
        } catch (SQLException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        solicitante.message=e.getMessage();
    }

    }

public void crearPedido(Conexion solicitante,PEDIDOPOJO pedido){
    //Se crea el pedido primero
    try{
        String sql= "SELECT C.K_DOC_CLIENTE,C.I_TIPO_DOC from natame.cliente C where  C.n_username='"+solicitante.user+"'";
        PreparedStatement stmt=solicitante.getConexion().prepareStatement(sql);
        ResultSet rs=stmt.executeQuery();
        rs.next();
        //Se obtienen los datos necesarios para realizar el pedido
        String documentocliente=rs.getString("K_DOC_CLIENTE");
        String tipoDocCliente=rs.getString("I_TIPO_DOC");
        String estado="P";
        //Se obtiene la fecha actual
        LocalDate now = LocalDate.now();
		LocalDateTime startOfDay = now.atStartOfDay();
		java.util.Date hola=java.util.Date.from(startOfDay.atZone(ZoneId.systemDefault()).toInstant());
		Date today = new Date(hola.getTime());
        rs.close();
        stmt.close();
        
		//Se procede a insertar el pedido
         sql= "INSERT INTO NATAME.PEDIDO(K_COD_PEDIDO,K_DOC_CLIENTE,I_TIPO_DOC,I_ESTADO,F_PEDIDO) VALUES ('1',?,?,?,?)";
         stmt=solicitante.getConexion().prepareStatement(sql);
         stmt.setString(1, documentocliente);
         stmt.setString(2, tipoDocCliente);
         stmt.setString(3, estado);
         stmt.setDate(4, today);
         stmt.executeUpdate();
         
         solicitante.getConexion().commit();

    }catch(Exception e){
        e.printStackTrace();
    }
    // Obtener el id del ultimo pedido realizado por el cliente
    try {
        
        
        
        
    } catch (Exception e) {
        System.out.println("Fallo la creacion de los items");
        System.out.println(e.getMessage());
        solicitante.message=e.getMessage();
    }
    
    
    
    }
}
