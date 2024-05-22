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
$user_id = $_GET['id'] ?? null; 
switch ($action) {
    case 'view':
    if ($user_id) {
        $stmt = $conn->prepare("SELECT * FROM Users WHERE id = :id");
        $stmt->execute([':id' => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            echo json_encode(['error' => 'User not found']);
            break;
        }

        if (strtolower($user['role']) === 'student') {
            $stmt = $conn->prepare("SELECT * FROM Students WHERE id = :id");
            $stmt->execute([':id' => $user_id]);
            $additionalInfo = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($additionalInfo) {
                $user = array_merge($user, $additionalInfo);
            } else {
                echo json_encode(['error' => 'Student information not found']);
                break;
            }
        }

            if ($user['role'] === 'instructor') {
                $stmt = $conn->prepare("SELECT * FROM Instructors WHERE id = :id");
                $stmt->execute([':id' => $user_id]);
                $additionalInfo = $stmt->fetch(PDO::FETCH_ASSOC);
                $user = array_merge($user, $additionalInfo);
            }
            
            
            if (strtolower($user['role']) === 'programcoordinator') {
    $stmt = $conn->prepare("SELECT * FROM ProgramCoordinators WHERE id = :id");
    $stmt->execute([':id' => $user_id]);
    $additionalInfo = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($additionalInfo) {
        $user = array_merge($user, $additionalInfo);
    } else {
        echo json_encode(['error' => 'Program Coordinator information not found']);
        break;
    }
}

            
            
            
            
            

            echo json_encode(['user' => $user]);
        } else {
            echo json_encode(['error' => 'User ID is required for this action']);
        }
        break;
        
    // case 'edit':
    //     if($user_id) {
    //         $stmt = $conn->prepare("UPDATE Users SET email = :email, username = :username, role = :role WHERE id = :id");
    //         $stmt->execute([
    //             ':id' => $user_id,
    //             ':email' => $data['email'],
    //             ':username' => $data['username'],
    //             ':role' => $data['role'],
    //         ]);
    //         echo json_encode(['result' => 'User updated']);
    //     } else {
    //         echo json_encode(['error' => 'User ID is required for this action']);
    //     }
    //     break;
        
    // default:
    //     echo json_encode(['error' => 'Invalid action specified.']);
    //     break;
    //         case 'get_totals':
    //     $stmt = $conn->prepare("SELECT COUNT(*) as total FROM Courses");
    //     $stmt->execute();
    //     $totalCourses = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    //     $stmt = $conn->prepare("SELECT COUNT(*) as total FROM Students");
    //     $stmt->execute();
    //     $totalStudents = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    //     echo json_encode([
    //         'total_courses' => $totalCourses,
    //         'total_students' => $totalStudents
    //     ]);
    //     break;
    
    
    
    case 'edit':
    if ($user_id) {
        // First, update the Users table
        $stmt = $conn->prepare("UPDATE Users SET email = :email, username = :username, role = :role WHERE id = :id");
        $stmt->execute([
            ':id' => $user_id,
            ':email' => $data['email'],
            ':username' => $data['username'],
            ':role' => $data['role'],
        ]);

        // If the role is 'student', attempt to update the Students table
        if (strtolower($data['role']) === 'student') {
            // Check if this user is already in the Students table
            $checkStmt = $conn->prepare("SELECT id FROM Students WHERE id = :id");
            $checkStmt->execute([':id' => $user_id]);
            $exists = $checkStmt->fetch(PDO::FETCH_ASSOC);

            // Prepare data for the student table
            $academic_program = $data['academic_program'] ?? null;
            $college = $data['college'] ?? null;
            $courses_enrolled = $data['courses_enrolled'] ?? null;
            $name = $data['name'] ?? null;
            $program = $data['program'] ?? null;
            $semester = $data['semester'] ?? null;

            if ($exists) {
                // Update the existing student record
                $studentStmt = $conn->prepare("UPDATE Students SET academic_program = :academic_program, college = :college, courses_enrolled = :courses_enrolled, name = :name, program = :program, semester = :semester WHERE id = :id");
                $studentStmt->execute([
                    ':id' => $user_id,
                    ':academic_program' => $academic_program,
                    ':college' => $college,
                    ':courses_enrolled' => $courses_enrolled,
                    ':name' => $name,
                    ':program' => $program,
                    ':semester' => $semester,
                ]);
            } else {
                // Insert a new student record if not exists
                $studentStmt = $conn->prepare("INSERT INTO Students (id, academic_program, college, courses_enrolled, name, program, semester) VALUES (:id, :academic_program, :college, :courses_enrolled, :name, :program, :semester)");
                $studentStmt->execute([
                    ':id' => $user_id,
                    ':academic_program' => $academic_program,
                    ':college' => $college,
                    ':courses_enrolled' => $courses_enrolled,
                    ':name' => $name,
                    ':program' => $program,
                    ':semester' => $semester,
                ]);
            }
        }

        echo json_encode(['result' => 'User updated']);
    } else {
        echo json_encode(['error' => 'User ID is required for this action']);
    }
    break;

case 'get_counts':
    // Get the total number of users
    $usersStmt = $conn->prepare("SELECT COUNT(*) as total_users FROM Users");
    $usersStmt->execute();
    $totalUsers = $usersStmt->fetch(PDO::FETCH_ASSOC)['total_users'];

    // Get the total number of courses
    $coursesStmt = $conn->prepare("SELECT COUNT(*) as total_courses FROM Courses");
    $coursesStmt->execute();
    $totalCourses = $coursesStmt->fetch(PDO::FETCH_ASSOC)['total_courses'];

    // Return the counts as JSON
    echo json_encode([
        'total_users' => $totalUsers,
        'total_courses' => $totalCourses
    ]);
    break;

        
        
    case 'list_students':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $stmt = $conn->prepare("SELECT Users.id, Users.email, Users.username, Users.role, Students.* FROM Users JOIN Students ON Users.id = Students.id WHERE Users.role = 'student'");
            $stmt->execute();
            $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($students)) {
                echo json_encode(['error' => 'No students found']);
            } else {
                echo json_encode(['students' => $students]);
            }
        } else {
            echo json_encode(['error' => 'Method not allowed. Use POST for this action.']);
        }
        break;

}
?>
