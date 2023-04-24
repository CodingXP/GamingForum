<?php 
include "dbcon.php";

function postID() {
    // echo "PostID func called.";
    $conn = openCon("localhost", "root", "", "gamingforum");

    $idQuery = "SELECT postID FROM posts;";
    $idResult = $conn->query($idQuery);
    $idCount = mysqli_num_rows($idResult);

    closeCon($conn);

    if($idCount === 0){
        return 0;
    }
    else{
        return $idCount;
    }
}

function createPost($id, $title, $desc, $date, $user) {
    $conn = openCon("localhost", "root", "", "gamingforum");
    // echo "Post creation func called.";

    $title = dataValidation($title, $conn);
    $desc = dataValidation($desc, $conn);

    $query = "INSERT INTO posts (postId, postName, postDesc, postDate, username) 
        VALUES ('{$id}', '{$title}', '{$desc}', '{$date}', '{$user}')";
    // $conn->query($query);
    closeCon($conn);

    echo($title);
}

createPost(postID(), $_POST["title"], $_POST["desc"], $_POST["date"], $_POST["user"]);
// catchfunc($_POST['user'], $_POST['date']);
?>