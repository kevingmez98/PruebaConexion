

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
import com.example.userServices.ClienteService;
import com.example.userServices.RepresentanteService;

import org.javatuples.*;
import org.json.JSONArray;
import org.json.JSONObject;

@RequestMapping(value="/cliente")
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class ClienteController {
    private final ClienteService clienteservice=new ClienteService();
   
        
        @PostMapping(value="/representanteAsignado",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity getClientes(@RequestBody SerialPOJO Serial){
         Pair<JSONObject,Conexion> respuesta=  clienteservice.getrepresentanteasignado(Serial.Serial);
         if(respuesta.getValue0()!=null){
            return new ResponseEntity(respuesta.getValue0().toString(),HttpStatus.OK);
         }
         JSONObject error = new JSONObject();
         error.put("errors",respuesta.getValue1().message);
         return new ResponseEntity(error.toString(),HttpStatus.BAD_REQUEST);
          
        }

        @PostMapping(value="/Productosregion",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity getProductosregion(@RequestBody SerialPOJO Serial){
         Pair<JSONObject,Conexion> respuesta=  clienteservice.getProductosRegion(Serial.Serial);
         if(respuesta.getValue0()!=null){
            return new ResponseEntity(respuesta.getValue0().toString(),HttpStatus.OK);
         }
         JSONObject error = new JSONObject();
         error.put("errors",respuesta.getValue1().message);
         return new ResponseEntity(error.toString(),HttpStatus.BAD_REQUEST);
          
        }
}
