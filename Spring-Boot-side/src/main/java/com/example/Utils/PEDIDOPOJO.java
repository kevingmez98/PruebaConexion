package com.example.Utils;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class PEDIDOPOJO {
    
private List<ITEM> _items;
private String Serial;
        
public String getSerial() {
    return Serial;
}


public void setSerial(String serial) {
    Serial = serial;
}


@JsonCreator
public PEDIDOPOJO(List<ITEM> _items,String Serial) {
            this._items = _items;
            this.Serial= Serial;
        }


public List<ITEM> get_items() {
    return _items;
}

public void set_items(List<ITEM> _items) {
    this._items = _items;
}



}
