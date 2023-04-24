import React, { useState } from "react";
import { useEffect } from "react";
import Popup from "reactjs-popup";
import post from "../images/post.png"
import postTitleImg from "../images/postTitle.png";
import postDescImg from "../images/postDesc.png";
import $ from "jquery";

function Forum() {
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  var today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  useEffect(() => {
    const data = window.localStorage.getItem('LOGIN_STATUS');
    setIsLoggedIn(JSON.parse(data));
    setUsername(window.localStorage.getItem("USERNAME"));
  }, []);

  const handleTitleChange = function(e) {
    setPostTitle(e.target.value);
  }

  const handleDescChange = function(e) {
    setPostDesc(e.target.value);
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
        console.log(data);
      },
    });
  }

  return(
    <div className="bg">
      <Popup trigger = {
        <button >Create Post</button>
      } modal nested>
        {
          close => (
            <div className="postPopup">
              <div className="createPostDiv">
                <img className="createImg" src={post} alt="Create a post."></img>
                <button className="button closeBtn" onClick={() => close()}>Close</button>
              </div>
              <form action="http://localhost:8000/forum.php" method="POST" onSubmit={(event) => handleSubmit(event)}>
                <div className="postTitleDiv">
                  <img alt="Write a post title:" src={postTitleImg}></img>
                  <input id="title" name="title" value={postTitle} onChange={(event) => handleTitleChange(event)} className="input postTitle" type="text"></input>
                </div>
                <div>
                  <img alt="Write the post's description:" src={postDescImg} className="descImg"></img>
                  <textarea id="desc" name="desc" value={postDesc} onChange={(event) => handleDescChange(event)} className="input postDesc" type="text"></textarea>
                </div>
                <div>
                  <button className="button" name="create" type="submit">Create Post</button>
                </div>
              </form>
            </div>
          )
        }
      </Popup>
    </div>
  );
}
export default Forum;
