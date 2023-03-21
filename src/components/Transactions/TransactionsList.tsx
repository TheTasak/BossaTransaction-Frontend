import Transaction from "../helpers/models";
import Table from "../common/Table";
import React, {useMemo} from "react";
import './TransactionList.scss';
import {createResources} from "../../config";

const uniqueId = (transaction : Transaction) : string => {
    return transaction.amount.toString() + transaction.price.toString() + Date.now();
}
const TransactionsList = ({data}: {data: Transaction[]}) => {
    const changeOmitItem = (index: number) => {
        data[index].omit = !data[index].omit;
    }

    const columns = useMemo( () => [
        {
            Header: '',
            accessor: 'id',
            width: 10,
            Cell: (tableProps: { row: { values: any; index: number; }; }) => (
                <div>
                    <input type="checkbox" defaultChecked={!data[tableProps.row.index].omit} onChange={() => changeOmitItem(tableProps.row.index)}/>
                </div>
            )
        },
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
                    {tableProps.row.values.price.toFixed(2)}
                </div>
            )
        }
    ], [data]);

    const submitTransactions = () => {
        const submitData = data.filter(transaction => !transaction.omit);
        const response = createResources("/transactions", submitData);
        console.log(response);
    }

    return (
        <div className="transactions-list">
            <Table
                columns={columns}
                data={data}
            />
            <button type="button" onClick={submitTransactions}>Submit</button>
        </div>
    )
}

export default TransactionsList;