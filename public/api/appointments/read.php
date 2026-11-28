<?php
session_start();
header("Content-Type: application/json");
require __DIR__ . "/../db.php";

if (!isset($_SESSION["user_id"]) || $_SESSION["role"] !== "vet") {
  http_response_code(401);
  echo json_encode(["success" => false, "message" => "Not allowed!"]);
  exit();
}

$stmt = $pdo->prepare(
  "SELECT a.appt_id, a.pet_id, p.name AS pet_name, p.species, p.breed,
          o.name AS owner_name, a.reason, a.description,
          a.status, a.scheduled_at, a.requested_at
   FROM appointments a
   INNER JOIN pets p ON a.pet_id = p.pet_id
   INNER JOIN users o ON p.owner_id = o.user_id
   WHERE a.status = :status AND a.vet_id = :vet_id
   ORDER BY a.scheduled_at ASC",
);
$stmt->execute(["status" => "confirmed", "vet_id" => $_SESSION["user_id"]]);
$appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["success" => true, "appointments" => $appointments]);
