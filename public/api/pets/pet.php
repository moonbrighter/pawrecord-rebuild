<?php
session_start();
header("Content-Type: application/json");
require __DIR__ . "/../db.php";

if (!isset($_SESSION["user_id"]) || $_SESSION["role"] !== "vet") {
  http_response_code(401);
  echo json_encode(["success" => false, "message" => "Not allowed!"]);
  exit();
}

$id = $_GET["id"] ?? 0;

$stmt = $pdo->prepare(
  'SELECT pet_id, p.name, species, breed, birth_date,
          o.name AS owner_name
   FROM pets p
   INNER JOIN users o ON p.owner_id = o.user_id
   WHERE p.pet_id = ?
  ');

$stmt->execute([$id]);
$pet = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$pet) {
  http_response_code(404);
  echo json_encode(["success" => false, "message" => "Pet not found"]);
  exit();
}

$stmt = $pdo->prepare('
  SELECT r.record_id, r.record_type, m.medication_name, r.administered_at,
         r.next_booster,
         CASE
           WHEN r.next_booster IS NULL THEN NULL
           WHEN r.next_booster < CURDATE() THEN \'overdue\'
           WHEN r.next_booster <= CURDATE() + INTERVAL 3 DAY THEN \'due_soon\'
           ELSE \'up_to_date\'
         END AS booster_status
  FROM health_records r
  LEFT JOIN medications m ON r.med_id = m.med_id
  WHERE r.pet_id = ?
  ORDER BY r.administered_at DESC, r.record_id DESC
');
$stmt->execute([$id]);
$pet["records"] = $stmt->fetchAll(PDO::FETCH_ASSOC);

$stmt = $pdo->prepare('
  SELECT appt_id, scheduled_at, status, reason
  FROM appointments
  WHERE pet_id = ?
  ORDER BY scheduled_at DESC
');
$stmt->execute([$id]);
$pet["appointments"] = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["success" => true, "pet" => $pet]);
