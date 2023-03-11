import './App.scss'
import {useEffect, useState} from "react";
import {getResource} from "./config";
import TransactionsForm from "./components/Transactions/TransactionsForm";
import Transaction from "./components/helpers/Models";

const App = () => {
  const [transactions, setTransactions] = useState<Transaction[] | undefined>(undefined);

  useEffect(() => {
    getResource("/transactions", setTransactions);
  }, []);

  console.log(transactions)

  return (
    <div>
      <TransactionsForm />
    </div>
  )
}

export default App;
