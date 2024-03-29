import './TransactionsForm.scss';
import Transaction, {emptyTransaction} from "../helpers/models";
import React, {useEffect, useState} from "react";
import {createResource, getResource, updateResource} from "../../config";
import {useNavigate, useParams} from "react-router-dom";
import ButtonMain from "../common/ButtonMain";
import transactions from "./Transactions";


const TransactionsForm = () => {
    const [transactionData, setTransactionData] = useState<Transaction>(emptyTransaction);

    const { id } = useParams();
    const navigate = useNavigate();
    const sendData = () => {
        if (id !== undefined) {
            updateResource(`/transactions/${id}`, transactionData);
        } else {
            createResource("/transactions", transactionData);
        }
        navigate('/transactions');
    }

    const getData = () => {
        if (id !== undefined) {
            getResource(`/transactions/${id}`, setTransactionData);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTransactionData({...transactionData, [event.target.name]: event.target.value});
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="transactions-form">
            <p className="form-header">{ id !== undefined ? "Update transaction" : "Add a new transaction" }</p>
            <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={transactionData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="type">Type</label>
                <input
                    name="t_type"
                    type="text"
                    value={transactionData.t_type}
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="amount">Amount</label>
                <input
                    name="amount"
                    type="text"
                    value={transactionData.amount}
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="price">Price</label>
                <input
                    name="price"
                    type="text"
                    value={transactionData.price}
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="date">Date</label>
                <input
                    name="date"
                    type="text"
                    value={transactionData.date}
                    onChange={handleChange}
                />
            </div>
            <div className="center">
                <ButtonMain text="Submit" onClick={sendData} />
            </div>
        </div>
    )
}

export default TransactionsForm;