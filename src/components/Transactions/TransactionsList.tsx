import Transaction from "../helpers/models";
import Table from "../common/Table";
import {useMemo} from "react";

const uniqueId = (transaction : Transaction) : string => {
    return transaction.amount.toString() + transaction.price.toString() + Date.now();
}
const TransactionsList = ({data}: {data: Transaction[]}) => {
    const tableHeaders = useMemo( () => [
        {
            Header: 'Date',
            accessor: 'date'
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


    return (
        <div>
            <Table
                data={data}
            />
        </div>
    )
}

export default TransactionsList;