import Transaction from "./models";

export class WalletShare {
    name : string;
    transactions : Transaction[];
    shares : number;
    totalPrice : number;
    earnings : number;

    private calculateShares(year?: number): number {
        let shareSum : number = 0;
        this.transactions.filter(transaction => (year !== undefined && new Date(transaction.date).getFullYear() > year) || year === undefined).map(transaction => {
            if (transaction.t_type === "BUY") {
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
            if (transaction.t_type === "BUY") {
                priceSum += transaction.price * transaction.amount;
            } else if (transaction.t_type === "SELL") {
                priceSum -= transaction.price * transaction.amount;
            }
        });
        return priceSum;
    }

    private calculateEarnings(year?: number): number {
        let earningsSum : number = 0;
        let transactionShares : Transaction[] = structuredClone(this.transactions);

        this.transactions.filter(transaction => transaction.t_type === "SELL").map(transaction => {
            let currentSharesAbleToSell = transactionShares.filter(transaction => transaction.t_type === "BUY" && transaction.amount > 0);
            let sharesToSell : number = transaction.amount;
            let i : number = 0;
            while (sharesToSell > 0) {
                if (currentSharesAbleToSell[i] !== undefined) {
                    const transactionYear = new Date(transaction.date).getFullYear();

                    if (currentSharesAbleToSell[i].amount >= sharesToSell) {
                        if ((year !== undefined && year === transactionYear) || year === undefined) {
                            earningsSum += (currentSharesAbleToSell[i].price * sharesToSell) - (transaction.price * sharesToSell);
                        }
                        currentSharesAbleToSell[i].amount -= sharesToSell;
                        sharesToSell = 0;
                        break;
                    } else {
                        if ((year !== undefined && year === transactionYear) || year === undefined) {
                            earningsSum += (currentSharesAbleToSell[i].price * currentSharesAbleToSell[i].amount) - (transaction.price * currentSharesAbleToSell[i].amount);
                        }
                        sharesToSell -= currentSharesAbleToSell[i].amount;
                        currentSharesAbleToSell[i].amount = 0;
                    }
                } else {
                    break;
                }
                i++;
            }
        });


        return earningsSum;
    }

    getAveragePrice(): number {
        return parseFloat((this.totalPrice / this.shares).toFixed(2));
    }

    getEarningsByCurrentPrice(price: number): number {
        return parseFloat((this.shares * price - this.shares * this.getAveragePrice()).toFixed(2));
    }

    constructor(transactions : Transaction[]) {
        this.name = transactions[0].name;
        this.transactions = [...transactions];
        this.shares = this.calculateShares();
        this.totalPrice = this.calculateTotalSum();
        this.earnings = this.calculateEarnings();
    }

}

export const calculateCurrentShares = (data: Transaction[]) : WalletShare[] => {
    let sortedTransactions = data.filter(transaction => transaction.t_type === "BUY" || transaction.t_type === "SELL").sort((a,b) => {
        const dateA : Date = new Date(a.date);
        const dateB : Date = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    });

    let transactionShares = sortedTransactions.map(transaction => transaction.name).filter((value, index, array) => array.indexOf(value) === index);
    let shares : WalletShare[] = [];

    transactionShares?.map(shareName => {
        let share : WalletShare = new WalletShare(sortedTransactions?.filter(transaction => transaction.name === shareName));
        shares.push(share);
    });

    return shares;
}