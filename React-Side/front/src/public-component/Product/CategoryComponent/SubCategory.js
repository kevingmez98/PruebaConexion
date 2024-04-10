import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useState } from 'react';
import CatProducto from '../../../mapeo/CatProducto';

function SubCategory({ categoria }) {

    let subCat = categoria.obtenerSubcategorias();
    return (    

        <React.Fragment>
            {/*Se revisa que la categoria tenga o no una subcategoria */}

            {subCat && subCat.length >0 ? (
                <Dropdown as={ButtonGroup} drop="end">
                    <Button variant="success">{categoria.nomCat}</Button>
                    <Dropdown.Toggle variant="success" split id="nested-dropdown-toggle-split" />
                    <Dropdown.Menu>
                        {subCat.map((sub, ix) => (
                            <React.Fragment key={ix}>
                                <Dropdown.Item href="#/action-1">{sub.nomCat}</Dropdown.Item>
                            </React.Fragment>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            ) :
                <Dropdown.Item href="#/action-1">{categoria.nomCat}</Dropdown.Item>
            }
        </React.Fragment>

    );
}

export default SubCategory;