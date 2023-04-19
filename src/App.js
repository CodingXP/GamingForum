import "./styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Component } from "react";
import {useState} from "react";
import $ from "jquery"
import About from "./pages/About";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Forum from "./pages/Forum";
import Popup from "reactjs-popup";
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
              <div className="userBtns">
                <Register />
                <Login />
                <User username={""} />
              </div>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="*" element={<NoPage />}></Route>
            <Route path="/Forum" element={<Forum />}></Route>
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

function User({username}) {
  return (
    <li className="dropdown">
      <div>
      <button className="button">{username}</button>
      <div className="userDrop">
        <button>Profile</button>
        <button>Log out</button>
      </div>
      </div>
    </li>
  );
}

function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

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
  

  const handleSubmit = function(e) {
    e.preventDefault();
    const form = $(e.target);

    $.ajax({
      type: "POST",
      url: form.attr("action"),
      data: form.serialize(),
      success(data) {
        setResult(data);
      },
    });
  };

  return (
    <div>
      <Popup trigger={
        <button className="button">Register</button>
      } position="bottom center">
        {
          close => (
            <div className="regPopup">
              <form action="http://localhost:8000/register.php" method="POST" onSubmit={(event) => handleSubmit(event)}>
                <div>
                  <input className="input" type="text" id="name" name="name" value={name} onChange={(event) => handleNameChange(event)} placeholder="Name"></input>
                  <input className="input" type="text" id="surname" name="surname" value={surname} onChange={(event) => handleSurnameChange(event)} placeholder="Surname"></input>
                  <input className="input" type="text" id="email" name="email" value={email} onChange={(event) => handleEmailChange(event)} placeholder="Email"></input>
                  <input className="input" type="text" id="username" name="username" value={username} onChange={(event) => handleUserChange(event)} placeholder="Username"></input>
                  <input className="input" type="password" id="password" name="password" value={password} onChange={(event) => handlePassChange(event)} placeholder="Password"></input>
                  <button className="button" type="submit" name="register">Register</button>
                </div>
              </form>
            </div>
          )
        }
      </Popup>
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const handleUserChange = function(e) {
    setUsername(e.target.value);
  };

  const handlePassChange = function(e) {
    setPassword(e.target.value);
  };

  const handleSubmit = function(e) {
    e.preventDefault();
    const form = $(e.target);

    $.ajax({
      type: "POST",
      url: form.attr("action"),
      data: form.serialize(),
      success(data) {
        setResult(data);
      },
    });
  }

  return(
    <div className="bg">
      <Popup trigger={
        <button className="button">Login</button>
      } position="bottom center">
        {
          close => (
            <div className="logPopup">
              <form action="http://localhost:8000/login.php" method="POST" onSubmit={(event) => handleSubmit(event)}>
                <div>
                  <input type="text" id="username" name="username" value={username} onChange={(event) => handleUserChange(event)} placeholder="Username"></input>
                  <input type="password" id="password" name="password" value={password} onChange={(event) => handlePassChange(event)} placeholder="Password"></input>
                  <button type="submit">Login</button>
                </div>
              </form>
            </div>
          )
        }
      </Popup>
      <h2>{result}</h2>
    </div>
  );
}

export default App;