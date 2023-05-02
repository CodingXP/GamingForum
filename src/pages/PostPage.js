import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import $ from "jquery";

function CommentArea ({date, text, username}) {
  return(
    <div className="container">
      <div className="comment">
        <div className="commentData">
          <h2>Posted on: {date}</h2>
          <h2>Posted by: {username}</h2>
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
}

function PostArea({title, desc, date, user}){
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let {postID} = useParams();

  useEffect(() => {
    const user = window.localStorage.getItem("USERNAME");
    setUsername(JSON.parse(user));

    const login = window.localStorage.getItem("LOGIN_STATUS");
    setIsLoggedIn(JSON.parse(login));
  }, [])

  const handleCommentChange = function(e) {
    setComment(e.target.value)
  }

  const postComment = function(e) {
    e.preventDefault();
    const form = $(e.target);
    setComment("");

    $.ajax({
      type: "POST",
      url: form.attr("action"),
      data: {
        text: {comment},
        username: {username},
        postID: {postID}
      },
      success(data) {
        $(location).attr('href',`/forum/${postID}`);
        console.log(data);
      },
    });
  }
  return(
    <div>
      <div className="postArea">
        <div className="postTitleArea">
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>
        <div className="postStatArea">
          <h2>Posted on: {date}</h2>
          <h2>Posted by: {user}</h2>
        </div>
      </div>
      <div className="commentArea">
      {isLoggedIn && <div>
        <h2>Leave a comment: </h2>
        <form action="http://localhost:8000/comments.php" maxLength='250' method="POST" onSubmit={(event) => postComment(event)}>
          <textarea className="userInput" onChange={(event) => handleCommentChange(event)}></textarea>
          <button className="button">Post Comment</button>
        </form>
      </div>}
        {!isLoggedIn && <h2 className="error">You need to be logged in to post comments!</h2>}
      </div>
    </div>
  );
  }
  
function PostPage() {
    let { postID } = useParams();
    const [postData, setPostData] = useState([]);
    const [commentData, setCommentData] = useState([]);

    useEffect(() => {
        loadPost();
        loadComments();
    }, [])

    const loadComments = function() {
      $.ajax({
        type: "GET",
        url: "http://localhost:8000/comments.php",
        data: {
          postID: postID
        },
        success(data) {
          if (data) {
            data = JSON.parse(data);
            console.log(data);
            setCommentData(data.map((comment) =>
              <CommentArea
                date={comment.commentDate}
                text={comment.commentText}
                username={comment.commentUsername}
              />).reverse()
            );
          }
          else {
            console.log("Empty data received...");
          }
        },
      })
    }
    

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
            <h2>{commentData}</h2>
        </div>
    );
}

export default PostPage;