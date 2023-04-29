import "./styles.css";
import { BrowserRouter as Router, Routes, Route, Link, json} from "react-router-dom";
import { Component } from "react";
import {useState, useEffect} from "react";
import $ from "jquery"
import About from "./pages/About";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";
import PostPage from "./pages/PostPage";
import Popup from "reactjs-popup";
import loginImg from "./images/loginImg.png";
import registerImg from "./images/registerImg.png";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="appHeader">
            <div className="headerLogo">
              <Link to="/" className="logo"></Link>
            </div>
            <div className="navBar">
              <NavLink route="/" btn="Home" />
              <NavLink route="/forum" btn="Forum" />
              <NavLink route="/about" btn="About" />
              <NavLink route="/404" btn="404" />
              <NavBarUser />  
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="*" element={<NoPage />}></Route>
            <Route path="/Forum" element={<Forum />}></Route>
            <Route path="/Profile" element={<Profile />}></Route>
            <Route path="/Forum/:postID" element={<PostPage />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

function NavLink({ route, btn }) {
  return (
    <div>
      <Link to={route}>
        <button className="button">{btn}</button>
      </Link>
    </div>
  );
}

function NavBarUser() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() =>{
    const initial = JSON.parse(localStorage.getItem("LOGIN_STATUS"));
    return initial || false;
  });
  const [username, setUsername] = useState(() => {
    const initial = JSON.parse(localStorage.getItem("USERNAME"));
    return initial || "";
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    const initial = JSON.parse(localStorage.getItem("ADMIN_STATUS"));
    return initial || false;
  })

  useEffect(() => {
    const data = window.localStorage.getItem("LOGIN_STATUS");
    if ( data !== null ){
      setIsLoggedIn(JSON.parse(data));
      window.localStorage.setItem("LOGIN_STATUS", JSON.stringify(isLoggedIn));
    }
  }, []);

  useEffect (() => {
    const user = window.localStorage.getItem("USERNAME");
    if (user !== ""){
      setUsername(JSON.parse(user));
      window.localStorage.setItem("USERNAME", JSON.stringify(username));
    }
  }, [])

  useEffect(() => {
    const admin = window.localStorage.getItem("ADMIN_STATUS");
    if (admin !== null){
      setIsAdmin(JSON.parse(admin));
      window.localStorage.setItem("ADMIN_STATUS", JSON.stringify(isAdmin));
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem("LOGIN_STATUS", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    window.localStorage.setItem("USERNAME", JSON.stringify(username));
  }, [username]);

  useEffect(() => {
    window.localStorage.setItem("ADMIN_STATUS", JSON.stringify(isAdmin));
  }, [isAdmin])

  const handleNameChange = function(e) {
    setName(e.target.value);
  }

  const handleSurnameChange = function(e) {
    setSurname(e.target.value);
  }

  const handleEmailChange = function(e) {
    setEmail(e.target.value);
  }

  const handleUserChange = function(e) {
    setUsername(e.target.value);
  };

  const handlePassChange = function(e) {
    setPassword(e.target.value)
  }
  
  const handleLogout = function() {
    setUsername("");
    setIsLoggedIn((isLoggedIn) => !isLoggedIn);
    if(isAdmin === true){
      setIsAdmin((isAdmin) => !isAdmin);
    }
    localStorage.removeItem("USERNAME");
  }

  const handleSubmit = function(e) {
    e.preventDefault();
    const form = $(e.target);
    setUsername("");
    setPassword("");
    setName("");
    setSurname("");
    setEmail("");

    $.ajax({
      type: "POST",
      url: form.attr("action"),
      data: form.serialize(),
      success(data) {
      if (data) {
        try {
          data = JSON.parse(data);
          console.log(data);
          if (data['username'] == username){
            if(data['isAdmin'] == 1){
              setIsAdmin(true);
            }
            setIsLoggedIn(true);
            window.localStorage.setItem("USERNAME", JSON.stringify(username));
            $(location).attr('href','/');
          } 
        } catch (error) {
          console.log(error);
        }
      }
      else {
        alert("Incorrect login data!");
      }
      },
    });

    
  };

  return (
  <div className="userBtns">
    <div>
      {!isLoggedIn && <Popup trigger={
        <button className="button">Register</button>
      } position="bottom center">
        {
          close => (
            <div className="regPopup">
              <form className="regFields" action="http://localhost:8000/register.php" method="POST" onSubmit={(event) => handleSubmit(event)}>
                <div>
                  <img src={registerImg} alt="Register" className="regImg"></img>
                  <input className="input userInput" type="text" id="name" name="name" value={name} onChange={(event) => handleNameChange(event)} placeholder="Name"></input>
                  <input className="input userInput" type="text" id="surname" name="surname" value={surname} onChange={(event) => handleSurnameChange(event)} placeholder="Surname"></input>
                  <input className="input userInput" type="text" id="email" name="email" value={email} onChange={(event) => handleEmailChange(event)} placeholder="Email"></input>
                  <input className="input userInput" type="text" id="username" name="username" value={username} onChange={(event) => handleUserChange(event)} placeholder="Username"></input>
                  <input className="input userInput" type="password" id="password" name="password" value={password} onChange={(event) => handlePassChange(event)} placeholder="Password"></input>
                  <button className="button" type="submit" name="register">Register</button>
                </div>
              </form>
            </div>
          )
        }
      </Popup>}
    </div>
    <div>
    {!isLoggedIn && <Popup trigger={
      <button className="button">Login</button>
    } position="bottom center">
      {
        close => (
          <div className="logPopup">
            <form className="logFields" action="http://localhost:8000/login.php" method="POST" onSubmit={(event) => handleSubmit(event)} spellCheck="false">
            <img className="logImg" alt="Login" src={loginImg}></img>
              <div>
                <input className="input userInput" type="text" id="username" name="username" value={username} onChange={(event) => handleUserChange(event)} placeholder="Username" autoFocus></input>
                <input className="input userInput" type="password" id="password" name="password" value={password} onChange={(event) => handlePassChange(event)} placeholder="Password"></input>
                <button className="button" type="submit">Login</button>
              </div>
            </form>
          </div>
        )
      }
      </Popup>}
    </div>
    <div>
    {isLoggedIn && <li className="dropdown">
      <div>
        <button className="button userButton">{username}</button>
        <div className="userDrop">
          <NavLink route="/profile" btn="Profile" />
          <Link to={"/"}>
            <button className="button logButton" onClick={handleLogout}>{"Logout"}</button>
          </Link>
        </div>
      </div>
    </li>}
    </div>
  </div>
  );
}

export default App;