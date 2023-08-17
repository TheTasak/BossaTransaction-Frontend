import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Page from './Page';
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../auth/AuthProvider";

const HomeLayout = () => {
    const auth = useAuth();

    if (auth && auth?.token) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Page>
                <Outlet />
            </Page>
        </div>
    )
}

export default HomeLayout;