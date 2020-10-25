import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import UserContext from './context/UserContext';

const App = ()=> {

  const [userData, setuserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect( ()=> {

    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if(token === null) {
        localStorage.setItem('auth-token', '');
        token = ''
      } 

      const tokenRef = await axios.post('http://localhost:5000/users/tokenValidation',
       null,
       { headers: {'x-auth-token': token}}
      );
      // console.log(tokenRef.data)
      if(tokenRef.data) {
        const userRef = await axios.get('http://localhost:5000/users/',
         { headers: {'x-auth-token' : token }
        });

        setuserData({
          token,
          user: userRef.data
        });
      }

    }

    checkLoggedIn();

  }, [])

    return (
      <Fragment>
        <BrowserRouter>
          <UserContext.Provider value={{userData, setuserData}}>
            <Header />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                </Switch>
              </div>
          </UserContext.Provider>
        </BrowserRouter>
      </Fragment>
    );

}

export default App;
