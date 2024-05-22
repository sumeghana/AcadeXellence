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

$action = $_GET['action'] ?? '';

switch ($action) {

    case 'total_courses':
        $stmt = $conn->prepare("SELECT COUNT(*) as total FROM Courses");
        $stmt->execute();
        $totalCourses = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode(['total_courses' => $totalCourses['total']]);
        break;

    case 'total_students':
        $stmt = $conn->prepare("SELECT COUNT(*) as total FROM Students");
        $stmt->execute();
        $totalStudents = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode(['total_students' => $totalStudents['total']]);
        break;

    default:
        echo json_encode(['error' => 'Invalid action specified.']);
        break;
}
?>