/* CategorySelect.js

Maneja las categorias 'padre' y muestra las hijas
*/
import React, { useState } from 'react';
import CatProducto from '../../../mapeo/CatProducto';
import { convertirDatos, convertirMuchosDatos, organizarCategorias } from '../../../mapeo/Helpers/CatProductoHelper';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import SubCategory from './SubCategory';
import Form from 'react-bootstrap/Form';

/* La lista de categorias
   Un handler desde el padre que actualiza una variable del padre
*/
function CategorySelect({ categorias, handlerPadre }) {

    //Funcion para manejar alguna accion desde acá y llamar al handler del padre
    const handleCategory = (idForm, idCat, idCatPadre,valorCheck) => {
        //Llamar al handler del padre y pasar los argumentos
        handlerPadre(idForm, idCat, idCatPadre,valorCheck);
    }

    let listaCat = convertirMuchosDatos(categorias);

    let listaCatPrincipales = organizarCategorias(listaCat);

    return (
        <React.Fragment >
            {listaCatPrincipales && listaCatPrincipales.map((categoria, idx) =>

                <Dropdown as={ButtonGroup} drop="end" key={idx} className='btn-group'>
                    <Form id={`f-cat-${idx}`} className='switch-category'>
                        <Form.Check
                            type="switch"
                            name={`sw-${idx}`}
                            label={categoria.nomCat}
                            onChange={() => handleCategory(`f-cat-${idx}`, categoria.idCatProducto, categoria.idCatProSup,`sw-${idx}`)}
                        />
                    </Form>
                    {categoria.obtenerSubcategorias() && categoria.obtenerSubcategorias().length > 0 ? (
                        <React.Fragment>
                            <Dropdown.Toggle split variant="outline-secondary" id="dropdown-split-basic" className='own-drop-tog' />
                            <Dropdown.Menu>
                                {categoria.obtenerSubcategorias().map((sub, ix) => (
                                    <React.Fragment key={ix + idx}>
                                        <SubCategory categoria={sub} idCompPadre={`${idx}-${ix}`} handlerCategoria={handleCategory}></SubCategory>
                                    </React.Fragment>

                                ))}
                            </Dropdown.Menu>
                        </React.Fragment>
                    ) :

                        <br />
                    }


                </Dropdown>
            )
            }
            <br />
        </React.Fragment >
    );

}


export default CategorySelect;