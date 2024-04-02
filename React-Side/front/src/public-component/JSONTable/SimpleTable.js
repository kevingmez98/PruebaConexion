import React from 'react';
import Table from 'react-bootstrap/Table';
import TableHeader from './Part/TableHeader';
import TableCell from './Part/TableCell';

function SimpleTable({ dataJson }) {
    console.log("banana "+dataJson);
    // Si no hay datos
    if (!dataJson || !dataJson.records||!dataJson.fields) {
        return <p>No hay datos.</p>;
    }

    // En records estarán los datos consultados, en fields lo nombres de los campos
    const {records, fields} = dataJson;

    return (
            <Table responsive striped>
                <TableHeader headers={fields}></TableHeader>
                <tbody>
                    {/* Se generan los datos de la tabla */}
                    {records.map((record, index) => (
                        <tr key={`t-${index}`}>
                            {/* Iterar sobre las claves y mostrar el valor */}
                            {record.map((value, idx) => (
                                    <TableCell key={`c-${index}-${idx}`}>{value}</TableCell>
                                ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
    );
}

export default SimpleTable;