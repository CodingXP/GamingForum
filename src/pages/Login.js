import React, { useState } from "react";
import $ from "jquery";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUserChange = function(e) {
    setUsername(e.target.value);
  };

  const handlePassChange = function(e) {
    setPassword(e.target.value)
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
      <div className="login">
        <form action="http://localhost:8000/login.php" method="POST">
          <input type="text" id="username" name="username" value={username} onChange={(event) => handleUserChange(event)} placeholder="Username"></input>
          <input type="password" id="password" name="password" value={password} onChange={(event) => handlePassChange(event)} placeholder="Password"></input>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
