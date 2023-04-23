import {ReactElement} from "react";
import "./Page.scss";

const Page = ({children}: {children: ReactElement}) => {
    return (
        <main className="content">
            {children}
        </main>
    )
}

export default Page;