import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ErrorMessage from '../message/ErrorMessage';

const Register = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordcheck] = useState();
    const [displayName, setDisplayname] = useState();
    const [error, setError] = useState();

    const { setuserData } = useContext(UserContext);
    const history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const newUser = { email, password, passwordCheck, displayName};
            await axios.post(
                'http://localhost:5000/users/register',
                newUser
            );
            const loginRes = await axios.post(
                'http://localhost:5000/users/login',{
                email,
                password
            });
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
            <h1 >Register</h1>
            {error && (
                <ErrorMessage message={error} clearError={ ()=> setError(undefined)}/>
            )}
            <form className="formDesign" onSubmit={submitHandler}>
                <label htmlFor="register-email">Email</label>
                <input
                    type="email"
                    id="register-email"
                    onChange={(e) => setEmail(e.target.value)}
                /> 

                <label htmlFor="register-password">Password</label>
                <input
                    type="password"
                    id="register-password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Verify Password"
                    onChange={(e) => setPasswordcheck(e.target.value)}
                />

                <label htmlFor="register-displayName">displayName</label>
                <input
                    type="text"
                    id="register-displayName"
                    onChange={(e) => setDisplayname(e.target.value)}
                />

                <input type="submit" value="Register" />

            </form>
        </div>
    );
};

export default Register;