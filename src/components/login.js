import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import { UserContext } from '../App.js'

function Login() {
  const { user, setUser } = useContext(UserContext)

  const queryParams = new URLSearchParams(window.location.search)
  const steamID = queryParams.get("steamid")
  const token = queryParams.get("token")
  const nav = useNavigate();

  useEffect(() => {
    if (user) nav('/');
  }, [user, nav]);

  setUser({
    steamID: steamID,
    token: token
  })
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Login
        </p>
        {
          user ? <span> <p> Steam ID: {user.steamID} </p> <p> Token: {user.token} </p> </span> : null
        }
      </header>    
    </div>
  );
}

export default Login;
