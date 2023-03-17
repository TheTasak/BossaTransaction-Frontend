interface Transaction {
    id?: number,
    name: string,
    amount: number,
    price: number,
    t_type: string,
    date: string
}

export const emptyTransaction = {
    name: "",
    amount: 0,
    price: 0,
    t_type: "",
    date: "",
}

export default Transaction;