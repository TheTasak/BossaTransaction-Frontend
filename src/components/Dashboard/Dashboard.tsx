import {useEffect, useState} from "react";
import Transaction from "../helpers/models";
import {getResource} from "../../config";
import {calculateCurrentShares, WalletShare} from "../helpers/calculate";
import './Dashboard.scss';
import Tooltip from "../common/Tooltip";
import {layoutObject, loadLayout} from "../helpers/layout";

import {ResponsiveTreeMap} from '@nivo/treemap';
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;


const Dashboard = () => {
    const [transactions, setTransactions] = useState<Transaction[] | undefined>(undefined);
    const [shares, setShares] = useState<WalletShare[] | undefined>(undefined);
    const [layout, setLayout] = useState<JSX.Element[] | undefined>(undefined);

    useEffect(() => {
        getResource("/transactions", setTransactions);
    }, []);

    const layoutObject : layoutObject = {
        widgets: [
            {
                id: 1,
                name: 'basic',
                column: 2,
                row: 1,
                width: 1,
                height: 1,
                backgroundColor: "white",
                properties: {
                    test: 'test'
                }
            }
        ],
        columns: 2,
        rows: 2,
    };

    useEffect(() => {
        if (transactions !== undefined) {
            setShares(calculateCurrentShares(transactions));
            console.log(shares);
            setLayout(loadLayout(layoutObject))
        }
    }, [transactions]);

    return (
        <div className="dashboard">
            {
                layout !== undefined && (
                    layout
                )
            }
            {/*{*/}
            {/*    shares !== undefined && (*/}
            {/*        <div className="widget-simple">*/}
            {/*            {shares.map(share => <div key={share.name}>{share.name + " " + share.shares}</div>)}*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*}*/}
            {/*{*/}
            {/*    shares !== undefined && (*/}
            {/*        <div className="chart-div">*/}
            {/*            <ResponsiveTreeMap*/}
            {/*                data={*/}
            {/*                    {*/}
            {/*                        name: "root",*/}
            {/*                        children: shares*/}
            {/*                    }*/}
            {/*                }*/}
            {/*                theme={*/}
            {/*                    {*/}
            {/*                        fontSize: 20*/}
            {/*                    }*/}
            {/*                }*/}
            {/*                tooltip={(e) => <Tooltip name={e.node.label} value={e.node.formattedValue} color={e.node.color}/>}*/}
            {/*                identity="name"*/}
            {/*                leavesOnly={true}*/}
            {/*                value="totalPrice"*/}
            {/*                valueFormat=">-.02s"*/}
            {/*                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}*/}
            {/*                label="id"*/}
            {/*                labelSkipSize={12}*/}
            {/*                parentLabelPosition="left"*/}
            {/*            />*/}
            {/*            <ResponsiveTreeMap*/}
            {/*                data={*/}
            {/*                    {*/}
            {/*                        name: "root",*/}
            {/*                        children: shares*/}
            {/*                    }*/}
            {/*                }*/}
            {/*                theme={*/}
            {/*                    {*/}
            {/*                        fontSize: 20*/}
            {/*                    }*/}
            {/*                }*/}
            {/*                tooltip={(e) => <Tooltip name={e.node.label} value={e.node.formattedValue} color={e.node.color}/>}*/}
            {/*                identity="name"*/}
            {/*                leavesOnly={true}*/}
            {/*                value="earnings"*/}
            {/*                valueFormat=">-.02s"*/}
            {/*                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}*/}
            {/*                label="id"*/}
            {/*                labelSkipSize={12}*/}
            {/*                parentLabelPosition="left"*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*}*/}

        </div>
    )
}

export default Dashboard;