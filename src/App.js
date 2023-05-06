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

function App() {
  const [load, updateLoad] = useState(true);



  return (
<Router>
  <Preloader load={load}/>
  <div className='App'>
    <Header/>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/random" element={<Random/>} />
    <Route path="/search/:gameID" element={<SearchResults/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
  <Footer/>
  </div>
</Router>
  );
}

export default App;
