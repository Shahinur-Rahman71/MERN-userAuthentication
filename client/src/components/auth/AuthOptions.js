import React, { Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const AuthOptions = () => {
    const { userData, setuserData } = useContext(UserContext);

    const history = useHistory();

    const register = () => history.push('/register');
    const login = () => history.push('/login');
    const logout = () => {
        setuserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem('auth-token', "");
    }

    return (
        <nav className="authOption">

            {
                userData.user ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <Fragment>
                        <button onClick={register}>Register</button>
                        <button onClick={login}>Login</button>
                    </Fragment>
                )
            }

            {/* <Link to="/register">reg</Link>
            <Link to="/login">log</Link> */}
        </nav>
    );
};

export default AuthOptions;