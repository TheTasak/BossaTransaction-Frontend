import {useEffect, useState} from "react";
import Transaction from "../helpers/models";
import {getResource} from "../../config";
import {calculateCurrentShares, WalletShare} from "../helpers/calculate";
import './Dashboard.scss';

import {ResponsiveTreeMap} from '@nivo/treemap';


const Dashboard = () => {
    const [transactions, setTransactions] = useState<Transaction[] | undefined>(undefined);
    const [shares, setShares] = useState<WalletShare[] | undefined>(undefined);

    useEffect(() => {
        getResource("/transactions", setTransactions);
    }, []);

    useEffect(() => {
        if (transactions !== undefined) {
            setShares(calculateCurrentShares(transactions));
            console.log(shares);
        }
    }, [transactions]);

    return (
        <div className="dashboard">
            {
                shares !== undefined &&
                <ResponsiveTreeMap
                    data={shares}
                    identity="name"
                    value="totalPrice"
                    valueFormat=".02s"
                    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                    labelSkipSize={12}
                    labelTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                1.2
                            ]
                        ]
                    }}
                    parentLabelPosition="left"
                    parentLabelTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                2
                            ]
                        ]
                    }}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.1
                            ]
                        ]
                    }}
                />
            }

        </div>
    )
}

export default Dashboard;