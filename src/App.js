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

  // On token change, add/remove token to/from local storage.
  useEffect(
    function updateTokenInLocalStorage() {
      if (token === null) {
        localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
      } else {
        localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
      }
    },
    [token]
  );

  /** Register a user using the API and store the returned token */
  async function signup(signupFormData) {
    const tokenFromAPI = await JoblyApi.signupUser(signupFormData);
    storeToken(tokenFromAPI);
  }

  /** Authenticate a user using the API and store the returned token */
  async function login(loginFormData) {
    const tokenFromAPI = await JoblyApi.loginUser(loginFormData);
    storeToken(tokenFromAPI);
  }

  /** Log out user by removing token from JoblyApi class, state, localStorage */
  function logout() {
    JoblyApi.token = null;
    setToken(null);
  }

  /** Stores a token in the JoblyApi class, state, and localStorage */
  function storeToken(newToken) {
    JoblyApi.token = newToken;
    setToken(newToken);
  }

  /** Save user edits using the API and update user state */
  async function saveUserEdit(editFormData) {
    const { username, ...updateData } = editFormData;
    const userFromAPI = await JoblyApi.updateUser(username, updateData);
    setUser((prevUser) => ({
      ...prevUser,
      data: {
        ...prevUser.data,
        firstName: userFromAPI.firstName,
        lastName: userFromAPI.lastName,
        email: userFromAPI.email,
      },
    }));
  }

  return (
    <div className="App">
      <userContext.Provider value={{ user, saveUserEdit }}>
        <BrowserRouter>
          <Nav logout={logout} />
          <RoutesList signup={signup} login={login} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
