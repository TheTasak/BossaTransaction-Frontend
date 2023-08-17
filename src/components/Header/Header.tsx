import HeaderMain from "./HeaderMain";
import HeaderButton from "./HeaderButton";
import {useNavigate} from "react-router-dom";
import { UserToken, AuthContext, AuthContextType} from '../../auth/AuthProvider';

import "./Header.scss";
import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";

const headerMenuWidthMax = 600;

const Header = () => {

    const navigate = useNavigate();

    const windowRef = useRef(window.innerWidth);

    const [dropdown, setDropdown] = useState(false);
    const [windowWidth, setWindowWidth] = useState(windowRef.current);

    const { logout } = React.useContext(AuthContext) as AuthContextType;

    const handleLogout = async () => {
        const response = await fetch(
            "http://127.0.0.1:3000/logout",
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(data => data);

        if (response && response.ok) {
            logout();
        } else {
            console.error("Couldn't logout user");
        }
    }

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    }, []);

    return (
        <header className="header" >
            <HeaderMain onClick={() => navigate("/")} />
            {
                windowWidth > headerMenuWidthMax && (
                    <>
                        <HeaderButton text="Dashboard" onClick={() => navigate("/")} />
                        <HeaderButton text="Transactions" onClick={() => navigate("/transactions")} />
                        <HeaderButton text="Logout" onClick={() => handleLogout()} />
                    </>
                )
            }
            {
                windowWidth <= headerMenuWidthMax && (
                    <div className="dropdown rightAlign">
                        <div
                            className="dropdown-button"
                            onClick={() => setDropdown(true)}
                            onBlur={() => setDropdown(false)}
                        >
                            <FontAwesomeIcon icon={faCaretDown} color="#fffffff0" />
                        </div>
                        {
                            dropdown &&
                            (
                                <div className="dropdown-content" onMouseLeave={() => setDropdown(false)}>
                                    <button type="button" onClick={() => navigate('/')}>
                                        Dashboard
                                    </button>
                                    <button type="button" onClick={() => navigate('/transactions')}>
                                        Transactions
                                    </button>
                                    <button type="button" onClick={() => handleLogout()}>
                                        Logout
                                    </button>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </header>
    )
}

export default Header;