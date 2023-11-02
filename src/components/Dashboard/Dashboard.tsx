import React, {useEffect, useState} from "react";
import Transaction from "../helpers/models";
import {getResource, updateResource} from "../../config";
import {calculateCurrentShares, sortTransactionsByDate, WalletShare} from "../helpers/calculate";
import './Dashboard.scss';
import {exportLayoutObject, layoutObject, loadLayout} from "../helpers/layout";

import ButtonMain from "../common/ButtonMain";

import {LayoutContext, LayoutContextType} from "./LayoutProvider";


const Dashboard = () => {
    const id = 1; //TEMPORARY !!!

    const [transactions, setTransactions] = useState<Transaction[] | undefined>(undefined);
    const [shares, setShares] = useState<WalletShare[] | undefined>(undefined);
    const [layout, setLayout] = useState<JSX.Element[] | undefined>(undefined);

    const {layoutObject} = React.useContext(LayoutContext) as LayoutContextType;

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
    }, [transactions, layoutObject]);

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