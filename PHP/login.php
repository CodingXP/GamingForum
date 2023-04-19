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

    $userRow = mysqli_fetch_array($userResult, MYSQLI_ASSOC);
    $userCount = mysqli_num_rows($userResult);
    $adminRow = mysqli_fetch_array($adminResult, MYSQLI_ASSOC);
    $adminCount = mysqli_num_rows($adminResult);

    if ($userCount === 1) {
        echo "Login Success";
    }
    else if($adminCount === 1){
        echo "Login Success";
    }
    else {
        echo "Login Unsuccesful";
    }

    closeCon($conn);
}
logUser($_POST['username'], $_POST['password']);
?>
