import {useEffect, useState} from "react";
import Transaction from "../helpers/models";
import {getResource, updateResource} from "../../config";
import {calculateCurrentShares, sortTransactionsByDate, WalletShare} from "../helpers/calculate";
import './Dashboard.scss';
import Tooltip from "../common/Tooltip";
import {exportLayoutObject, layoutObject, loadLayout} from "../helpers/layout";

import {ResponsiveTreeMap} from '@nivo/treemap';
import {Simulate} from "react-dom/test-utils";
import ButtonMain from "../common/ButtonMain";


const Dashboard = () => {
    const id = 1; //TEMPORARY !!!

    const [transactions, setTransactions] = useState<Transaction[] | undefined>(undefined);
    const [shares, setShares] = useState<WalletShare[] | undefined>(undefined);
    const [layout, setLayout] = useState<JSX.Element[] | undefined>(undefined);
    const [layoutObject, setLayoutObject] = useState<layoutObject | undefined>({
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
        columns: 3,
        rows: 3,
    });

    useEffect(() => {
        getResource("/transactions", (data : Transaction[]) => {
            setTransactions(sortTransactionsByDate(data));
        });
        getResource("/layouts", (data: any) => console.log(data));
    }, []);

    useEffect(() => {
        if (transactions !== undefined) {
            setShares(calculateCurrentShares(transactions));
            console.log(shares);
            if(layoutObject !== undefined) {
                setLayout(loadLayout(layoutObject))
            }
        }
    }, [transactions]);

    const saveLayout = () => {
        if(layoutObject !== undefined) {
            const stringifyLayout = exportLayoutObject(layoutObject);
            updateResource(`/layout/${id}`, {content: stringifyLayout}, () => {
                console.log('successful update')
            });
        }
    }

    return (
        <div>
            <div
                className="dashboard"
                style={{
                    gridTemplateColumns: `repeat(${ layoutObject !== undefined ? layoutObject.columns : 1}, 1fr)`,
                    gridTemplateRows: `repeat(${ layoutObject !== undefined ? layoutObject.rows : 1}, 1fr)`
                }}
            >
                {
                    layout !== undefined && (
                        layout
                    )
                }
            </div>
            <ButtonMain text="Save Layout" onClick={saveLayout} />
        </div>
    )
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
}

export default Dashboard;