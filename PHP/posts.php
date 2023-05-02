<?php
include "dbcon.php";

function deletePost($postID) {
    $conn = openCon("localhost", "root", "", "gamingforum");

    $Commentquery = "DELETE FROM comments WHERE postID = '{$postID}'";
    $postQuery = "DELETE FROM posts WHERE postID = '{$postID}'";

    $conn->query($Commentquery);
    $conn->query($postQuery);

    echo "Delete complete";

    closeCon($conn);
}

function loadPost($postID) {
    $conn = openCon("localhost", "root", "", "gamingforum");

    $query = "SELECT postName, postDesc, postDate, postUsername FROM posts WHERE postID = '{$postID}'";
    $result = $conn->query($query);

    $row = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($row);

    closeCon($conn);
}

if (isset($_GET['postID'])){
    loadPost($_GET['postID']);
}

else if (isset($_POST['postID'])){
    deletePost($_POST['postID']);  
}
?>