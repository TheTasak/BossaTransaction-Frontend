import Transaction from "./models";
import Transactions from "../Transactions/Transactions";

export interface resourceParams {
    [key: string|number]: string
}

export const csvToArray = (str: string, delimiter: string) => {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const array = rows.map(row => {
       const values = row.split(delimiter) ;
       const elements = headers.reduce((object : resourceParams, header, index) => {
           object[header] = values[index];
           return object;
       }, {});
       return elements;
    });

    return array.filter(el => el.data);
}

export const transformTransactionArray = (data : resourceParams[]) : Transaction[] => {
    const array : Transaction[] = data.map( transaction => {
        let obj : Transaction = {
            name: "",
            amount: 0,
            price: 0,
            t_type: "",
            date: transaction.data
        };
        if (transaction["tytuł operacji"].search("sprzedaży") !== -1) {
            const details = transaction["szczegóły"].split(" ");
            obj.t_type = "SELL";
            obj.name = details[0];
            obj.amount = parseInt(details[1]);
            obj.price = parseFloat(details[3]);
        } else if (transaction["tytuł operacji"].search("kupna") !== -1) {
            const details = transaction["szczegóły"].split(" ");
            obj.t_type = "BUY";
            obj.name = details[0];
            obj.amount = parseInt(details[1]);
            obj.price = parseFloat(details[3]);
        } else if (transaction["tytuł operacji"].search("dywidendy") !== -1) {
            obj.t_type = "DIVIDEND";
            obj.name = transaction["tytuł operacji"].substring(transaction["tytuł operacji"].lastIndexOf(" ")+1);
            obj.amount = 0;
            obj.price = parseFloat(transaction["kwota"].replace(",", "."));
        } else {
            obj.t_type = "NOT SUPPORTED";
        }
        return obj;
    });

    return array.filter(data => data.t_type !== "NOT SUPPORTED");
}