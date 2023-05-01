<?php 
include "dbcon.php";
function createPost($title, $desc, $date, $user) {
    $conn = openCon("localhost", "root", "", "gamingforum");

    $title = dataValidation($title, $conn);
    $desc = dataValidation($desc, $conn);

    $query = "INSERT INTO posts (postName, postDesc, postDate, postUsername) 
        VALUES ('{$title}', '{$desc}', '{$date}', '{$user}')";
    $conn->query($query);
    closeCon($conn);
}

function postLoading() {
    $conn = openCon('localhost', 'root', '', 'gamingforum');

    $query = "SELECT postName, postDesc, postUsername, postID FROM posts ORDER BY postID";
    $result = $conn->query($query);

    $row = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($row);
    closeCon($conn);
}

if (isset($_POST['title']['postTitle'])){
    createPost($_POST["title"]["postTitle"], $_POST["desc"]["postDesc"], date("Y/m/d"), $_POST["username"]["username"]);
}
else {
    postLoading();
}
?>