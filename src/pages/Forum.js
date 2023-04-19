import React, { useState } from "react";
import Popup from "reactjs-popup";
import post from "../images/post.png"
import postTitle from "../images/postTitle.png";
import postDesc from "../images/postDesc.png";

function Forum() {
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");

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
      },
    });
  }

  return(
    <div className="bg">
      <Popup trigger = {
        <button>Create Post</button>
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
                  <img alt="Write a post title:" src={postTitle}></img>
                  <div>
                    <input id="title" name="title" value={postTitle} onChange={(event) => handleTitleChange(event)} className="input postTitle" type="text"></input>
                  </div>
                </div>
                <div>
                  <img alt="Write the post's description:" src={postDesc}></img>
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
