import { useState, useEffect } from "react";
import React from "react";

export default function Profile() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] =  useState("");

    useEffect(() => {
        handleInfoLoad();
    }, [])

    const handleInfoLoad = function() {
        var user = window.localStorage.getItem("USERNAME");
        setUsername(JSON.parse(user));

        $.ajax({
            type: "GET",
            url: "http://localhost:8000/forum.php",
            data: {

            },
            success(data) {
              
            },
          });
    }

    return(
        <div className="profile">
            <h2>{username}</h2>
            <h2>{email}</h2>
            <h2>{name}</h2>
            <h2>{surname}</h2>
        </div>
    );
}

