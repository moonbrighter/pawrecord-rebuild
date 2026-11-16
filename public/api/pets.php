<?php
session_start();
header("Content-Type: application/json");
require "db.php";

if (!isset($_SESSION["user_id"]) || $_SESSION["role"] !== "vet") {
  http_response_code(401);
  echo json_encode(["success" => false, "message" => "Not allowed!"]);
  exit;
}

$stmt = $pdo->prepare("SELECT * FROM pets");
$stmt->execute();
$pets = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["success" => true, "pets" => $pets]);