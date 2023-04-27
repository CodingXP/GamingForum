import React, { useState, useEffect, createElement } from "react";
import Post from "./Post";
import Popup from "reactjs-popup";
import post from "../images/post.png"
import postTitleImg from "../images/postTitle.png";
import postDescImg from "../images/postDesc.png";
import $ from "jquery";

// function PostLink({title}) {
//   return createElement("h2", {className: "test"}, createElement("i", null, title));
// }

// function PostGen() {
//     for (let i; i<10; i++){
//       return createElement(PostLink, {title: "Hi"});
//     }
// }

function Forum() {
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");


  useEffect(() => {
    const data = window.localStorage.getItem('LOGIN_STATUS');
    setIsLoggedIn(JSON.parse(data));
    const user = window.localStorage.getItem("USERNAME");
    setUsername(JSON.parse(user));

    postLoading();
  }, []);

  const handleTitleChange = function(e) {
    setPostTitle(e.target.value);
  }

  const handleDescChange = function(e) {
    setPostDesc(e.target.value);
  }

  const postLoading = function() {
    $.ajax({
      type: "GET",
      url: "http://localhost:8000/posts.php",
      success(data) {
        data = JSON.parse(data);
        console.log(data);
        for(let i=0; i<data.length; i++){
          $("#post").append(data[i]['postName'] + "|" + data[i]['postDesc'] +"|" + data[i]['postUsername']);
          $("#post").append("<br>");
          $("#post").append("<br>");
        }
      },
    })
  }
  
  const handleSubmit = function(e) {
    e.preventDefault();
    const form = $(e.target);
    setPostDesc("");
    setPostTitle("");

    $.ajax({
      type: "POST",
      url: form.attr("action"),
      data: {
        title: {postTitle},
        desc: {postDesc},
        username: {username}
      },
      success(data) {
      },
    });
  }

  return(
    <div className="forum">
      <div className="postCreation">
        {isLoggedIn && <Popup trigger = {
          <button className="createButton">Create Post</button>
        } modal nested>
          {
            close => (
              <div className="postPopup">
                <div className="createPostDiv">
                  <img className="createImg" src={post} alt="Create a post."></img>
                  <button className="button closeBtn" onClick={() => close()}>Close</button>
                </div>
                <form action="http://localhost:8000/forum.php" method="POST" onSubmit={(event) => handleSubmit(event)}>
                  <div>
                    <img alt="Write a post title:" src={postTitleImg} className="titleImg"></img>
                    <input id="title" name="title" value={postTitle} onChange={(event) => handleTitleChange(event)} className="userInput postTitle" type="text"></input>
                  </div>
                  <div>
                    <img alt="Write the post's description:" src={postDescImg} className="descImg"></img>
                    <textarea id="desc" name="desc" value={postDesc} onChange={(event) => handleDescChange(event)} className="userInput postDesc" type="text"></textarea>
                  </div>
                  <div>
                    <button className="button postButton" name="create" type="submit">Create Post</button>
                  </div>
                </form>
              </div>
            )
          }
        </Popup>}
        {!isLoggedIn && <h2 className="error">You need to be logged in to create posts!</h2>}
      </div>
      <div className="posts">
        <h2 id="post"></h2>
      </div>
    </div>
  );
}
export default Forum;
