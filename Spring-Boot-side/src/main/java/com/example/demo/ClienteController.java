

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
import com.example.Utils.CALIFICACIONPOJO;
import com.example.Utils.ITEM;
import com.example.Utils.PAGOPOJO;
import com.example.Utils.PEDIDOPOJO;
import com.example.Utils.SerialPOJO;
import com.example.Utils.peticionregionPOJO;
import com.example.Utils.regionPOJO;
import com.example.userServices.ClienteService;
import com.example.userServices.RepresentanteService;

import java.util.ArrayList;
import java.util.List;

import org.javatuples.*;
import org.json.JSONArray;
import org.json.JSONObject;

/*Controlador del cliente, en este controlador se encuentran todos los endpoints a los que deberia tener acceso un cliente
 * para poder hacer uso de la funcionalidad del sitio
 */
@RequestMapping(value="/cliente")
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class ClienteController {
    private final ClienteService clienteservice=new ClienteService();
   
        /*Metodo para obtener el representante asignado de un cliente 
         * Parametros de entrada= String Serial (El serial corresponde al identificador de conexion del usuario)
         */
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

       

        //Endpoint Que devuelve un json con una lista de productos con una region, categoria y subcategoria especificas
        /*ENDPOINT que devuelve un json con la lista de productos de una region, sus categorias y sub categorias especificas.
        PARAMETROS DE ENTRADA: peticionregionPOJO productos 
        PARAMETROS DE SALIDA: ResponseEntity
         */
        @PostMapping(value="/Productosregion",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity getProductosregion(@RequestBody peticionregionPOJO productos){
         
         Pair<JSONObject,Conexion> respuesta=  clienteservice.getProductosRegion(productos.getRegion(),productos.getSerial(),productos.getCategoria(),productos.getSubcategoria());
         if(respuesta.getValue0()!=null){
            return new ResponseEntity(respuesta.getValue0().toString(),HttpStatus.OK);
         }
         
         JSONObject error = new JSONObject();
         error.put("errors",respuesta.getValue1().message);

         return new ResponseEntity(error.toString(),HttpStatus.BAD_REQUEST);
          
        }

        /*endpoint para crear un pedido en la base de datos
        Parametros de entrada: PEDIDOPOJO pedido
        Parametros de Salida: ResponseEntity
         * 
         */
        @PostMapping(value="/CrearPedido",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<List<ITEM>> crearPedido(@RequestBody PEDIDOPOJO pedido){
         System.out.println(pedido.get_items().get(0).get_codigoProducto());
         System.out.println(pedido.getSerial());
         clienteservice.crearPedido(pedido);
         
         return new ResponseEntity("error.toString()",HttpStatus.BAD_REQUEST);
        }
        /*endpoint que envia la lista de regiones guardada siempre en memoria
         Parametros de entrada: 
         Parametros de salida: ResponseEntity
         * 
         */
        @PostMapping(value="/Regiones",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity Regiones(@RequestBody String request){
           ArrayList<ArrayList<String>> regiones= clienteservice.ObtenerRegiones();
          ArrayList<String> codregiones= regiones.get(0);
          ArrayList<String> nomregiones=regiones.get(1);
          regionPOJO respuesta=new regionPOJO(codregiones,nomregiones);
          JSONObject response=new JSONObject(respuesta);

         return new ResponseEntity(response.toString(),HttpStatus.OK);
          
        }
        /*endpoint metodo para obtener las categorias de productos existentes
         * PARAMETROS DE ENTRADA: SerialPojo Serial (Serial es el identificador de conexion de cada usuario)
         * PARAMETROS DE SALIDA: ResponseEntity
         */
        @PostMapping(value="/Categorias",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity getcategorias(@RequestBody SerialPOJO Serial){
         
         Pair<JSONObject,Conexion> respuesta=clienteservice.getCategorias(Serial.Serial);
         if(respuesta.getValue0()!=null){
            return new ResponseEntity(respuesta.getValue0().toString(),HttpStatus.OK);
         }
         JSONObject error = new JSONObject();
         error.put("errors",respuesta.getValue1().message);

         return new ResponseEntity(error.toString(),HttpStatus.BAD_REQUEST);
          
        }
        /*endpoint metodo para obtener los pedidos de un cliente
         * PARAMETROS DE ENTRADA: SerialPojo Serial (Serial es el identificador de conexion de cada usuario)
         * PARAMETROS DE SALIDA: ResponseEntity
         */
        @PostMapping(value="/Pedidos",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity getPedidos(@RequestBody SerialPOJO Serial){
         
         Pair<JSONObject,Conexion> respuesta=clienteservice.getpedidos(Serial.Serial);
         if(respuesta.getValue0()!=null){
            return new ResponseEntity(respuesta.getValue0().toString(),HttpStatus.OK);
         }
         JSONObject error = new JSONObject();
         error.put("errors",respuesta.getValue1().message);

         return new ResponseEntity(error.toString(),HttpStatus.BAD_REQUEST);
          
        }
        /*endpoint metodo para obtener los items del pedido de un cliente
         * PARAMETROS DE ENTRADA: SerialPojo Serial (Serial es el identificador de conexion de cada usuario)
         * PARAMETROS DE SALIDA: ResponseEntity
         */
        @PostMapping(value="/itemspedido",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity getItemsPedido(@RequestBody SerialPOJO Serial){
         
         Pair<JSONObject,Conexion> respuesta=clienteservice.getItemspedidos(Serial);
         if(respuesta.getValue0()!=null){
            return new ResponseEntity(respuesta.getValue0().toString(),HttpStatus.OK);
         }
         JSONObject error = new JSONObject();
         error.put("errors",respuesta.getValue1().message);

         return new ResponseEntity(error.toString(),HttpStatus.BAD_REQUEST);
          
        }
        /*endpoint metodo para obtener los datos basicos de un cliente como su nombre, su correo y telefono
         * PARAMETROS DE ENTRADA: SerialPojo Serial (Serial es el identificador de conexion de cada usuario)
         * PARAMETROS DE SALIDA: ResponseEntity
         */
        @PostMapping(value="/datos",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity getDatos(@RequestBody SerialPOJO Serial){
         
         Pair<JSONObject,Conexion> respuesta=clienteservice.getdatos(Serial);
         if(respuesta.getValue0()!=null){
            return new ResponseEntity(respuesta.getValue0().toString(),HttpStatus.OK);
         }
         JSONObject error = new JSONObject();
         error.put("errors",respuesta.getValue1().message);

         return new ResponseEntity(error.toString(),HttpStatus.BAD_REQUEST);
          
        }
        /*endpoint metodo para crear una calificacion de un pedido pendiente por calificar
         * PARAMETROS DE ENTRADA: CALIFICACIONPOJO calificacion 
         * PARAMETROS DE SALIDA: ResponseEntity
         */
        @PostMapping(value="/calificacion",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity CalificarPedido(@RequestBody CALIFICACIONPOJO calificacion){
         System.out.println(calificacion.getCalificacion());
         System.out.println(calificacion.getIdpedido());
         System.out.println(calificacion.getSerial());
         String message=clienteservice.calificarPedido(calificacion);
        
        if(message!=""){
         JSONObject error = new JSONObject();
         error.put("errors",message);
         return new ResponseEntity(error.toString(),HttpStatus.BAD_REQUEST);
        }
      
         
         
         return new ResponseEntity("Se califico el pedido ekisde",HttpStatus.OK);
         
        }
        @PostMapping(value="/PagarPedido",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity PagarPedido(@RequestBody PAGOPOJO pago ){
         System.out.println(pago.getCodPedido());
         System.out.println(pago.getMetodoP());
         System.out.println(pago.getSerial());
         String message=clienteservice.pagarpedido(pago);
        
        if(message!=""){
         JSONObject error = new JSONObject();
         error.put("errors",message);
         return new ResponseEntity(error.toString(),HttpStatus.BAD_REQUEST);
        }
      
         
         
         return new ResponseEntity("Se Pago el pedido ekisde",HttpStatus.OK);
         
        }
        //Endpoint que recibe un id del pedido y un serial de conexion, y retorna los datos del pago

        @PostMapping(value="/detallePago",consumes=MediaType.APPLICATION_JSON_VALUE,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity getDetallePago(@RequestBody PAGOPOJO Pago){
         
         Pair<JSONObject,Conexion> respuesta=clienteservice.getdatosdepago(Pago.getSerial(),Pago.getCodPedido());
         if(respuesta.getValue0()!=null){
            return new ResponseEntity(respuesta.getValue0().toString(),HttpStatus.OK);
         }
         JSONObject error = new JSONObject();
         error.put("errors",respuesta.getValue1().message);

         return new ResponseEntity(error.toString(),HttpStatus.BAD_REQUEST);
          
        }

        
}
