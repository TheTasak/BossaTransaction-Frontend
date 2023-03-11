import './TransactionsForm.scss';
import Transaction from "../helpers/Models";
import {useState} from "react";
import {createResource} from "../../config";

const emptyTransaction: Transaction = {
    name: "",
    amount: 0,
    price: 0,
    t_type: "",
    date: ""
};

const TransactionsForm = () => {
    const [transactionData, setTransactionData] = useState<Transaction>(emptyTransaction);

    const sendData = () => {
        const response = createResource("/transactions", transactionData);
        console.log(response);
        setTransactionData(emptyTransaction);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTransactionData({...transactionData, [event.target.name]: event.target.value});
        console.log(transactionData)
    }
    return (
        <div className="transactions-form">
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
            <div>
                <button type="button" onClick={sendData}>Submit</button>
            </div>
        </div>
    )
}

export default TransactionsForm;