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
        $stmt = $conn->prepare("INSERT INTO Exams (exam_title, deadline, total_marks, duration, course_id, instructor_id, questions) VALUES (:exam_title, :deadline, :total_marks, :duration, :course_id, :instructor_id, :questions)");
        $stmt->execute([
            ':exam_title' => $data['exam_title'],
            ':deadline' => $data['deadline'],
            ':total_marks' => $data['total_marks'],
            ':duration' => $data['duration'],
            ':course_id' => $data['course_id'],
            ':instructor_id' => $data['instructor_id'],
            ':questions' => $data['questions'], // Storing questions
        ]);
        echo json_encode(['result' => 'Exam created']);
        break;
        
        
    case 'read':
        $stmt = $conn->prepare("SELECT * FROM Exams");
        $stmt->execute();
        $exams = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['exams' => $exams]);
        break;
        
      case 'update':
        $stmt = $conn->prepare("UPDATE Exams SET exam_title = :exam_title, deadline = :deadline, total_marks = :total_marks, duration = :duration, course_id = :course_id, instructor_id = :instructor_id, questions = :questions WHERE exam_id = :exam_id");
        $stmt->execute([
            ':exam_title' => $data['exam_title'],
            ':deadline' => $data['deadline'],
            ':total_marks' => $data['total_marks'],
            ':duration' => $data['duration'],
            ':course_id' => $data['course_id'],
            ':instructor_id' => $data['instructor_id'],
            ':questions' => $data['questions'], // Updating questions
            ':exam_id' => $data['exam_id'],
        ]);
        echo json_encode(['result' => 'Exam updated']);
        break;

    case 'delete':
        $stmt = $conn->prepare("DELETE FROM Exams WHERE exam_id = :exam_id");
        $stmt->execute([
            ':exam_id' => $data['exam_id'],
        ]);
        echo json_encode(['result' => 'Exam deleted']);
        break;

    case 'getExamsForStudent':
        $userId = $data['userId'];

        // Fetch courses in which the student is enrolled
        $stmt = $conn->prepare("SELECT courses_enrolled FROM Students WHERE id = :userId");
        $stmt->execute([':userId' => $userId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$result || empty($result['courses_enrolled'])) {
            echo json_encode(['error' => 'No courses found for the given student']);
            break;
        }

        $courses = explode(',', $result['courses_enrolled']); 
        $coursesPlaceholder = implode(',', array_fill(0, count($courses), '?'));

        $stmt = $conn->prepare("SELECT * FROM Exams WHERE course_id IN ($coursesPlaceholder)");
        $stmt->execute($courses);
        $exams = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['exams' => $exams]);
        break;

    default:
        echo json_encode(['error' => 'Invalid action specified.']);
        break;
}

?>