import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Preloader from './components/Preloader';
import Home from './pages/Home/Home';
import Random from './pages/Random/Random';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import "bootstrap/dist/css/bootstrap.min.css";
import SearchResults from './pages/SearchResults/SearchResults';
import API from "./utils/api"
import Profile from './pages/Profile/Profile';
import Collection from './pages/Collection/Collection';

function App() {
  const [load, updateLoad] = useState(true);
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const savedToken = localStorage.getItem("token");
        if(savedToken) {
          const response = await API.isValidToken(savedToken);
          console.log(response);
          if (response.isValid) {
            setToken(savedToken);
            setUsername(response.user.username);
            setIsLoggedIn(true);
            localStorage.setItem("username", response.user.username)
          } else{
            localStorage.removeItem("token")
          }
        }
      } catch (err) {
        console.log(err)
      }
    }

    getUser();

  }, [])

  const logout = () => {
    setToken('');
    setUsername("");
    setIsLoggedIn(false);
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("userId")
  }



  return (
<Router>
  <Preloader load={load}/>
  <div className='App'>
    <Header loggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn} logout={logout}/>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/profile" element={<Profile/>} />
    <Route path="/random" element={<Random/>} />
    <Route path="/search/:gameID" element={<SearchResults loggedIn={isLoggedIn}/>}/>
    <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername} setIsLoggedIn={setIsLoggedIn}/>} />
    <Route path="/signup" element={<SignUp setToken={setToken} setUsername={setUsername} setIsLoggedIn={setIsLoggedIn}/>} />
    <Route path='/collection' element={<Collection/>} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
  <Footer/>
  </div>
</Router>
  );
}

export default App;
