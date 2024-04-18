export default class Item {

    constructor(codigoProducto,cantidad ){
        this._codigoProducto = codigoProducto;
        this._cantidad = cantidad;
        
    }
  
    // Getters
    get codigoItem() {
      return this._codigoItem;
    }
  
    get codigoPedido() {
      return this._codigoPedido;
    }
  
    get codigoRegion() {
      return this._codigoRegion;
    }
  
    get codigoProducto() {
      return this._codigoProducto;
    }
  
    get idCategoriaProducto() {
      return this._idCategoriaProducto;
    }
  
    get cantidad() {
      return this._cantidad;
    }
  
    // Setters
    set codigoItem(codigoItem) {
      this._codigoItem = codigoItem;
    }
  
    set codigoPedido(codigoPedido) {
      this._codigoPedido = codigoPedido;
    }
  
    set codigoRegion(codigoRegion) {
      this._codigoRegion = codigoRegion;
    }
  
    set codigoProducto(codigoProducto) {
      this._codigoProducto = codigoProducto;
    }
  
    set idCategoriaProducto(idCategoriaProducto) {
      this._idCategoriaProducto = idCategoriaProducto;
    }
  
    set cantidad(cantidad) {
      this._cantidad = cantidad;
    }
  }
  
  