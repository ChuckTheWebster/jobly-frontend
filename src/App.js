import "./App.css";
import Nav from "./Nav";
import RoutesList from "./RoutesList";
import { BrowserRouter, Navigate } from "react-router-dom";
import JoblyApi from "./helpers/api";
import { useEffect, useState } from "react";
import decode from "jwt-decode";

import userContext from "./userContext";

const DEFAULT_USER_STATE = {
  data: null,
  isLoggedIn: false,
};

const LOCALSTORAGE_TOKEN_KEY = "jobly-token";

function App() {
  const [user, setUser] = useState(DEFAULT_USER_STATE);
  const [token, setToken] = useState(null);

  useEffect(function checkForTokenOnMount() {
    const tokenFromLocalStorage = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    if (tokenFromLocalStorage) {
      storeToken(tokenFromLocalStorage);
    }
  }, []);

  useEffect(
    function updateUserOnTokenChange() {
      if (token === null) {
        setUser(DEFAULT_USER_STATE);
        return;
      }

      async function fetchAndSetUserInformation() {
        const { username } = decode(token);

        let userFromAPI;
        try {
          userFromAPI = await JoblyApi.getUser(username);
        } catch (err) {
          console.error(err);
        }
        setUser({
          data: userFromAPI,
          isLoggedIn: true,
        });
      }

      fetchAndSetUserInformation();
    },
    [token]
  );

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

  function storeToken(newToken) {
    JoblyApi.token = newToken;
    setToken(newToken);
    localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, newToken);
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
