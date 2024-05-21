package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ConnectionPool.Conexion;
import com.example.Utils.SerialPOJO;

import org.javatuples.*;
import org.json.JSONObject;
/*
 * LOGINCONTROLLER contiene los metodos necesarios para el sistema de autenticacion utilizado
 */
@RequestMapping(value="/Login")
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class LoginController {
    private final LoginService loginservice=new LoginService();
    /*
     * endpoint recibe las credenciales del usuario y envia una respuesta en funcion del resultado de la autenticacion
     * PARAMETROS DE ENTRADA: USERPOJO usuario
     * PARAMETROS DE SALIDA: ResponseEntity
     */
    @PostMapping(value="/Autenticar",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity autenticar(@RequestBody USERPOJO usuario){
      Triplet<Boolean,String,String> respuesta= loginservice.autenticar(usuario.user, usuario.pass);
      if(respuesta.getValue0()){
        JSONObject resp = new JSONObject();

        resp.put("Serial", respuesta.getValue2());

        return new ResponseEntity(resp.toString(),HttpStatus.OK);
      }
      JSONObject resp = new JSONObject();
      resp.put("errors",respuesta.getValue1());
        return new ResponseEntity(resp.toString(),HttpStatus.BAD_REQUEST);
    }
    //Endpoint que retorna los datos basicos del usuario logeado
    @PostMapping(value="/datosbasicos",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getCiudades(@RequestBody SerialPOJO Serial){
     Pair<JSONObject,Conexion> respuesta= loginservice.getdatosbasicos(Serial.Serial);
     if(respuesta.getValue0()!=null){
        return new ResponseEntity(respuesta.getValue0().toString(),HttpStatus.OK);
     }
     JSONObject error = new JSONObject();
     error.put("errors",respuesta.getValue1().message);
     return new ResponseEntity(error.toString(),HttpStatus.BAD_REQUEST);
      
    }

    //EL end point mas importante de toda la aplicacion
    @PostMapping(value="/cerrarsesion",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity CerrarSesion(@RequestBody SerialPOJO Serial){
     JSONObject respuesta= loginservice.cerrarsesion(Serial.Serial);
     return new ResponseEntity(respuesta.toString(),HttpStatus.OK);
      
    }


    
}
