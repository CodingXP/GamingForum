import "./styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Component } from "react";
import About from "./pages/About";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Forum from "./pages/Forum";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="appHeader">
            <Link to="/" className="logo"></Link>
            <div className="navBar">
              <NavLink route="/" btn="Home" />
              <NavLink route="/about" btn="About" />
              <NavLink route="/404" btn="404" />
              <NavLink route="/register" btn="Register" />
              <NavLink route="/login" btn="Login" />
              <NavLink route="/forum" btn="Forum" />
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="*" element={<NoPage />}></Route>
            <Route path="/Register" element={<Register />}></Route>
            <Route path="/Login" element={<Login />}></Route>
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

export default App;
