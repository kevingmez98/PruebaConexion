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
import com.example.userServices.DirectorService;
import com.example.userServices.RepresentanteService;

import org.javatuples.*;
import org.json.JSONArray;
import org.json.JSONObject;

/*
 * Controlador para las acciones que pueden ser realizadas por el director de una region
 */
@RequestMapping(value="/Director")
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class DirectorController {
    private final DirectorService directorservice=new DirectorService();
   
        /*
         * endpoint para obtener los representantes de una region a cargo del director
         */
        @PostMapping(value="/representantesA",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity getClientes(@RequestBody SerialPOJO Serial){
         Pair<JSONObject,Conexion> respuesta= directorservice.getRepresentantesacargo(Serial.Serial);
         if(respuesta.getValue0()!=null){
            return new ResponseEntity(respuesta.getValue0().toString(),HttpStatus.OK);
         }
         JSONObject error = new JSONObject();
         error.put("errors",respuesta.getValue1().message);
         return new ResponseEntity(error.toString(),HttpStatus.BAD_REQUEST);
          
        }

        @PostMapping(value="/clasificacionGeneral",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity Reclasificar(@RequestBody SerialPOJO Serial){
         JSONObject respuesta= directorservice.reclasificar(Serial.Serial);
         
         return new ResponseEntity(respuesta.toString(),HttpStatus.OK);
          
        }
        @PostMapping(value="/clasificacionRegional",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity ReclasificarRegion(@RequestBody SerialPOJO Serial){
         String respuesta= directorservice.reclasificarRegion(Serial.Serial);
         JSONObject message=new JSONObject();
         if(respuesta==null){
            message.put("message","Reclasificacion exitosa");
            return new ResponseEntity(message.toString(),HttpStatus.OK);

         }
         message.put("message",message);
         return new ResponseEntity(message.toString(),HttpStatus.BAD_REQUEST);
          
        }

        @PostMapping(value="/verListaEstadisticas",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity VerEstadisticas(@RequestBody SerialPOJO Serial){
         JSONObject respuesta= directorservice.verListaEstadisticas(Serial.Serial);
         
         return new ResponseEntity(respuesta.toString(),HttpStatus.OK);

          
        }

        @PostMapping(value="/crearRepresentante",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity getCiudades(@RequestBody CLIENTEPOJO cliente){
        if(cliente.getSerial()==null){
            JSONObject error=new JSONObject();
            error.put("errors","Peticion invalida, hace falta identificador");
            return new ResponseEntity(error.toString(),HttpStatus.BAD_REQUEST);
        }
        String message= directorservice.crearRepresentante(cliente);

         JSONObject error = new JSONObject();
         error.put("errors",message);
         
         return new ResponseEntity(error.toString(),HttpStatus.OK);
          
        }
        
}
