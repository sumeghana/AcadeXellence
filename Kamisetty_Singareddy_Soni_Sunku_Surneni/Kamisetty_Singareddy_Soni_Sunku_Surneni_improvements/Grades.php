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
    case 'create':
        $stmt = $conn->prepare("INSERT INTO Grades (instructor_id, student_id, course_id, grade) VALUES (:instructor_id, :student_id, :course_id, :grade)");
        $stmt->execute([
            ':instructor_id' => $data['instructor_id'],
            ':student_id' => $data['student_id'],
            ':course_id' => $data['course_id'],
            ':grade' => $data['grade'],
        ]);
        echo json_encode(['result' => 'Grade created']);
        break;

    case 'read':
        $stmt = $conn->prepare("SELECT * FROM Grades");
        $stmt->execute();
        $grades = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['grades' => $grades]);
        break;

    case 'update':
        $stmt = $conn->prepare("UPDATE Grades SET grade = :grade WHERE grade_id = :grade_id");
        $stmt->execute([
            ':grade' => $data['grade'],
            ':grade_id' => $data['grade_id'],
        ]);
        echo json_encode(['result' => 'Grade updated']);
        break;

    case 'delete':
        $stmt = $conn->prepare("DELETE FROM Grades WHERE grade_id = :grade_id");
        $stmt->execute([
            ':grade_id' => $data['grade_id'],
        ]);
        echo json_encode(['result' => 'Grade deleted']);
        break;

    default:
        echo json_encode(['error' => 'Invalid action specified.']);
        break;
}