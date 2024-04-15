import CardComponent from '../../Card/DarkCard/CardComponent';
import React, { useState } from 'react';
import Axios from 'axios';
import CategorySelect from './CategorySelect';
import Button from 'react-bootstrap/Button';

import { dividirArray } from '../../Common-functions/ArrayFunct';

//HandleFiltro es una funcion de callback para recuperar luego la categoria seleccionada desde el padre
function CategoryFilter({ handleFiltro }) {

    //Mensaje de error
    const [ErroMessage, setMessage] = React.useState('');

    //Datos de las categorias obtenidas 
    var [categories, setCategories] = React.useState([]);

    // Estado para almacenar los valores de los checkboxes de categoria 
    const [checkData, setCheckData] = useState([]);




    //Peticion para traer las categorias
    var peticionCategorias = () => {
        return new Promise((resolve, reject) => {
            setMessage("");
            Axios.post('http://localhost:8080/cliente/Categorias', { "Serial": window.sessionStorage.getItem("Serial") })
                .then((response) => {
                    // Resolvemos la promesa con los datos recibidos
                    resolve(response.data);
                })
                .catch((error) => {
                    // Rechazamos la promesa con el mensaje de error
                    setMessage(error.response.data.errors);

                });
        });
    };


    //UseEffect inicial, se ejecuta al cargar el componente
    React.useEffect(() => {
        const fetchData = async () => {
            const datosCat = await peticionCategorias();
            //const datosCat = categoriesData;
            setCategories(datosCat);
        }

        fetchData();
    }, []);

    /* Funcion para pasar al padre la categoria que se activa */
    const handleCategoriaElegida = (idCat, idCatPadre) => {
        console.log(idCat);
        handleFiltro({ idCat, idCatPadre });
    }


    // Función para manejar el cambio de estado de los checkbox de categoria
    /*
        Se guarda el id de los formularios activados, el nombre del check
        tambien la categoria y posible categoria padre
    */
    const handleCheckBox = (formCheck, idCat, idCatPadre, nombreCheck) => {

        //obtener el valor del check de categorias
        const prodForm = document.getElementById(formCheck);

        const valor = prodForm.elements[nombreCheck].checked;

        // Obtener el índice del formData actual si existe en checkData
        const index = checkData.findIndex(data => data['id-cat'] === idCat);

        //Si no existe se agrega
        if (index === -1) {

            const formData = { 'id-form': formCheck, 'nombre-check': nombreCheck, 'id-cat': idCat, 'id-cat-padre': idCatPadre, 'value': valor };

            // ...checkData permite tener una copia superficial de la variable
            setCheckData([
                ...checkData,
                formData
            ]);
        };
        //Si el valor es true indica que se activa el check
        if (valor) {
            //Se desactivan todos los check exceto el que activó el metodo
            checkData.forEach(data => {
                data['value'] = false;
                cambiarCheck(data['id-form'], data['nombre-check'], false);

                //Si la categoria que se activa tiene categoria padre tambien se activa
                if (data['id-cat'] === idCat) {
                    data['value'] = true;
                    cambiarCheck(data['id-form'], data['nombre-check'], true);
                }

            });
        }

    };


    //Cambiar el valor de un checkbox dandole el nombre que tiene y el idForm al que pertenece
    function cambiarCheck(idForm, nombreCheck, valor) {
        const prodForm = document.getElementById(idForm);

        // Cambiar el valor del checkbox
        prodForm.elements[nombreCheck].checked = valor;
    }

    //Hacer la consulta de filtros con categorias
    const aplicarFiltroCat = async () => {
        let idCatPadre;
        let idCat;
        let cat = "No se especificó una categoria";

        //Se recorren lo check de las categorias y se traen su id y su id de categoria padre
        for (let i = 0; i < checkData.length; i++) {

            //Si el check tiene 'value' true se asigna
            if (checkData[i]['value']) {
                cat = "categoria con id " + checkData[i]['id-cat'];
                idCat = checkData[i]['id-cat'];

                //Se asigna la categoria padre si la tiene
                if (checkData[i]['id-cat-padre']) {
                    cat += ". tiene el id padre " + checkData[i]['id-cat-padre'];
                    idCatPadre = checkData[i]['id-cat-padre'];
                }


                //Si existe idCat es porque se seleccionó aunque sea una categoria
                if (idCat) {
                    //Se pasa el dato de la categoria y su categoria padre al handlerPadre
                    handleCategoriaElegida(idCat,idCatPadre);
                }
            }
        }
        alert(cat);
    }



    return (
        <div>

            {categories && categories.records && (
                <React.Fragment>
                    <CategorySelect categorias={categories.records} handlerPadre={handleCheckBox} />
                    <Button variant="primary" onClick={() => aplicarFiltroCat()}>
                        Aplicar filtro de categorias
                    </Button>
                </React.Fragment>
            )}
        </div>
    )

}

export default CategoryFilter;