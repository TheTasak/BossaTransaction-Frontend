import React, {useEffect, useMemo, useState} from "react";
import Transaction from "../helpers/models";
import {getResource} from "../../config";
import Table from "../common/Table";
import {useNavigate} from "react-router-dom";

const CurrentTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[] | undefined>(undefined);
    const [actionsSelect, setActionsSelect] = useState<string | undefined>(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        getResource("/transactions", setTransactions);
    }, []);

    const columns = useMemo( () => [
        {
            Header: 'Date',
            accessor: 'date',
        },
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Type',
            accessor: 't_type'
        },
        {
            Header: 'Amount',
            accessor: 'amount'
        },
        {
            Header: 'Price',
            accessor: 'price',
            Cell: (tableProps: { row: { values: { price: number; }; }; }) => (
                <div>
                    {Number(tableProps.row.values.price).toFixed(2)}
                </div>
            )
        },
        {
            Header: '',
            accessor: 'id',
            width: 5,
            Cell: (tableProps: { row: { index: string; original: { id: any; }; }; }) => (
                <div className="dropdown">
                    <div
                        id={"button" + tableProps.row.index}
                        className="dropdown-button"
                        onClick={() => setActionsSelect(tableProps.row.index)}
                        onBlur={() => setActionsSelect(undefined)}
                    >
                        click
                    </div>
                    {
                        actionsSelect === tableProps.row.index &&
                        (
                            <div className="dropdown-content" onMouseLeave={() => setActionsSelect(undefined)}>
                                <button type="button" onClick={() => navigate(`/transactions/load`)}>
                                    Edit
                                </button>
                                <button type="button" onClick={() => navigate(`/transactions/load`)}>
                                    Delete
                                </button>
                            </div>
                        )
                    }
                </div>
            )
        }
    ], [transactions, actionsSelect]);

    return (
        <div className="transactions-list">
            {
                transactions !== undefined &&
                <Table
                    columns={columns}
                    data={transactions}
                />
            }
        </div>
    )
}

export default CurrentTransactions;