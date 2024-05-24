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
import com.example.ConnectionPool.Pool;
import com.example.Utils.CLIENTEPOJO;
import com.example.Utils.ITEM;
import com.example.Utils.PEDIDOPOJO;

public class ClienteRepository {
static private ClienteRepository repositorio;

    ClienteRepository(){

    }
    /*Implementacion del patron singleton para los repositorios */
    public static ClienteRepository getRepositorio(){
        if(repositorio==null){
            repositorio=new ClienteRepository();
            return repositorio;
        }
        return repositorio;
    }

    /*
     * Metodo para consultar el representante asignado al cliente logead
     * PARAMETROS DE ENTRADA: Conexion solicitante
     * PARAMETROS DE SALIDA:  ResultSet rs;
     */
public ResultSet ConsultarRepresentanteAsignado(Conexion solicitante){
    System.out.println("rep"+solicitante.user);
try {
    String sql= "SELECT C.K_DOC_CLIENTE from natame.cliente C where  UPPER(C.n_username)=UPPER('"+solicitante.user+"')";
    PreparedStatement stmt=solicitante.getConexion().prepareStatement(sql);
    ResultSet rs=stmt.executeQuery();
    rs.next();
    String documentocliente=rs.getString("K_DOC_CLIENTE");
    System.out.println(documentocliente);
    sql = "SELECT rc.n_primer_nombre, rc.n_primer_apellido, rc.n_segundo_nombre, rc.n_segundo_apellido, rc.q_num_telefono, rc.o_email "+
          "FROM natame.contrato c, natame.representante rc "+
          "where C.K_DOC_CLIENTE=? AND RC.K_COD_REPRESENTANTE=C.K_COD_REPRESENTANTE AND C.F_TERMINO is null";
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

/*
     * Metodo para consultarp productos de una region, segun categoria y subcategoria
     * PARAMETROS DE ENTRADA: Conexion solicitante,
     *                        String region,
     *                        String categoria,
     *                        String subcategoria
     * PARAMETROS DE SALIDA:  ResultSet rs;
     */
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

/*
     * Metodo para consultar las categorias de la region del cliente logeado
     * PARAMETROS DE ENTRADA: Conexion solicitante
     * PARAMETROS DE SALIDA:  ResultSet rs;
     */
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
/*
     * Metodo para consultar los pedidos del cliente logeado
     * PARAMETROS DE ENTRADA: Conexion solicitante
     * PARAMETROS DE SALIDA:  ResultSet rs;
     */
public ResultSet ConsultarPedidos(Conexion solicitante){
    try {
        
        String sql= "SELECT C.K_DOC_CLIENTE,C.I_TIPO_DOC from natame.cliente C where UPPER(C.n_username)=?";
        PreparedStatement stmt=solicitante.getConexion().prepareStatement(sql);
        stmt.setString(1,solicitante.user.toUpperCase());
        ResultSet rs=stmt.executeQuery();
        rs.next();
        //Se obtienen los datos necesarios para realizar el pedido
        String documentocliente=rs.getString("K_DOC_CLIENTE");
        String tipoDocCliente=rs.getString("I_TIPO_DOC");
        rs.close();
        stmt.close();
        sql="SELECT pedido.K_COD_PEDIDO,pedido.K_COD_PAGO,pedido.I_ESTADO,pedido.F_PEDIDO,pedido.Q_CALIFICACION from natame.pedido pedido where pedido.K_DOC_CLIENTE=? AND pedido.I_TIPO_DOC=? ";
        stmt=solicitante.getConexion().prepareStatement(sql);
        stmt.setString(1,documentocliente);
        stmt.setString(2,tipoDocCliente);
        rs=stmt.executeQuery();
        return rs;
        
        
    } catch (Exception e) {
        System.out.println("Fallo la recuperacion de los pedidos");
        System.out.println(e.getMessage());
        solicitante.message=e.getMessage();
    }
    return null;
    }
    /*
     * Metodo para consultar los items del pedido especificado
     * PARAMETROS DE ENTRADA: Conexion solicitante
     *                        String codpedido.
     * PARAMETROS DE SALIDA:  ResultSet rs;
     */
public ResultSet ConsultarItemspedido(Conexion solicitante,String codpedido){
        try {
            System.out.println(codpedido);
            String sql= "SELECT item.k_cod_pedido,region.n_nom_region,producto.n_nom_producto,item.q_cantidad, inv.q_precio_unitario "+
            "from natame.item item,natame.region region,natame.producto producto, natame.inventario inv "+
            "where item.k_cod_region=region.k_cod_region and item.k_cod_producto=producto.k_cod_producto and inv.k_cod_producto = item.k_cod_producto "+
            "and item.I_ID_CAT_PRODUCTO=producto.I_ID_CAT_PRODUCTO and item.k_cod_pedido=?";
            
            PreparedStatement stmt=solicitante.getConexion().prepareStatement(sql);
            stmt.setString(1,codpedido);
            return stmt.executeQuery();
        } catch (Exception e) {
            System.out.println("Fallo la recuperacion de los pedidos");
            System.out.println(e.getMessage());
            solicitante.message=e.getMessage();
        }
        return null;
        }
    /*
     * Metodo para consultar los datos basicos del cliente
     * PARAMETROS DE ENTRADA: Conexion solicitante
     * PARAMETROS DE SALIDA:  ResultSet rs;
     */
public ResultSet getdetallesdepago(Conexion solicitante, String idpedido){
    
try {
    String sql= "SELECT P.K_COD_PAGO, P.F_FECHA,I_METODO,Q_VALOR FROM NATAME.PAGO P, NATAME.PEDIDO PE WHERE PE.K_COD_PAGO=P.K_COD_PAGO AND PE.K_COD_PEDIDO=?";
    PreparedStatement stmt=solicitante.getConexion().prepareStatement(sql);
    stmt.setString(1,idpedido);
    ResultSet rs=stmt.executeQuery();
    
    return rs;
    
} catch (Exception e) {
    System.out.println("Fallo la recuperacion de los datos del pago");
    System.out.println(e.getMessage());
    solicitante.message=e.getMessage();
}
return null;
}
public ResultSet getdatosbasicos(Conexion solicitante){
    System.out.println(solicitante.user);
try {
    String sql= "SELECT R.K_COD_REGION,R.N_PRIMER_NOMBRE,R.N_SEGUNDO_NOMBRE,R.N_PRIMER_APELLIDO,R.N_SEGUNDO_APELLIDO,R.O_EMAIL,R.I_GENERO, R.F_NACIMIENTO, R.Q_NUM_TELEFONO, R.O_DIRECCION" 
               +" from natame.representante R WHERE K_COD_REPRESENTANTE=?";
    PreparedStatement stmt=solicitante.getConexion().prepareStatement(sql);
    stmt.setString(1,solicitante.user.toUpperCase());
    ResultSet rs=stmt.executeQuery();
    if(rs.next()){
       rs= stmt.executeQuery();
       
        return rs;
    }
    sql= "SELECT C.K_COD_CIUDAD,C.N_PRIMER_NOMBRE,C.N_SEGUNDO_NOMBRE,C.N_PRIMER_APELLIDO,C.N_SEGUNDO_APELLIDO,C.O_EMAIL, C.Q_NUM_TELEFONO, C.O_DIRECCION"
        +" FROM NATAME.CLIENTE C WHERE C.N_USERNAME=?";
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
/*
     * Metodo para consultar los datos relacionados con el pago del cliente
     * PARAMETROS DE ENTRADA: Conexion solicitante
     * PARAMETROS DE SALIDA:  ResultSet rs;
     */
public ResultSet getdatosdepago(Conexion solicitante){
    System.out.println(solicitante.user);
try {
    String sql= "SELECT cliente.k_doc_cliente, cliente.i_tipo_doc,cliente.k_cod_ciudad,cliente.n_primer_nombre,cliente.n_segundo_nombre,cliente.n_primer_apellido,cliente.n_segundo_apellido,cliente.o_email,cliente.q_num_telefono,cliente.o_direccion from natame.cliente cliente where cliente.n_username=?";
    PreparedStatement stmt=solicitante.getConexion().prepareStatement(sql);
    stmt.setString(1,solicitante.user.toUpperCase());
    ResultSet rs=stmt.executeQuery();
    return rs;
    
} catch (Exception e) {
    System.out.println("Fallo la recuperacion de los datos de pago del cliente");
    System.out.println(e.getMessage());
    solicitante.message=e.getMessage();
}
return null;
}
//Insert para crear el cliente nuevo
/*
     * Metodo para crear un nuevo Cliente en el sistema
     * PARAMETROS DE ENTRADA: Conexion solicitante,
     *                        CLIENTEPOJO cliente
     * PARAMETROS DE SALIDA:  ResultSet rs;
     */
public void crearCliente(Conexion solicitante,CLIENTEPOJO cliente){
    //Debe probarse la funcion :v
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
        sql="CREATE USER ? identified by ?";
        stmt=Pool.getPool().getSystem().getConexion().prepareStatement(sql);
        stmt.setString(1,cliente.getUsuario());
        stmt.setString(2,cliente.getDocumento());
        stmt.execute();
        sql="GRANT R_REPVENTAS to ?";
        stmt=Pool.getPool().getSystem().getConexion().prepareStatement(sql);
        stmt.setString(1,cliente.getUsuario().toUpperCase());
        stmt.execute();
        
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

    /*
     * Metodo para crear un nuevo pedido en el sistema
     * PARAMETROS DE ENTRADA: Conexion solicitante,
     *                        PEDIDOPOJO pedido
     * PARAMETROS DE SALIDA:  ResultSet rs;
     */
public String crearPedido(Conexion solicitante,PEDIDOPOJO pedido){
    //falta comprobar la disponibilidad de los productos en el inventario
    //Se crea el pedido primero
    try{
        String sql= "SELECT C.K_DOC_CLIENTE,C.I_TIPO_DOC from natame.cliente C where UPPER(C.n_username)=?";
        PreparedStatement stmt=solicitante.getConexion().prepareStatement(sql);
        stmt.setString(1, solicitante.user.toUpperCase()); // Establecer el parámetro de manera segura
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
        
        
		//Se procede a insertar el pedido
         sql= "INSERT INTO NATAME.PEDIDO(K_COD_PEDIDO,K_DOC_CLIENTE,I_TIPO_DOC,I_ESTADO,F_PEDIDO) VALUES(NATAME.PEDIDO_SEQ.NEXTVAL,?,?,?,?)";
         stmt=solicitante.getConexion().prepareStatement(sql);
         stmt.setString(1, documentocliente);
         stmt.setString(2, tipoDocCliente);
         stmt.setString(3, estado);
         stmt.setDate(4, today);
         stmt.executeUpdate();
         
         //solicitante.getConexion().commit();

    }catch(Exception e){
        e.printStackTrace();
        return e.getMessage();
    }
    // Insertar Items
    try {
        String sql="INSERT into natame.ITEM(item.k_cod_item, item.k_cod_pedido, item.k_cod_region, item.k_cod_producto, item.i_id_cat_producto,Q_cantidad) "+
        "values(NATAME.ITEM_SEQ.NEXTVAL,NATAME.PEDIDO_SEQ.CURRVAL,?,?,?,?)";
        PreparedStatement stmt = solicitante.getConexion().prepareStatement(sql);
        for(ITEM e :pedido.get_items()){
            stmt.setString(1,e.get_region());
            stmt.setString(2,e.get_codigoProducto());
            stmt.setString(3,e.get_catProducto());
            stmt.setDouble(4, e.get_cantidad());
            stmt.executeUpdate();
        }
        
         solicitante.getConexion().commit();
    } catch (Exception e) {
        System.out.println("Fallo la creacion de los items");
        System.out.println(e.getMessage());
        solicitante.message=e.getMessage();
        return e.getMessage();
    }
   
    return null;
    
    }
    /*
     * Metodo para añadir una calificacion al pedido
     * PARAMETROS DE ENTRADA: Conexion solicitante
     *                        String idpedido,
     *                        int calificacion
     * PARAMETROS DE SALIDA:  ResultSet rs;
     */
    public void crearCalificacion(Conexion solicitante,String idpedido,int calificacion){
    
        try{
            String sql="UPDATE natame.pedido set q_calificacion=?,I_ESTADO='F' where K_COD_PEDIDO=?";
            PreparedStatement stmt=solicitante.getConexion().prepareStatement(sql);
            stmt.setInt(1,calificacion);
            stmt.setString(2,idpedido);
            stmt.executeUpdate();
            solicitante.getConexion().commit();
            
            
        }catch(Exception e){
            solicitante.message=e.getMessage();
        }
    
        }
        public void pagarpedido(Conexion solicitante,String idpedido,String metodo,Long valor){
    
            try{
                String sql="INSERT INTO NATAME.PAGO(K_COD_PAGO,F_FECHA,I_METODO,Q_VALOR) values(natame.PAGO_SEQ.nextval,?,?,?)";
                PreparedStatement stmt=solicitante.getConexion().prepareStatement(sql);
                LocalDate now = LocalDate.now();
                LocalDateTime startOfDay = now.atStartOfDay();
                java.util.Date hola=java.util.Date.from(startOfDay.atZone(ZoneId.systemDefault()).toInstant());
                Date today = new Date(hola.getTime());
                stmt.setDate(1,today);
                stmt.setString(2,metodo);
                stmt.setLong(3,valor);
                stmt.executeUpdate();
                sql="UPDATE NATAME.PEDIDO set K_COD_PAGO=natame.PAGO_SEQ.currval, I_ESTADO='S' WHERE K_COD_PEDIDO=?";
                stmt=solicitante.getConexion().prepareStatement(sql);
                stmt.setString(1,idpedido);
                stmt.executeUpdate();
                solicitante.getConexion().commit();
            }catch(Exception e){
                try{
                solicitante.getConexion().rollback();
                }catch(Exception a){
                    e.printStackTrace();
                }
                solicitante.message=e.getMessage();
            }
        
            }
}
