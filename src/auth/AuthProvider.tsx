import React, {createContext, ReactElement, useContext, useMemo} from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";


export type AuthContextType = {
    token: string;
    login: (token: UserToken) => void;
    logout: () => void;
};

export type UserToken = {
    id: bigint;
    passwordDigest: string;
    username: string;
    errors?: any;
    updatedAt?: string;
    createdAt?: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
    const [token, setToken] = useLocalStorage("token", "");
    const navigate = useNavigate();

    const login = async (token: UserToken) => {
        setToken(token);
        navigate("/");
    };

    const logout = () => {
        setToken(null);
        navigate("/login", { replace: true });
    };

    const value = useMemo(
        () => ({
            token,
            login,
            logout
        }),
        [token]
    );
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext);
}