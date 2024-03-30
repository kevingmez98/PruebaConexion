import React from 'react';
function JsonTableComp({ dataJson }) {

    // Si no hay datos
    if (!dataJson || dataJson.length === 0) {
        return <p>No hay datos.</p>;
    }

    // Claves del primer objeto del JSON para usarlas como encabezados de la tabla
    const headers = Object.keys(dataJson[0]);

    return (
        <table>
            <thead>
                <tr>
                    {/*Se iteran los headers para los encabezados de la tabla*/}
                    {headers.map(header => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {/* Se generan los datos de la tabla */}
                {dataJson.map((item, index) => (
                    <tr key={index}>
                        {/* Iterar sobre las claves y mostrar el valor */}
                        {headers.map(header => (
                            <td key={header}>{item[header]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default JsonTableComp;