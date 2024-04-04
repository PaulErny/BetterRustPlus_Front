import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useState, createContext, useEffect } from "react"
import Home from "./components/home.js"
import Login from "./components/login.js"
import { getToken } from "firebase/messaging"
import { messaging } from "./firebase.js"
import env from 'react-dotenv';

export const UserContext = createContext(null)

async function requestPermission() {
  //requesting permission using Notification API
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: env.VITE_APP_VAPID_KEY,
    });

    //We can send token to server
    console.log("Token generated : ", token);
  } else if (permission === "denied") {
    //notifications are blocked
    alert("You denied for the notification");
  }
}

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    requestPermission()
  }, [])

  return (
    <Router>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
