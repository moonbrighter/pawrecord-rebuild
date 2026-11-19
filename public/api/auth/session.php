<?php
header("Content-Type: application/json");
session_start();

if (!isset($_SESSION["user_id"])) {
  http_response_code(401);
  echo json_encode(["success" => false, "message" => "Not logged in."]);
  exit();
}

echo json_encode([
  "success" => true,
  "user" => [
    "user_id" => $_SESSION["user_id"],
    "role" => $_SESSION["role"],
  ],
]);
