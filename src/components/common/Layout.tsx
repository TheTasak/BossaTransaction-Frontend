import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Page from './Page';
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Header />
            <Page>
                <Outlet />
            </Page>
            <Footer />
        </div>
    )
}

export default Layout;