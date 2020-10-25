import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ErrorMessage from '../message/ErrorMessage';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setuserData } = useContext(UserContext);
    const history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const loginUser = { email, password};
            const loginRes = await axios.post('http://localhost:5000/users/login', loginUser);
            setuserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });
            localStorage.setItem('auth-token', loginRes.data.token);
            history.push('/');
        }
        catch(err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }


    return (
        <div style={{ padding: '1rem' }}>
            <h1 >Login</h1>
            {error && (
                <ErrorMessage message={error} clearError={ ()=> setError(undefined)}/>
            )}
            <form className="formDesign" onSubmit={submitHandler}>
                <label htmlFor="login-email">Email</label>
                <input
                    type="email"
                    id="login-email"
                    onChange={(e) => setEmail(e.target.value)}
                /> 

                <label htmlFor="login-password">Password</label>
                <input
                    type="password"
                    id="login-password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input type="submit" value="Login" />

            </form>
        </div>
    );
};

export default Login;