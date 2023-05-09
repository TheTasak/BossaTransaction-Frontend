import {useEffect, useState} from "react";
import Transaction from "../helpers/models";
import {getResource} from "../../config";
import {calculateCurrentShares, WalletShare} from "../helpers/calculate";
import './Dashboard.scss';
import Tooltip from "../common/Tooltip";

import {ResponsiveTreeMap} from '@nivo/treemap';
import Table from "../common/Table";


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
                shares !== undefined && (
                    <div className="widget-simple">
                        {shares.map(share => <div key={share.name}>{share.name + " " + share.shares}</div>)}
                    </div>
                )
            }
            {
                shares !== undefined && (
                    <div className="chart-div">
                        <ResponsiveTreeMap
                            data={
                                {
                                    name: "root",
                                    children: shares
                                }
                            }
                            theme={
                                {
                                    fontSize: 20
                                }
                            }
                            tooltip={(e) => <Tooltip name={e.node.label} value={e.node.formattedValue} color={e.node.color}/>}
                            identity="name"
                            leavesOnly={true}
                            value="totalPrice"
                            valueFormat=">-.02s"
                            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                            label="id"
                            labelSkipSize={12}
                            parentLabelPosition="left"
                        />
                        <ResponsiveTreeMap
                            data={
                                {
                                    name: "root",
                                    children: shares
                                }
                            }
                            theme={
                                {
                                    fontSize: 20
                                }
                            }
                            tooltip={(e) => <Tooltip name={e.node.label} value={e.node.formattedValue} color={e.node.color}/>}
                            identity="name"
                            leavesOnly={true}
                            value="earnings"
                            valueFormat=">-.02s"
                            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                            label="id"
                            labelSkipSize={12}
                            parentLabelPosition="left"
                        />
                    </div>
                )
            }

        </div>
    )
}

export default Dashboard;