import './App.css';
import Nav from './Nav';
import RoutesList from './RoutesList';
import { BrowserRouter } from 'react-router-dom';
import JoblyApi from './helpers/api';

function App() {

  function signup() {
    return JoblyApi.signupUser();
  }

  function login() {
    return JoblyApi.loginUser();
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <RoutesList signup={ signup } login={ login }/>
      </BrowserRouter>
    </div>
  );
}

export default App;