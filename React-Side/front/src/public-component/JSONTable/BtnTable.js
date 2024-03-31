//Ejemplo de una tabla que involucra un boton

import React from 'react';
import TableHeader from './Part/TableHeader';
import TableCell from './Part/TableCell';

import Table from 'react-bootstrap/Table';

function BtnTable({ dataJson }) {

    //Los elementos que se coloquen en la etiqueta deben ser CustomComp, dentro de estos estarán los elementos que se quieren agregar a la tabla

    // Si no hay datos
    if (!dataJson || dataJson.length === 0) {
        return <p>No hay datos.</p>;
    }

    // Claves del primer objeto del JSON para usarlas como encabezados de la tabla
    const headers = Object.keys(dataJson[0]);

    return (
            <Table responsive striped bordered hover variant="dark">
                <TableHeader headers={headers} extraHeaders={['Accion']}></TableHeader>
                <tbody>
                    {/* Se generan los datos de la tabla */}
                    {dataJson.map((item, index) => (
                        <tr key={`t-${index}`}>
                            {/* Iterar sobre las claves y mostrar el valor */}
                            {headers.map(header => (
                                /*El react fragment permite envolver elementos sin agregar cosas al DOM
                                    Acá no es tan necesario pero lo dejo ya que es la tabla de ejemplo
                                */
                                <React.Fragment key={`t-${header}-${index}`}>
                                    <TableCell>{item[header]}</TableCell>
                                </React.Fragment>
                            ))}
                            <TableCell>
                                <button className='btn btn-info'>Ola</button>
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </Table>
    );
}

export default BtnTable;