import CardComponent from "../../public-component/Card/CardComponent";
import SimpleTable from "../../public-component/JSONTable/SimpleTable";
import BtnTable from "../../public-component/JSONTable/BtnTable";
function GestionarRepresentante() {
    const jsonData =
    {
        "records": [
            [
                "REP0001",
                "Juan",
                null,
                "Pérez",
                "González",
                "juan.perez@example.com",
                "M",
                "1990-05-15",
                "2024-03-31",
                "1234567890",
                "Calle 123",
                "25",
                "001",
                "1"
            ],
            [
                "DIR0001",
                "Andres",
                null,
                "Pérez",
                "González",
                "Andres.perez@example.com",
                "M",
                "1990-05-15",
                "2024-03-31",
                "1234567890",
                "Calle 123",
                "DIR0001",
                "001",
                "1"
            ]
        ],
        "fields": [
            {
                "name": "K_COD_REPRESENTANTE",
                "type": "OTHER"
            },
            {
                "name": "N_PRIMER_NOMBRE",
                "type": "OTHER"
            },
            {
                "name": "N_SEGUNDO_NOMBRE",
                "type": "OTHER"
            },
            {
                "name": "N_PRIMER_APELLIDO",
                "type": "OTHER"
            },
            {
                "name": "N_SEGUNDO_APELLIDO",
                "type": "OTHER"
            },
            {
                "name": "O_EMAIL",
                "type": "OTHER"
            },
            {
                "name": "I_GENERO",
                "type": "CHAR"
            },
            {
                "name": "F_NACIMIENTO",
                "type": "DATE"
            },
            {
                "name": "F_CONTRATO",
                "type": "DATE"
            },
            {
                "name": "Q_NUM_TELEFONO",
                "type": "OTHER"
            },
            {
                "name": "O_DIRECCION",
                "type": "OTHER"
            },
            {
                "name": "K_COD_REP_SUP",
                "type": "OTHER"
            },
            {
                "name": "K_COD_CLASIFICACION",
                "type": "OTHER"
            },
            {
                "name": "K_COD_REGION",
                "type": "OTHER"
            }
        ]
    };

    return (
        <div className="container">
            <CardComponent titulo={"Gestion de representantes"}>
                <div className="p-3 mb-2 bg-info text-white">Gestion de representante</div>
            </CardComponent>
            <SimpleTable dataJson={jsonData}></SimpleTable>
            <BtnTable dataJson={jsonData}></BtnTable>
        </div>

    )
}

export default GestionarRepresentante;