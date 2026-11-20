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
  "SELECT a.appt_id, a.pet_id, p.name AS pet_name, p.species,
          u.name AS owner_name, a.reason, a.description,
          a.status, a.scheduled_at
   FROM appointments a
   INNER JOIN pets p ON a.pet_id = p.pet_id
   LEFT JOIN users u ON a.vet_id = u.user_id
   WHERE a.status = :status
   ORDER BY a.scheduled_at ASC"
);
$stmt->execute(['status' => 'confirmed']);
$appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["success" => true, "appointments" => $appointments]);
