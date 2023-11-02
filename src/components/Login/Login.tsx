import React, {useState} from "react";
import { UserToken, AuthContext, AuthContextType} from '../../auth/AuthProvider';
import "./Login.scss";
import ButtonMain from "../common/ButtonMain";
import CSRFToken from "../../auth/CSRFToken";
import axios from 'axios';

type Credentials = {
    username: string|null;
    password: string|null;
}
async function getToken(credentials: Credentials): Promise<UserToken> {
    return axios.post(
        "/api/login",
        {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': CSRFToken(document.cookie)
            },
            username: credentials.username,
            password: credentials.password
        }
    ).then(data => data.data);
}

const Login = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [errors, setErrors] = useState<string | null>(null);
    const { login } = React.useContext(AuthContext) as AuthContextType;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = await getToken({
            username,
            password
        });
        console.log(token.errors)
        if (token.errors?.length > 0) {
            setErrors(token.errors[0]);
            return;
        }
        login(token);
    }

    return (
        <div className="login-wrapper">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Username</label>
                    <input type="text" onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </div>
                {
                    errors &&
                    <div className="input-group error">
                        {errors}
                    </div>
                }
                <div className="input-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login;