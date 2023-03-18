import Transaction from "../helpers/models";
import Table from "../common/Table";
import React, {useMemo} from "react";
import transactions from "./Transactions";

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
            Cell: (tableProps: { row: { index: number; }; }) => (
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
            accessor: 'price'
        }
    ], [data]);

    const submitTransactions = () => {
        console.log("DATA:" + data);
    }

    return (
        <div>
            <Table
                columns={columns}
                data={data}
            />
            <button type="button" onClick={submitTransactions}>Submit</button>
        </div>
    )
}

export default TransactionsList;