import "./App.css";
import Nav from "./Nav";
import RoutesList from "./RoutesList";
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./helpers/api";
import { useEffect, useState } from "react";
import decode from "jwt-decode";

import userContext from "./userContext";

const DEFAULT_USER_STATE = {
  data: null,
  isLoggedIn: false,
};

const LOCALSTORAGE_TOKEN_KEY = "jobly-token";

/** Jobly App
 *
 * State:
 * -user: Object containing information on current user and logged in state
 *    -data: User information { username, firstName, lastName, isAdmin, jobs }
 *        where jobs is { id, title, companyHandle, companyName, state }
 *    -isLoggedIn: Boolean for whether a user is logged in
 * -token: user token
 *
 * App -> { Nav, RoutesList }
 */

function App() {
  const [user, setUser] = useState(DEFAULT_USER_STATE);
  const [token, setToken] = useState(null);

  // Attempt to login previous user from localstorage
  useEffect(function checkForTokenOnMount() {
    const tokenFromLocalStorage = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    if (tokenFromLocalStorage) {
      storeToken(tokenFromLocalStorage);
    }
  }, []);

  // Update user state whenever token changes
  useEffect(
    function updateUserOnTokenChange() {
      async function fetchAndSetUserInformation() {
        if (token === null) {
          setUser(DEFAULT_USER_STATE);
          return;
        }

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

  /** Register a user using the API and store the returned token */
  // TODO: Would put some error validation messages here to be displayed in
  // signup page
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

  /** Authenticate a user using the API and store the returned token */
  // TODO: Would put some error validation messages here to be displayed in
  // login page
  async function login(loginFormData) {
    let tokenFromAPI;

    try {
      tokenFromAPI = await JoblyApi.loginUser(loginFormData);
    } catch (err) {
      console.error(err);
    }

    storeToken(tokenFromAPI);
  }

  /** Log out user by removing token from JoblyApi class, state, localStorage */
  function logout() {
    JoblyApi.token = null;
    setToken(null);
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY); // TODO: Could move this to useEffect
  }

  /** Stores a token in the JoblyApi class, state, and localStorage */
  function storeToken(newToken) {
    JoblyApi.token = newToken;
    setToken(newToken);
    localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, newToken);
  }

  return (
    <div className="App">
      <userContext.Provider value={{ user }}>
        <BrowserRouter>
          <Nav logout={logout} />
          <RoutesList signup={signup} login={login} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
