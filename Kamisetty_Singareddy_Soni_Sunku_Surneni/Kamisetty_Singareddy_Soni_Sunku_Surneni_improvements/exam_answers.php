<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
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

// Handling GET and POST requests differently
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    // Assuming data is sent as JSON
    $data = json_decode(file_get_contents("php://input"), true);

    // Insert data into ExamAnswers table
    $stmt = $conn->prepare("INSERT INTO ExamAnswers (student_id, exam_id, question_text, answer_text, marks_awarded) VALUES (:student_id, :exam_id, :question_text, :answer_text, :marks_awarded)");
    $stmt->execute([
        ':student_id' => $data['student_id'],
        ':exam_id' => $data['exam_id'],
        ':question_text' => $data['question_text'],
        ':answer_text' => $data['answer_text'],
        ':marks_awarded' => $data['marks_awarded']
    ]);

    echo json_encode(['result' => 'Answer submitted successfully']);
} elseif ($method == 'GET') {
    // Fetching all answers for a specific exam and student
    $exam_id = $_GET['exam_id'] ?? '';
    $student_id = $_GET['student_id'] ?? '';

    $stmt = $conn->prepare("SELECT * FROM ExamAnswers WHERE exam_id = :exam_id AND student_id = :student_id");
    $stmt->execute([
        ':exam_id' => $exam_id,
        ':student_id' => $student_id
    ]);

    $answers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['answers' => $answers]);
}
?>
