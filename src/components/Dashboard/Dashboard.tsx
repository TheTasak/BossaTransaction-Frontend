import {useEffect, useState} from "react";
import Transaction from "../helpers/models";
import {getResource} from "../../config";
import {calculateCurrentShares} from "../helpers/calculate";


const Dashboard = () => {
    const [transactions, setTransactions] = useState<Transaction[] | undefined>(undefined);

    useEffect(() => {
        getResource("/transactions", setTransactions);
    }, []);

    if (transactions !== undefined) {
        calculateCurrentShares(transactions);
    }

    return (
        <div>

        </div>
    )
}

export default Dashboard;