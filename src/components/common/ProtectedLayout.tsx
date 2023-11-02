import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Page from './Page';
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../auth/AuthProvider";
import React from "react";


const ProtectedLayout = () => {
    const auth = useAuth();

    if (auth == null || auth.token == null) {
        return <Navigate to="/login" />;
    }

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

export default ProtectedLayout;