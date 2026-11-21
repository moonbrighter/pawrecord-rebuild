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
  "SELECT p.pet_id, p.name, p.species, p.breed, p.birth_date,
         o.name AS owner_name,
         r.record_id,
         r.record_type,
         m.medication_name,
         r.administered_at,
         r.next_booster,
         CASE
           WHEN r.next_booster IS NULL THEN NULL
           WHEN r.next_booster < CURDATE() THEN 'overdue'
           WHEN r.next_booster <= CURDATE() + INTERVAL 3 DAY THEN 'due_soon'
           ELSE 'up_to_date'
         END AS booster_status
  FROM pets p
  INNER JOIN users o ON p.owner_id = o.user_id
  LEFT JOIN health_records r ON r.record_id = (
    SELECT r2.record_id
    FROM health_records r2
    WHERE r2.pet_id = p.pet_id
    ORDER BY r2.administered_at DESC, r2.record_id DESC
    LIMIT 1
  )
  LEFT JOIN medications m ON r.med_id = m.med_id
  ORDER BY p.name ASC"
);
$stmt->execute();
$pets = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["success" => true, "pets" => $pets]);
