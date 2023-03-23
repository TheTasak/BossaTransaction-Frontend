import {useTable, TableOptions, Column} from "react-table";
import "./Table.scss"
import {useMemo} from "react";

export type TableProps = {
    data: Array<any>;
    columns: Array<any>;
};

function processColumns(columns: Array<any>, data: Array<any>) {
    let columnIndex = 0;
    for (let td in data[0]) {
        if (typeof data[0][td] === "number" && !("Cell" in columns[columnIndex])) {
            columns[columnIndex]["Cell"] = (props: any) => (
                <>{props.value.toLocaleString()}</>
            );
        }
        columnIndex++;
    }
    return columns;
}

const Table = (props: TableProps) => {

    const data = useMemo(() => props.data, [props.data]);
    const columns = useMemo(
        () => processColumns(props.columns, props.data),
        [props.columns, props.data]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable(
        {
            columns,
            data,
        }
    );

    return (
        <table className="custom-table" {...getTableProps()}>
            <thead>
            {
                headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps({
                                    style: {minWidth: column.minWidth, width: column.width},
                                })}>
                                    { column.render('Header') }
                                </th>
                            ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {
                rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {
                                row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps({
                                            style: {
                                                minWidth: cell.column.minWidth,
                                                width: cell.column.width
                                            }
                                        })}>
                                            { cell.render('Cell') }
                                        </td>
                                    )
                                })}
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default Table;