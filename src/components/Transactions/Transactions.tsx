import TransactionsForm from "./TransactionsForm";
import {useState} from "react";
import {csvToArray} from "../helpers/helpers";


const Transactions = () => {
    const [fileContent, setFileContent] = useState("");
    const handleFileChange = (e: { target: { files: any; }; }) => {
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
            const inputFileExtension = inputFile?.type.split("/")[1];
            if (inputFileExtension !== ".csv") {
                console.error("The file is not a csv file!");
                return;
            }
            parseFile(inputFile);
        }
    }
    const parseFile = (file: Blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result;
            const data = csvToArray(text, ",");
            setFileContent(data);
        }
        reader.readAsText(file);
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} name="file" id="file" />
            <TransactionsForm />
        </div>
    )
}

export default Transactions;

