package com.example.Utils;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.jooq.impl.DSL;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.example.ConnectionPool.Conexion;

public class JsonManager {

    public static JSONObject convert(ResultSet resultSet,Conexion con) throws Exception {
    JSONObject result = new JSONObject(DSL.using(con.getConexion())
  .fetch(resultSet)
  .formatJSON());
  System.out.println(result);
   return result;
      
}

}
