import HeaderMain from "./HeaderMain";
import HeaderButton from "./HeaderButton";
import {useNavigate} from "react-router-dom";

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
        <div className="header" >
            <HeaderMain onClick={() => navigate("/")} />
            {
                windowWidth > headerMenuWidthMax && (
                    <>
                        <HeaderButton text="Dashboard" onClick={() => navigate("/")} />
                        <HeaderButton text="Transactions" onClick={() => navigate("/transactions")} />
                        <HeaderButton text="Profile" onClick={() => navigate("/profile")} />
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
                                    <button type="button" onClick={() => navigate('/profile')}>
                                        Profile
                                    </button>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Header;