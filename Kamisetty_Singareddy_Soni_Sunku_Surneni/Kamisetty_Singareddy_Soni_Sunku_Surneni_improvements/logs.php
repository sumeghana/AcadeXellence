<?php
include 'config.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
$user_id = $_GET["id"];
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // $query = "SELECT * FROM Logs WHERE Logs.id = :id"; // You can customize this query as needed

    $stmt = $conn->prepare("SELECT * FROM Logs WHERE Logs.user_id = :id");
    $stmt->execute([":id" => $user_id]);
    $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Output the result as JSON
    echo json_encode($logs);
} catch (PDOException $e) {
    // Handle any potential errors
    http_response_code(500); // Internal Server Error
    echo json_encode(array('error' => $e->getMessage()));
}
