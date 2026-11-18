<?php
session_start();
header("Content-Type: application/json");
require "db.php";

if (!isset($_SESSION["user_id"]) || $_SESSION["role"] !== "vet") {
  http_response_code(401);
  echo json_encode(["success" => false, "message" => "Not allowed!"]);
  exit();
}

$stmt = $pdo->prepare(
  "SELECT p.pet_id, p.name, p.species, u.name AS owner_name
  FROM pets p
  INNER JOIN users u ON p.owner_id = u.user_id
  ORDER BY p.name;"
);
$stmt->execute();
$pets = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["success" => true, "pets" => $pets]);
