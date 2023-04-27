<?php
include "dbcon.php";

function postLoading() {
    $conn = openCon('localhost', 'root', '', 'gamingforum');

    $query = "SELECT postName, postDesc, postUsername FROM posts ORDER BY postID DESC";
    $result = $conn->query($query);

    $row = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($row);
    closeCon($conn);
}

postLoading();
?>
