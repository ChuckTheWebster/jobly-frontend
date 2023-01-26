import './App.css';
import Nav from './Nav';
import RoutesList from './RoutesList';
import { BrowserRouter, Navigate } from 'react-router-dom';
import JoblyApi from './helpers/api';
import { useEffect, useState } from 'react';
import decode from 'jwt-decode';

import userContext from './userContext';

const DEFAULT_USER_STATE = {
  data: null,
  isLoggedIn: false
};

const LOCALSTORAGE_TOKEN_KEY = 'jobly-token';

function App() {
  const [user, setUser] = useState(DEFAULT_USER_STATE);
  const [token, setToken] = useState(null);

  useEffect(function updateUserOnTokenChange() {
    if (token === null) {
      setUser(DEFAULT_USER_STATE);
      return;
    }

    fetchUserInformation();
  }, [token]);

  async function fetchUserInformation() {
    const { username } = decode(token);

    let userFromAPI;
    try {
      userFromAPI = await JoblyApi.getUser(username);
    } catch (err) {
      console.error(err);
    }
    setUser({
      data: userFromAPI,
      isLoggedIn: true
    });
  }

  async function signup(signupFormData) {
    let tokenFromAPI;

    try {
      tokenFromAPI = await JoblyApi.signupUser(signupFormData);
    } catch (err) {
      console.error(err);
      return;
    }

    storeToken(tokenFromAPI);
  }

  async function login(loginFormData) {
    let tokenFromAPI;

    try {
      tokenFromAPI = await JoblyApi.loginUser(loginFormData);
    } catch (err) {
      console.error(err);
    }

    storeToken(tokenFromAPI);
  }

  function storeToken(token) {
    JoblyApi.token = token;
    setToken(token);
    localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
  }

  function removeToken() {
    JoblyApi.token = null;
    setToken(null);
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
  }

  // useeffect for on mount, check localstorage for a token

  return (
    <div className="App">
      <userContext.Provider value={{ user }}>
        <BrowserRouter>
          <Nav />
          <RoutesList signup={signup} login={login} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;