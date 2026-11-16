<?php
header("Content-Type: application/json");
require "db.php";

$username = $_POST["username"] ?? "";
$pass = $_POST["password"] ?? "";

$stmt = $pdo->prepare("
  SELECT user_id, name, password, role
  FROM users
  WHERE username = ?"
);

$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
  
if ($user && ($pass === $user["password"])) {
  session_start();
  session_regenerate_id(true);

  $_SESSION["user_id"] = $user["user_id"];
  $_SESSION["role"] = $user["role"];

  echo json_encode([
    "success" => true,
    "user" => [
      "user_id" => $user["user_id"],
      "name" => $user["name"], 
      "role" => $user["role"]
    ] 
  ]);
  
} else {
  echo json_encode(["success" => false, "message" => "Wrong email or password"]);
}