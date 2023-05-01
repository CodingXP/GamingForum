<?php
include "dbcon.php";
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


?>