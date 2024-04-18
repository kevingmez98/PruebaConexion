/*Componente que maneja subcategorias */
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import CatProducto from '../../../mapeo/Classes/CatProducto';

/*
El objeto tipo categoria para extraer sus componentes
Un id del componente padre para evitar redundancia entre formularios
Un handler del padre (CategorySelect) para actualizar el componente del formulario donde se necesite
*/
function SubCategory({ categoria, idCompPadre, handlerCategoria }) {

    //Funcion para manejar alguna accion desde acá y llamar al handler del padre
    const handleCategory = (idForm, idCat, idCatPadre,nomForm) => {

        //Llamar al handler del padre y pasar los argumentos
        handlerCategoria(idForm, idCat, idCatPadre, nomForm);
    }

    let subCat = categoria.obtenerSubcategorias();
    return (

        <React.Fragment>
            {/*Se revisa que la categoria tenga o no una subcategoria */}

            {subCat && subCat.length > 0 ? (
                <Dropdown as={ButtonGroup} drop="end">
                    <Form id={`f-h-${idCompPadre}`} className='switch-category'>
                        <Form.Check
                            type="switch"
                            name={`sw-${idCompPadre}`}
                            label={categoria.nomCat} 
                            onChange={() => handleCategory(`f-h-${idCompPadre}`, categoria.idCatProducto, categoria.idCatProSup,`sw-${idCompPadre}`)}
                            />
                    </Form>
                    <Dropdown.Toggle variant="outline-secondary" split id="nested-dropdown-toggle-split" className='own-drop-tog' />
                    <Dropdown.Menu>
                        {subCat.map((sub, ix) => (
                            <React.Fragment key={ix}>
                                <SubCategory categoria={sub} idCompPadre={`${idCompPadre}-${ix}`} handlerCategoria={handleCategory}></SubCategory>
                            </React.Fragment>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            ) :
                <Form id={`f-h-${idCompPadre}`}>
                    <Form.Check // prettier-ignore
                        type="switch"
                        name={`sw-${idCompPadre}`}
                        label={categoria.nomCat} 
                        onChange={() => handleCategory(`f-h-${idCompPadre}`, categoria.idCatProducto, categoria.idCatProSup,`sw-${idCompPadre}`)}
                        />
                </Form>
            }
        </React.Fragment >

    );
}

export default SubCategory;