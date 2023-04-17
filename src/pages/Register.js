import React, {useState} from "react";
import $ from "jquery";
import { useAsyncError } from "react-router-dom";


function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

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
    <div className="bg register">
      <form action="http://localhost:8000/index.php" method="POST" onSubmit={(event) => handleSubmit(event)}>
        <input type="text" id="user" name="user" value={username} onChange={(event) => handleUserChange(event)}></input>
        <input type="password" id="pass" name="pass" value={password} onChange={(event) => handlePassChange(event)}></input>
        <button type="submit">Register</button>
      </form>
      <h1>{result}</h1>
    </div>
  );
}

export default Register;
