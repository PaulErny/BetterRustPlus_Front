import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import { UserContext } from '../App.js'
import { getToken } from "firebase/messaging"
import { messaging } from "../firebase.js"
import env from 'react-dotenv';
import axios from 'axios';

async function requestPermission() {
  //requesting permission using Notification API
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: env.VITE_APP_VAPID_KEY,
    });

    //We can send token to server
    return token
  } else if (permission === "denied") {
    //notifications are blocked
    alert("You denied for the notification");
  }
}

async function registerFcmTokenWithServer(fcmToken, rustToken, steamID) {
  const response = axios.post('http://localhost:8080/register', {
    fcmToken: fcmToken,
    rustToken: rustToken,
    steamID: steamID,
  })
  return response;
}

function Login() {
  const { user, setUser } = useContext(UserContext)

  const nav = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const steamID = queryParams.get("steamid")
    const steamToken = queryParams.get("rustToken")
    setUser({
      steamID: steamID,
      steamToken: steamToken
    })
    console.log("1")
    requestPermission()
      .then((fcmToken) => {
        return registerFcmTokenWithServer(fcmToken, steamToken, steamID)
      }).then((res) => {
        console.log("res")
        console.log(res)
        if (res.status === 200) {
          nav('/')
        } else {
          // display connection error 
        }
      }).catch((error) => {
        console.error(error)
        // display connection error
      })
  }, [ setUser, nav ]);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Login
        </p>
        {
          user ? <span> <p> Steam ID: {user.steamID} </p> <p> Token: {user.steamToken} </p> </span> : null
        }
      </header>    
    </div>
  );
}

export default Login;
