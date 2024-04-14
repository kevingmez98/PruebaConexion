import CardComponent from "../../public-component/Card/DarkCard/CardComponent";
import React, { useState } from 'react';
function GestionarInventario() {

    //La lista de productos que se obtienen de la base de datos
    var [listaProductos, setListaProductos] = React.useState([]);

    //Una lista que guardará la lista de productos si se filtran por nombre
    var [listaProdTemp, setListaProdTemp] = React.useState([]);

    //Datos de las categorias obtenidas 
    var [categories, setCategories] = React.useState([]);

    //Datos JSON de productos traidos por la busqueda de region
    var [dataJson, SetjsonData] = React.useState('');

    //Variable que guarda el valor puesto en el filtro por nombre
    var [nomFiltro, setNomFiltro] = React.useState('');

    // Estado para almacenar los valores de los checkboxes de categoria 
    const [checkData, setCheckData] = useState([]);

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

    //Hacer la consulta de filtros con categorias
    const aplicarFiltroCat = async () => {
        let idCatPadre;
        let idCat;
        let cat = "No se especificó una categoria";

        //Se recorren lo check de las categorias y se traen su id y su id de categoria padre
        for (let i = 0; i < checkData.length; i++) {
            if (checkData[i]['value']) {
                cat = "categoria con id " + checkData[i]['id-cat'];
                idCat = checkData[i]['id-cat'];


                if (checkData[i]['id-cat-padre']) {
                    cat += ". tiene el id padre " + checkData[i]['id-cat-padre'];
                    idCatPadre = checkData[i]['id-cat-padre'];
                }

                //Si existe idCat es porque se seleccionó aunque sea una categoria
                if (idCat) {
                    //const data = await peticion(regionActiva, idCatPadre, idCat);

                    // Una vez que la promesa se resuelve, actualizamos el estado con los datos recibidos
                    //SetjsonData(data);
                }
            }
        }
        alert(cat);
    }


        //Cambiar el valor de un checkbox dandole el nombre que tiene y el idForm al que pertenece
        function cambiarCheck(idForm, nombreCheck, valor) {
            const prodForm = document.getElementById(idForm);
    
            // Cambiar el valor del checkbox
            prodForm.elements[nombreCheck].checked = valor;
    
        }

    return (
        <CardComponent titulo={"Gestion de inventario"}>
            <div className="p-3 mb-2 bg-info text-white">Gestion de inventario</div>
        </CardComponent>
    )
}

export default GestionarInventario;