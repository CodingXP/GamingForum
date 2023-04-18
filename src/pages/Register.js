import React, {useState} from "react";
import $ from "jquery";
import { useAsyncError } from "react-router-dom";


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
  return(
    <div className="bg">
      <div className="register">
        <form action="http://localhost:8000/register.php" method="POST" onSubmit={(event) => handleSubmit(event)}>
          <input type="text" id="name" name="name" value={name} onChange={(event) => handleNameChange(event)} placeholder="Name"></input>
          <input type="text" id="surname" name="surname" value={surname} onChange={(event) => handleSurnameChange(event)} placeholder="Surname"></input>
          <input type="text" id="email" name="email" value={email} onChange={(event) => handleEmailChange(event)} placeholder="Email"></input>
          <input type="text" id="username" name="username" value={username} onChange={(event) => handleUserChange(event)} placeholder="Username"></input>
          <input type="password" id="password" name="password" value={password} onChange={(event) => handlePassChange(event)} placeholder="Password"></input>
          <button type="submit" name="register">Register</button>
        </form>
        <h1>{result}</h1>
      </div>
    </div>
  );
}

export default Register;
