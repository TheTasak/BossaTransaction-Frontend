import {useTable, usePagination, useFilters} from "react-table";
import "./Table.scss"
import {useEffect} from "react";
import {resourceParams} from "../helpers/helpers";
import Transaction from "../helpers/models";

const Table = ({columns, data, pagination, action, setDataPerPage}: {columns: resourceParams[], data: Transaction[], pagination?: boolean, action?: string, setDataPerPage?: number}) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        setPageSize,
        setFilter,
        state: {pageSize},
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0},
        },
        useFilters,
        usePagination,
    )

    useEffect(() => {
        if (action) {
            setFilter("action", action);
        }
    }, [action]);

    return (
        <>
            {pagination &&
                <div className="search-bar-container">
                    <input
                        className="search-bar"
                        placeholder="Search by action"
                        onChange={(e) => setFilter("action", e.target.value)}
                    />
                </div>
            }
            <table {...getTableProps()}>
                <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
                                        {
                                            column.render('Header')}
                                    </th>
                                ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {
                    pagination ?
                        page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })
                        :
                        rows.map((row) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return (
                                                <td {...cell.getCellProps({
                                                    className: cell.column.className
                                                })}>
                                                    {
                                                        cell.render('Cell')}
                                                </td>
                                            )
                                        })}
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            {pagination && <div className="pagination">
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value));
                        setDataPerPage(Number(e.target.value))
                    }}
                >
                    {[5, 10, 20, 30, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
            </div>}
        </>
    )
}

export default Table