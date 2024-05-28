package com.example.Repositorios;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Formatter;

import com.example.ConnectionPool.Conexion;
import com.example.ConnectionPool.Pool;
import com.example.Utils.CLIENTEPOJO;

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
        String sql = "select representante.k_cod_representante,representante.n_primer_nombre,representante.n_segundo_nombre,representante.n_primer_apellido,representante.n_segundo_Apellido,representante.O_EMAIL,representante.I_GENERO,representante.F_Nacimiento,representante.F_contrato,representante.Q_NUM_TELEFONO,representante.O_Direccion,representante.K_COD_REP_SUP,representante.K_ID_CLASIFICACION,representante.K_COD_REGION" 
        +" from S_REPRESENTANTE representante, S_REGION "
        +" where representante.k_cod_region=S_REGION.k_cod_region and representante.k_cod_rep_sup=?";
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

public void crearRepresentante(Conexion solicitante,CLIENTEPOJO cliente){
    //Debe probarse la funcion :v
    LocalDate now = LocalDate.now();
    LocalDateTime startOfDay = now.atStartOfDay();
    java.util.Date hola=java.util.Date.from(startOfDay.atZone(ZoneId.systemDefault()).toInstant());
    Date today = new Date(hola.getTime());
    try{
        String sql="SELECT R.K_COD_REGION region FROM S_REGION R, S_REPRESENTANTE REP WHERE R.K_COD_REGION=REP.K_COD_REGION AND REP.K_COD_REPRESENTANTE=?";
        PreparedStatement stmt=solicitante.getConexion().prepareStatement(sql);
        stmt.setString(1,solicitante.user.toUpperCase());
        ResultSet rs= stmt.executeQuery();
        rs.next();
        String codRegion=rs.getString("region");
        rs.close();
         sql="INSERT INTO S_REPRESENTANTE VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
         stmt=solicitante.getConexion().prepareStatement(sql);
         LocalDate fechan=LocalDate.parse(cliente.getFechanacimiento());
         Date fechanacimiento=Date.valueOf(fechan);
        stmt.setString(1, cliente.getDocumento());
        stmt.setString(2, codRegion.toUpperCase());
        stmt.setString(3, "BGN");
        stmt.setString(4, solicitante.user.toUpperCase());
        stmt.setString(5, cliente.getPrimernombre().toUpperCase());
        System.out.println(cliente.getPrimernombre());
        if(cliente.getSegundonombre()!=null){
            stmt.setString(6, cliente.getSegundonombre().toUpperCase());
        }else{
            stmt.setNull(6, Types.VARCHAR);
        }
        stmt.setString(7, cliente.getPrimerapellido().toUpperCase());
        stmt.setString(8, cliente.getSegundoapellido().toUpperCase());
        stmt.setString(9, cliente.getEmail());
        stmt.setString(10, cliente.getGenero());
        stmt.setDate(11, fechanacimiento);

        stmt.setDate(12, today);
        stmt.setString(13, cliente.getNumtelefono());
        stmt.setString(14, cliente.getDireccion());
        stmt.executeUpdate();
        //Fecha actual
        stmt.setDate(4,today);
        stmt.setNull(5,Types.DATE);
        stmt.executeUpdate();
        
        solicitante.message="Cliente creado con exito";
        stmt.close();
        sql="CREATE USER "+cliente.getDocumento()+" identified by "+cliente.getDocumento();
        Statement ctmt=Pool.getSystem().getConexion().createStatement();
        System.out.println(cliente.getDocumento());
        ctmt.execute(sql);
        ctmt.close();
        sql="GRANT R_Cliente to "+cliente.getDocumento();
        ctmt=Pool.getSystem().getConexion().prepareStatement(sql);
        ctmt.execute(sql);
        ctmt.close();
        solicitante.getConexion().commit();
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


public String volarcorea(Conexion solicitante){

    try{
        //Se llama al procedimiento almacenado
    }catch(Exception e){
        return "Corea fue mas fuerte";
    }
return "Corea more like Cursed diarrea";
}
public String volarcoreaR(Conexion solicitante){
    //Recuperar region
    try{
        //Se llama al procedimiento almacenado
    }catch(Exception e){
        return "Corea fue mas fuerte";
    }
return "Corea more like Cursed diarrea";
}


public String verListaEstadisticas(Conexion solicitante){

    try{
        //Se llama al procedimiento almacenado para ver lista estadisticas de todos los representontos
    }catch(Exception e){
        return "Corea fue mas fuerte";
    }
return "Corea more like Cursed diarrea";
}



}
