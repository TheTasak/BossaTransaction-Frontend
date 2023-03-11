interface Transaction {
    id?: number,
    name: string,
    amount: number,
    price: number,
    t_type: string,
    date: string
}

export default Transaction;