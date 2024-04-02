/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.example.ConnectionPool;
/**
 *
 * @author ADMIN
 */
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.DatabaseMetaData;
import java.util.Properties;

public class Conexion {

    Connection con = null;
    public String message=null;
    public boolean successful=false;
    public String user;
    public String pass;
    public String serial;

    public Conexion(){
        
    }
    public Conexion(String user, String pass){
        this.user=user;
        this.pass=pass;
    }

    public String conectar() {
        

        String url = "jdbc:oracle:thin:@//localhost:1521/BD2_2024";

        try {
            Class.forName("oracle.jdbc.OracleDriver");

            con = DriverManager.getConnection(url, user, pass);
            System.out.println("Conexion exitosa");
            successful=true;
        } catch (Exception e) {
            System.out.println("error");
            System.out.println(e.getMessage());
            message=e.getMessage();
            return e.getMessage();
        }
        return user+" Conexion exitosa";
    }
/* 
public void getAllStudents() {
    try {
        String sql = "SELECT * FROM ESTUDIANTE";
       Statement stmt = con.createStatement();
        
        ResultSet rs = stmt.executeQuery(sql);
        
        while(rs.next()){
            System.out.println(rs.getString("N_NOMBRE"));
        }
    } catch (Exception e) {
        System.out.println("Error en la consulta. Conexion del usuario: "+user);
        System.out.println(e.getMessage());
    }
}
*/
    public String getConnectionSerial(String user) {
        try {
            String sql = "select serial#,username,machine,program,module from v$session where username=?";
            PreparedStatement stmt = con.prepareStatement(sql);
           stmt.setString(1,user.toUpperCase());
           
            
            ResultSet rs = stmt.executeQuery();
            rs.next();
            String result= rs.getString("SERIAL#");
            rs.close();
            stmt.close();
            return result;
            
        } catch (Exception e) {
            System.out.println("Fallo la recuperacion del serial de conexion de "+ user);
            System.out.println(e.getMessage());
        }
        return "";
    
}

    public Connection getConexion(){
     return con;
    }
    public void cerrarConexion() {
        try {
            con.close();
            System.out.println("Conexión cerrada");
        } catch (Exception e) {
            System.out.println("Error cerrando");
            System.out.println(e.getMessage());
        }
    }
}
