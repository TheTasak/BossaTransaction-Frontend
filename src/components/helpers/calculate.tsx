import Transaction from "./models";

class WalletShare {
    transactions : Transaction[];
    shares : number;
    totalPrice : number;

    private calculateShares(): number {
        let shareSum : number = 0;
        this.transactions.map(transaction => {
            if(transaction.t_type === "BUY") {
                shareSum += transaction.amount;
            } else if (transaction.t_type === "SELL") {
                shareSum -= transaction.amount;
            }
        });
        return shareSum;
    }

    private calculateTotalSum(): number {
        let priceSum : number = 0;
        this.transactions.map(transaction => {
            if(transaction.t_type === "BUY") {
                priceSum += transaction.price * transaction.amount;
            } else if (transaction.t_type === "SELL") {
                priceSum -= transaction.price * transaction.amount;
            }
        });
        return priceSum;
    }

    getAveragePrice(): string {
        return (this.totalPrice / this.shares).toFixed(2);
    }
    constructor(transactions : Transaction[]) {
        this.transactions = transactions;
        this.shares = this.calculateShares();
        this.totalPrice = this.calculateTotalSum();
    }

}

export const calculateCurrentShares = (data: Transaction[]) => {
    let sortedTransactions = data.filter(transaction => transaction.t_type === "BUY" || transaction.t_type === "SELL").sort((a,b) => {
        const dateA : Date = new Date(a.date);
        const dateB : Date = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    });

    console.log(data);

    let transactionShares = sortedTransactions.map(transaction => transaction.name).filter((value, index, array) => array.indexOf(value) === index);
    let shares : WalletShare[] = [];

    transactionShares?.map(shareName => {
        let share : WalletShare = new WalletShare(sortedTransactions?.filter(transaction => transaction.name === shareName));
        shares.push(share);
        console.log(shareName + " " + share.shares)
    });
}