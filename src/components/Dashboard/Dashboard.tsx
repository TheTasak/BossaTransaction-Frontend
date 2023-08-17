import {useEffect, useState} from "react";
import Transaction from "../helpers/models";
import {getResource, updateResource} from "../../config";
import {calculateCurrentShares, sortTransactionsByDate, WalletShare} from "../helpers/calculate";
import './Dashboard.scss';
import {exportLayoutObject, layoutObject, loadLayout} from "../helpers/layout";

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
                column: 1,
                row: 1,
                width: 1,
                height: 1,
                backgroundColor: "black",
                properties: {
                    test: 'test'
                }
            },
            {
                id: 2,
                name: 'basic_chart',
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
            if(shares !== undefined && layoutObject !== undefined) {
                setLayout(loadLayout(layoutObject, shares));
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
}

export default Dashboard;