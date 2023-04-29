import React, { useEffect, useState } from "react";
import { useParams, h2nk, Route } from "react-router-dom";
import $, { post } from "jquery";
import { isUnionTypeNode } from "typescript";

function PostArea({title, desc, date, user}){
    return(
      <div>
        <div className="postArea">
          <div className="postTitleArea">
            <h2>{title}</h2>
            <p>{desc}</p>
          </div>
          <div className="postButtons">
            <button className="button">Edit</button>
            <button className="button">Delete</button>
          </div>
          <div className="postStatArea">
            <h2>Posted on: {date}</h2>
            <h2>Posted by: {user}</h2>
          </div>
        </div>
        <div className="commentArea">
          <h2>Leave a comment: </h2>
          <form>
            <textarea className="userInput"></textarea>
            <button className="button">Post Comment</button>
          </form>
        </div>
      </div>
    );
  }
  
function PostPage() {
    let { postID } = useParams();
    const [postData, setPostData] = useState([]);
    const [isUser, setIsUser] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const user = window.localStorage.getItem("USERNAME");
        setUsername(JSON.parse(user));

        loadPost();
    }, [])

    const loadPost = function () {
        $.ajax({
            type: "GET",
            url: "http://localhost:8000/posts.php",
            data: {
                postID : postID
            },
            success(data) {
              if (data) {
                data = JSON.parse(data);
                if({username} === data[0]['postUsername']){
                    setIsUser(true);
                }
                setPostData(data.map((post) => <PostArea title={post.postName} desc={post.postDesc} date={post.postDate} user={post.postUsername} key={post.postDate} />))
              }
              else {
                console.log("Empty data recieved...");
              }
            },
          })
    }
    return (
        <div>
            <h2>{postData}</h2>
        </div>
    );
}

export default PostPage;