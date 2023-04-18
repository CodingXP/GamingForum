import React from "react";
import Popup from "reactjs-popup";
import post from "../images/post.png"
import postTitle from "../images/postTitle.png";
import postDesc from "../images/postDesc.png";

function Forum() {
  return(
    <div className="bg">
      <Popup trigger = {
        <button>Create Post</button>
      } modal nested>
        {
          close => (
            <div className="postPopup">
              <div>
                <img src={post} alt="Create a post."></img>
                <button className="button closeBtn" onClick={() => close()}>Close</button>
              </div>
              <div>
                <img alt="Write a post title:" src={postTitle}></img>
                <input className="postName" type="text" placeholder="Post title"></input>
              </div>
              <div>
                <img alt="Write the post's description:" src={postDesc}></img>
                <input className="postDesc" type="text" placeholder="Post Description"></input>
              </div>
              <div>
                <button className="button" type="submit">Create Post</button>
              </div>
            </div>
          )
        }
      </Popup>
    </div>
  );
}

export default Forum;
