//Row data es la info de la fila
//Header es el nombre de las columnas del JSON
import TableCell from "./TableCell";
function TableRow({ rowData, headers, index }) {
    return (
        //Se recorren los headers que se entregan para completar los datos
        <div>
            {headers.map(header => (
                <TableCell key={header}>
                    {/*Se llena la celda con el dato correspondiente*/}
                    {rowData[header]}
                </TableCell>
            ))}
        </div>

    );
}

export default TableRow;