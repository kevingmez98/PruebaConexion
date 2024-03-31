import CardComponent from "../../public-component/Card/CardComponent";
import SimpleTable from "../../public-component/JSONTable/SimpleTable";
import BtnTable from "../../public-component/JSONTable/BtnTable";
function GestionarRepresentante() {
    const jsonData = [
        { id: 1, nombre: 'Ejemplo 1', edad: 30 },
        { id: 2, nombre: 'Ejemplo 2', edad: 25 },
        { id: 3, nombre: 'Ejemplo 3', edad: 40 },
      ];

    return (
        <div>
            <CardComponent titulo={"Gestion de representantes"}>
                <div className="p-3 mb-2 bg-info text-white">Gestion de representante</div>
            </CardComponent>
         <SimpleTable dataJson={jsonData}></SimpleTable>
            <BtnTable dataJson={jsonData}></BtnTable>
        </div>

    )
}

export default GestionarRepresentante;