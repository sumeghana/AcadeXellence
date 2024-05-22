<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");
// Database connection
$host = "localhost";
$dbname = "sxs3330_wdm";
$username = "sxs3330_1";
$password = "Course_WDM";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    die();
}

$data = json_decode(file_get_contents("php://input"), true);

$action = $data['action'] ?? '';

switch ($action) {
   case 'add_todo':
        $stmt = $conn->prepare("INSERT INTO ToDos (user_id, todo) VALUES (:user_id, :todo)");
        $stmt->execute([
            ':user_id' => $data['user_id'],
            ':todo' => $data['todo']
        ]);
        echo json_encode(['result' => 'To-Do added']);
        break;

case 'get_todos':
    $stmt = $conn->prepare("SELECT * FROM ToDos");
    $stmt->execute();
    $todos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['todos' => $todos]);
    break;

    default:
        echo json_encode(['error' => 'Invalid action specified.']);
        break;
}