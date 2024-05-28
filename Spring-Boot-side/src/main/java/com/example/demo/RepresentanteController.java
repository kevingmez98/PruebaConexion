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
import com.example.Utils.CLIENTEPOJO;
import com.example.Utils.SerialPOJO;
import com.example.userServices.RepresentanteService;

import org.javatuples.*;
import org.json.JSONArray;
import org.json.JSONObject;

/*Clase que contiene los metodos para que el representante pueda ejercer sus funciones desde la aplicacion */
@RequestMapping(value="/representante")
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class RepresentanteController {
    private final RepresentanteService representanteservice=new RepresentanteService();
   
        /*
         * Endpoint que retorna los clientes a cargo del representante logeado
         * PARAMETROS DE ENTRADA: SerialPOJO Serial
         * PARAMETROS DE SALIDA: ResponseEntity
         */
        @PostMapping(value="/clientes",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity getClientes(@RequestBody SerialPOJO Serial){
         Pair<JSONObject,Conexion> respuesta= representanteservice.getClientesrepresentante(Serial.Serial);
         if(respuesta.getValue0()!=null){
            return new ResponseEntity(respuesta.getValue0().toString(),HttpStatus.OK);
         }
         JSONObject error = new JSONObject();
         error.put("errors",respuesta.getValue1().message);
         return new ResponseEntity(error.toString(),HttpStatus.BAD_REQUEST);
          
        }
        //End point que retorna las ciudades de la region del representante
        /*
         * Endpoint que retorna las ciudades de la region del representante logeado
         * PARAMETROS DE ENTRADA: SerialPOJO Serial
         * PARAMETROS DE SALIDA: ResponseEntity
         */
        @PostMapping(value="/ciudades",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity getCiudades(@RequestBody SerialPOJO Serial){
         Pair<JSONObject,Conexion> respuesta= representanteservice.getciudades(Serial.Serial);
         if(respuesta.getValue0()!=null){
            return new ResponseEntity(respuesta.getValue0().toString(),HttpStatus.OK);
         }
         JSONObject error = new JSONObject();
         error.put("errors",respuesta.getValue1().message);
         return new ResponseEntity(error.toString(),HttpStatus.BAD_REQUEST);
          
        }
        //End point para crear un cliente, para conocer los campos de la peticion, revisar CLIENTEPOJO
        /*
         * Endpoint que llama a las funciones para registrar a un nuevo cliente en el sistema
         * PARAMETROS DE ENTRADA: CLIENTEPOJO cliente
         * PARAMETROS DE SALIDA: ResponseEntity
         */
        @PostMapping(value="/crearCliente",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity getCiudades(@RequestBody CLIENTEPOJO cliente){
        if(cliente.getSerial()==null){
            JSONObject error=new JSONObject();
            error.put("errors","Peticion invalida, hace falta identificador");
            return new ResponseEntity(error.toString(),HttpStatus.BAD_REQUEST);
        }
        String message= representanteservice.crearCliente(cliente);

         JSONObject error = new JSONObject();
         error.put("errors",message);
         
         return new ResponseEntity(error.toString(),HttpStatus.OK);
          
        }

        @PostMapping(value="/CambiarRepresentante",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity CambiarRepresentante(@RequestBody SerialPOJO serial){
        
        
         JSONObject message= representanteservice.cambiarRepresentante(serial.Serial);

         
         
         return new ResponseEntity(message.toString(),HttpStatus.OK);
          
        }
        @PostMapping(value="/verEstadisticas",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity verEstadisticas(@RequestBody SerialPOJO serial){
        
        
         JSONObject message= representanteservice.verEstadisticas(serial.Serial);

         
         
         return new ResponseEntity(message.toString(),HttpStatus.OK);
          
        }
        
}
