<?php 
header("Access-Control-Allow-Origin: http://localhost:3000");
$user = $_POST["user"];
$pass = $_POST["pass"];
echo ("<script>console.log('Username: $user, Password: $pass')</script>");    
?>