
import './App.scss'
import {useEffect, useState} from "react";
import {getResource} from "./config";

const App = () => {
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    getResource("/transactions", setTransactions);
  }, []);

  return (
    <div className="App">
    </div>
  )
}

export default App;
