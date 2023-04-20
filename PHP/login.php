<?php
include "dbcon.php";
function logUser($user, $pass) {
    $conn = openCon("localhost", "root", "", "gaming_forum");

    $user = dataValidation($user, $conn);
    $pass = dataValidation($pass, $conn);

    $userQuery = "SELECT * FROM users WHERE username = '$user' AND PASSWORD = '$pass'";
    $userResult = $conn->query($userQuery);
    $adminQuery = "SELECT * FROM admin WHERE username = '$user' AND PASSWORD = '$pass'";
    $adminResult = $conn->query(($adminQuery));

    $userCount = mysqli_num_rows($userResult);
    $adminCount = mysqli_num_rows($adminResult);

    if ($userCount === 1 || $adminCount === 1) {
        echo($user);
    }

    closeCon($conn);
}
logUser($_POST['username'], $_POST['password']);
?>
