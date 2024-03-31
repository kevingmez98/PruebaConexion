//Componente para las headers de una tabla
//Header es el nombre de las columnas del JSON
//extraHeaders es una lista de headers extra que se quieran colocar
function TableHeader({ headers, extraHeaders }) {
    return (
        <thead>
            <tr>
                {/*Se iteran los headers para los encabezados de la tabla*/}
                {headers.map(header => (
                    <th key={header}>{header}</th>
                ))}
                {/*Se iteran los headers extra para los encabezados de la tabla*/}
                {extraHeaders.map(header => (
                    <th key={header}>{header}</th>
                ))}
            </tr>
        </thead> 

    );
}

export default TableHeader;