<?php
include "dbcon.php";
function logUser($user, $pass) {
    $conn = openCon("localhost", "root", "", "gaming_forum");

    $user = dataValidation($user, $conn);
    $pass = dataValidation($pass, $conn);

    $query = "SELECT * FROM users WHERE username = '$user' AND PASSWORD = '$pass'";
    $result = $conn->query($query);
    // Row currently is unecessary, but it might prove useful when I need user data (name, email, etc.)
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $count = mysqli_num_rows($result);

    if ($count === 1) {
        echo "Login Succesful";
    }
    else {
        echo "Login Unsuccesful";
    }

    closeCon($conn);
}
logUser($_POST['username'], $_POST['password']);
?>
