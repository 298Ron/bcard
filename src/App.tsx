import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PageNotFound from './components/pageNotFound';
import { ToastContainer } from "react-toastify"
import Footer from './components/Footer';
import MyCards from './components/MyCards';
import NewCard from './components/NewCard';
import UpdateCard from './components/UpdateCard';
import FavCards from './components/FavCards';
import Profile from './components/Profile';
import About from './components/About';
import Card from './interfaces/Card';
import ReactSwitch from 'react-switch';
import CardsInfo from './components/CardsInfo';
export let ThemeContext: any = createContext(null);
function App() {

  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }

  let [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo") as string) == null
      ? { email: false, isAdmin: false }
      : JSON.parse(sessionStorage.getItem("userInfo") as string))
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ToastContainer theme={theme === "dark" ? ("dark") : ("light")} />
      <div className="App" id={theme}>

        <Router>
          <Navbar userInfo={userInfo} setUserInfo={setUserInfo} theme={theme} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile userInfo={userInfo} />} />
            <Route path="/login" element={<Login setUserInfo={setUserInfo} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/cards" element={<MyCards userInfo={userInfo} />} />
            <Route path="/cards/info/:id" element={<CardsInfo userInfo={userInfo} />} />
            <Route path="/cards/favorites/:id" element={<FavCards userInfo={userInfo} />} />
            <Route path="/cards/add" element={<NewCard userInfo={userInfo} />} />
            <Route path="/cards/:id" element={<UpdateCard userInfo={userInfo} />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
          <Footer />
        </Router>

      </div>
    </ThemeContext.Provider>
  );
}

export default App;
