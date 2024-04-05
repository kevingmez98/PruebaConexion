//Ejemplo de una tabla que involucra un boton

import React from 'react';
import TableHeader from './Part/TableHeader';
import TableCell from './Part/TableCell';

import Table from 'react-bootstrap/Table';

function BtnTable({ dataJson }) {

      // Si no hay datos
      if (!dataJson || !dataJson.records||!dataJson.fields) {
        return <p>No hay datos.</p>;
    }

     // En records estarán los datos consultados, en fields lo nombres de los campo
    const {records, fields} = dataJson;

    return (
            <Table responsive striped bordered hover variant="dark">
                <TableHeader headers={fields} extraHeaders={['Accion']}></TableHeader>
                <tbody>
                    {/* Se generan los datos de la tabla */}

                    {records.map((record, index) => (
                        <tr key={`t-${index}`}>
                            {/* Iterar sobre las claves y mostrar el valor */}
                            {record.map((value, idx) => (
                                /*El react fragment permite envolver elementos sin agregar cosas al DOM
                                    Acá no es tan necesario pero lo dejo ya que es la tabla de ejemplo
                                */
                                <React.Fragment key={`c-${index}-${idx}`}>
                                    <TableCell>{value}</TableCell>
                                </React.Fragment>
                            ))}
                            <TableCell>
                                <button className='btn btn-info'>Acción</button>
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </Table>
    );
}

export default BtnTable;