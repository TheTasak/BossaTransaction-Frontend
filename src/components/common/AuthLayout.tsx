import {Outlet} from "react-router-dom";
import {AuthProvider} from "../../auth/AuthProvider";


const AuthLayout = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    )
}

export default AuthLayout;