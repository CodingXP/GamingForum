<?php
include "dbcon.php";

function loadComments($postID) {
    $conn = openCon('localhost', 'root', '', 'gamingforum');

    $query = "SELECT commentText, commentDate, commentUsername FROM comments WHERE postID = '{$postID}'";
    $result = $conn->query($query);

    $row = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($row);
    // echo json_encode($postID);
    closeCon($conn);
}

function submitComment($commentText, $commentDate, $commentUser, $postID) {
    $conn = openCon("localhost", "root", "", "gamingforum");


    $commentText = dataValidation($commentText, $conn);

    $query = "INSERT INTO comments (commentText, commentDate, commentUsername, postID) VALUES
                    ('{$commentText}', '{$commentDate}', '{$commentUser}', '{$postID}')";


    $conn->query($query);
    closeCon($conn);

}

if(isset($_POST['postID'])){
    submitComment($_POST['text']['comment'], date("Y/m/d"), $_POST['username']['username'], $_POST['postID']['postID']);
}

else if (isset($_GET['postID'])) {
    loadComments($_GET['postID']);
}

?>