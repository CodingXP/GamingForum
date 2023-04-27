<?php 
include "dbcon.php";

function postID() {
    $conn = openCon("localhost", "root", "", "gamingforum");

    $idQuery = "SELECT postID FROM posts;";
    $idResult = $conn->query($idQuery);
    $idCount = mysqli_num_rows($idResult);

    closeCon($conn);

    if($idCount == 0){
        return 0;
    }
    else if(!in_array(0, $idResult->fetch_array())){
        return 0;
    }
    else{
        return $idCount;
    }
}

function createPost($id, $title, $desc, $date, $user) {
    $conn = openCon("localhost", "root", "", "gamingforum");

    $title = dataValidation($title, $conn);
    $desc = dataValidation($desc, $conn);

    $query = "INSERT INTO posts (postId, postName, postDesc, postDate, postUsername) 
        VALUES ('{$id}', '{$title}', '{$desc}', '{$date}', '{$user}')";
    $conn->query($query);
    closeCon($conn);
}
createPost(postID(), $_POST["title"]["postTitle"], $_POST["desc"]["postDesc"], date("Y/m/d"), $_POST["username"]["username"]);
?>