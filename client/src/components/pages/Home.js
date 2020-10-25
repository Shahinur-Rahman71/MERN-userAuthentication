import React, { Fragment, useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ErrorMessage from '../message/ErrorMessage';

const Home = () => {

    const [district, setdistrict] = useState();
    const [village, setvillage] = useState();
    const [error, setError] = useState();

    const { userData, setuserData } = useContext(UserContext);
    // const history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {            
            const newdata = {district, village };
            const loginRes = await axios.post(
                'http://localhost:5000/todo/addtodo',
                newdata
            );
            console.log('from home.js',loginRes)
            setuserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });
            localStorage.setItem('auth-token', loginRes.data.token);
        }
        catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    return (
        <div style={{ padding: '1rem' }}>

            {!userData.user ? (
                <Fragment>
                     <h2>You are not logged in</h2>
                    <Link to="/login">Log in</Link>
                </Fragment>                   
                ) : (
                    <div>
                         { error && (
                            <ErrorMessage message={error} clearError={() => setError(undefined)} />
                        )}
                        <form className="formDesign" onSubmit={submitHandler}>
                        
                            <label htmlFor="district">District</label>
                            <input
                                type="text"
                                id="district"
                                onChange={(e) => setdistrict(e.target.value)}
                            />

                            <label htmlFor="village">Village</label>
                            <input
                                type="text"
                                id="village"
                                onChange={(e) => setvillage(e.target.value)}
                            />

                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                )}

        </div>
    );


};

export default Home