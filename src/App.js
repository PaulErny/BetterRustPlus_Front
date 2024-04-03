import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useState, createContext } from "react"
import Home from "./components/home.js"
import Login from "./components/login.js"

export const UserContext = createContext(null)

function App() {

  const [user, setUser] = useState(null)

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
