// CategorySelect.js
import React, { useState } from 'react';
import CatProducto from '../../../mapeo/CatProducto';
import { convertirDatos, convertirMuchosDatos, organizarCategorias } from '../../../mapeo/Helpers/CatProductoHelper';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import SubCategory from './SubCategory';


function CategorySelect({ categorias }) {

    let listaCat = convertirMuchosDatos(categorias);

    let listaCatPrincipales = organizarCategorias(listaCat);

    return (
        <React.Fragment>
            {listaCatPrincipales && listaCatPrincipales.map((padre, idx) =>
                <Dropdown as={ButtonGroup} drop="end" key={idx}>
                    <Button variant="success">{padre.nomCat}</Button>
                    {padre.obtenerSubcategorias() && padre.obtenerSubcategorias().length >0 ? (
                        <React.Fragment>
                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                            <Dropdown.Menu>
                                {padre.obtenerSubcategorias().map((sub, ix) => (
                                    <React.Fragment key={ix + idx}>
                                        <SubCategory categoria={sub}></SubCategory>
                                    </React.Fragment>

                                ))}
                            </Dropdown.Menu>
                        </React.Fragment>
                    ):
                        <br/>
                    }


                </Dropdown>
            )
            }
        </React.Fragment >
    );

}


export default CategorySelect;