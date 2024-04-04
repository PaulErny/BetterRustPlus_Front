import React, { useContext } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { UserContext } from '../App.js'

function Home() {

  const { user } = useContext(UserContext)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Homepage
        </p>
        {
          user ? <span> <p> Steam ID: {user.steamID} </p> <p> Token: {user.steamToken} </p> </span> : null
        }
      </header>
    </div>
  );
}

export default Home;
