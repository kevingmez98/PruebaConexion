import React from 'react';
import Table from 'react-bootstrap/Table';
import TableHeader from './Part/TableHeader';
import TableCell from './Part/TableCell';

function SimpleTable({ dataJson }) {

    //Los elementos que se coloquen en la etiqueta deben ser CustomComp, dentro de estos estarán los elementos que se quieren agregar a la tabla

    // Si no hay datos
    if (!dataJson || dataJson.length === 0) {
        return <p>No hay datos.</p>;
    }

    // Claves del primer objeto del JSON para usarlas como encabezados de la tabla
    const headers = Object.keys(dataJson[0]);

    return (
            <Table responsive striped>
                <TableHeader headers={headers} extraHeaders={[]}></TableHeader>
                <tbody>
                    {/* Se generan los datos de la tabla */}
                    {dataJson.map((item, index) => (
                        <tr key={`t-${index}`}>
                            {/* Iterar sobre las claves y mostrar el valor */}
                            {headers.map(header => (
                                    <TableCell key={`t-${header}-${index}`}>{item[header]}</TableCell>
                                ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
    );
}

export default SimpleTable;