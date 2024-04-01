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
import org.javatuples.*;
import org.json.JSONObject;
@RequestMapping(value="/ola")
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class LoginController {
    private final LoginService loginservice=new LoginService();
    
    @PostMapping(value="/sex",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
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


    
}
