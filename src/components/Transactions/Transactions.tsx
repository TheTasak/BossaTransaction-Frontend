import TransactionsForm from "./TransactionsForm";
import {useState} from "react";
import {csvToArray, transformTransactionArray} from "../helpers/helpers";
import Transaction from "../helpers/models";
import TransactionsList from "./TransactionsList";


const Transactions = () => {
    const [fileContent, setFileContent] = useState<Transaction[]>([]);
    const handleFileChange = (e: { target: { files: any; }; }) => {
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
            const inputFileExtension = inputFile?.type.split("/")[1];
            if (inputFileExtension !== "csv") {
                console.error("The file is not a csv file!");
                return;
            }
            parseFile(inputFile);
        }
    }
    const parseFile = (file: Blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            if (text != undefined) {
                const arr = csvToArray(text, ";");
                const transactionArray = transformTransactionArray(arr);
                setFileContent(transactionArray);
            }
        }
        reader.readAsText(file, 'UTF-8');
    }

    console.log(fileContent)

    return (
        <div>
            <input type="file" onChange={handleFileChange} name="file" id="file" />
            { fileContent.length > 0 && <TransactionsList data={fileContent} /> }
        </div>
    )
}

export default Transactions;

