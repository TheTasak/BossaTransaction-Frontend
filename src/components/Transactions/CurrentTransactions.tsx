import React, {useEffect, useMemo, useState} from "react";
import Transaction from "../helpers/models";
import {deleteResource, getResource} from "../../config";
import Table from "../common/Table";
import {useNavigate} from "react-router-dom";
import {sortTransactionsByDate} from "../helpers/calculate";

const CurrentTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[] | undefined>(undefined);
    const [actionsSelect, setActionsSelect] = useState<string | undefined>(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        getResource("/transactions", (data : Transaction[]) => {
            setTransactions(sortTransactionsByDate(data));
        });
    }, []);

    const deleteTransaction = (id : number) => {
        deleteResource(`/transactions/${id}`);
        const variableIndex = transactions?.filter(variable => !variable.omit).findIndex(transaction => transaction.id === id);
        const variable = transactions?.filter(variable => !variable.omit).find(transaction => transaction.id === id);

        if (variableIndex !== undefined && variable !== undefined) {
            variable.omit = true;
            transactions?.filter(variable => !variable.omit).splice(variableIndex, 1, variable);
            setTransactions(transactions => transactions?.filter(variable => !variable.omit));
        }
    }

    const columns = useMemo( () => [
        {
            Header: 'Date',
            accessor: 'date',
            sortType: 'basic'
        },
        {
            Header: 'Name',
            accessor: 'name',
            sortType: 'basic'
        },
        {
            Header: 'Type',
            accessor: 't_type',
            sortType: 'basic'
        },
        {
            Header: 'Amount',
            accessor: 'amount',
            sortType: 'basic'
        },
        {
            Header: 'Price',
            accessor: 'price',
            sortType: 'basic',
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
                                <button type="button" onClick={() => navigate(`/transaction/${tableProps.row.original.id}`)}>
                                    Edit
                                </button>
                                <button type="button" onClick={() => deleteTransaction(tableProps.row.original.id)}>
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
            <button type="button" onClick={() => navigate("/transaction")}>Add a New Transaction</button>
        </div>
    )
}

export default CurrentTransactions;