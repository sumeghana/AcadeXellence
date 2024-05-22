<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
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
    case 'create':
        $stmt = $conn->prepare("INSERT INTO AcademicPrograms (program_name, department_name, instructor_id, program_description, degree_type, credit_hours_required, duration_years, program_start_date, program_end_date) VALUES (:program_name, :department_name, :instructor_id, :program_description, :degree_type, :credit_hours_required, :duration_years, :program_start_date, :program_end_date)");
        $stmt->execute([
            ':program_name' => $data['program_name'],
            ':department_name' => $data['department_name'],
            ':instructor_id' => $data['instructor_id'],
            ':program_description' => $data['program_description'],
            ':degree_type' => $data['degree_type'],
            ':credit_hours_required' => $data['credit_hours_required'],
            ':duration_years' => $data['duration_years'],
            ':program_start_date' => $data['program_start_date'],
            ':program_end_date' => $data['program_end_date']
        ]);
        echo json_encode(['result' => 'Academic program created']);
        break;
        
case 'read':
        // Check if the user_id is provided
            $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

        if ($user_id) {
            // Prepare a SQL statement to fetch the user's academic program
            $stmt = $conn->prepare("
                SELECT ap.*
                FROM AcademicPrograms ap
                JOIN Students s ON s.academic_program = ap.program_id
                WHERE s.id = :user_id
            ");
            // Execute the query with the user_id parameter
            $stmt->execute([':user_id' => $user_id]);
            // Fetch the result
            $program = $stmt->fetch(PDO::FETCH_ASSOC);
            // Check if a program was found
            if ($program) {
                echo json_encode(['program' => $program]);
            } else {
                echo json_encode(['error' => 'No program found for the provided user ID']);
            }
        } else {
            echo json_encode(['error' => 'User ID is required for this action']);
        }
        break;

        
    case 'update':
        $program_id = $_GET['program_id'] ?? null;
        if ($program_id) {
            $stmt = $conn->prepare("UPDATE AcademicPrograms SET program_name = :program_name, department_name = :department_name, instructor_id = :instructor_id, program_description = :program_description, degree_type = :degree_type, credit_hours_required = :credit_hours_required, duration_years = :duration_years, program_start_date = :program_start_date, program_end_date = :program_end_date WHERE program_id = :program_id");
            $stmt->execute([
                ':program_id' => $program_id,
                ':program_name' => $data['program_name'],
                ':department_name' => $data['department_name'],
                ':instructor_id' => $data['instructor_id'],
                ':program_description' => $data['program_description'],
                ':degree_type' => $data['degree_type'],
                ':credit_hours_required' => $data['credit_hours_required'],
                ':duration_years' => $data['duration_years'],
                ':program_start_date' => $data['program_start_date'],
                ':program_end_date' => $data['program_end_date']
            ]);
            echo json_encode(['result' => 'Academic program updated']);
        } else {
            echo json_encode(['error' => 'Program ID is required for this action']);
        }
        break;
        
    case 'delete':
        $program_id = $_GET['program_id'] ?? null;
        if ($program_id) {
            $stmt = $conn->prepare("DELETE FROM AcademicPrograms WHERE program_id = :program_id");
            $stmt->execute([':program_id' => $program_id]);
            echo json_encode(['result' => 'Academic program deleted']);
        } else {
            echo json_encode(['error' => 'Program ID is required for this action']);
        }
        break;
        
    default:
        echo json_encode(['error' => 'Invalid action specified.']);
        break;
}

?>
