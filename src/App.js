import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Preloader from './components/Preloader';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, updateLoad] = useState(true);



  return (
<Router>
  <Preloader load={load}/>
  <div classname='App'>
    <Header/>
  <Routes>
    <Route path="/" element={<Home/>} />
  </Routes>
  <Footer/>
  </div>
</Router>
  );
}

export default App;
