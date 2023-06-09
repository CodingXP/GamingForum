<?php 
include "dbcon.php";
function regUser($name, $surname, $email, $user, $pass, $isAdmin) {
    // Open connection with localhost, where username is root and there is no password, connecting to the gaming_forum database.
    $conn = openCon("localhost", "root", "", "gamingforum");

    // Validates input data to prevent malicous activity and SQL injections. (dbcon.php has the func).
    $name = dataValidation($name, $conn);
    $surname = dataValidation($surname, $conn);
    $email = dataValidation($email, $conn);
    $user = dataValidation($user, $conn);
    $pass = dataValidation($pass, $conn);

    $query = "INSERT INTO users (name, surname, email, username, PASSWORD, isAdmin) 
        VALUES ('{$name}', '{$surname}', '{$email}', '{$user}', '{$pass}', '{$isAdmin}')";

    echo $user;

    $conn->query($query);
    // Close opened connection.
    closeCon($conn);
}

regUser($_POST["name"], $_POST["surname"], $_POST["email"], $_POST["username"], $_POST["password"], false);
?>