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

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['action'])) {
    $action = $input['action'];
    
    switch ($action) {
        case 'create':
            $course_id = $input['course_id'];
            $course_name = $input['course_name'];
            $course_description = $input['course_description'];
            $instructor_id = $input['instructor_id'];
            
            $sql = "INSERT INTO Courses (course_id, course_name, course_description, instructor_id) VALUES ('$course_id', '$course_name', '$course_description', $instructor_id)";
            
            if ($conn->query($sql) === TRUE) {
                echo json_encode(['status' => 'success', 'message' => 'Course created successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => "Error: " . $sql . "<br>" . $conn->error]);
            }
            break;
            
        case 'read':
            $sql = "SELECT * FROM Courses";
            $result = $conn->query($sql);
            
            $courses = [];
            while ($row = $result->fetch_assoc()) {
                $courses[] = $row;
            }
            echo json_encode(['status' => 'success', 'data' => $courses]);
            break;
            
        case 'update':
            // Assuming course_id is what you're using to identify which course to update
            $course_id = $input['course_id'];
            $course_name = $input['course_name'];
            $course_description = $input['course_description'];
            
            $sql = "UPDATE Courses SET course_name='$course_name', course_description='$course_description' WHERE course_id='$course_id'";
            
            if ($conn->query($sql) === TRUE) {
                echo json_encode(['status' => 'success', 'message' => 'Course updated successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => "Error: " . $sql . "<br>" . $conn->error]);
            }
            break;
        
        case 'delete':
            $course_id = $input['course_id'];
            
            $sql = "DELETE FROM Courses WHERE course_id='$course_id'";
            
            if ($conn->query($sql) === TRUE) {
                echo json_encode(['status' => 'success', 'message' => 'Course deleted successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => "Error: " . $sql . "<br>" . $conn->error]);
            }
            break;
        
        default:
            echo json_encode(['status' => 'error', 'message' => 'Invalid action specified']);
            break;
            
            
            case 'enroll_student':
    // Ensure both user_id and course_id are provided in the request
    if (!isset($input['user_id'], $input['course_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'user_id and course_id required']);
        break;
    }

    $user_id = $input['user_id'];
    $course_id = $input['course_id'];

    // Begin transaction
    $conn->begin_transaction();

    try {
        // Check if student already exists
        $checkSql = "SELECT courses_enrolled FROM Students WHERE id = ?";
        $stmt = $conn->prepare($checkSql);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Student exists, update their courses
            $row = $result->fetch_assoc();
            $current_courses = $row['courses_enrolled'];
            // Append the new course ID to the existing list if it's not already there
            if (!in_array($course_id, explode(',', $current_courses))) {
                $updated_courses = $current_courses ? $current_courses . ',' . $course_id : $course_id;
                $updateSql = "UPDATE Students SET courses_enrolled = ? WHERE id = ?";
                $updateStmt = $conn->prepare($updateSql);
                $updateStmt->bind_param("si", $updated_courses, $user_id);
                $updateStmt->execute();
            }
        } else {
            // Student does not exist, create a new entry
            $insertSql = "INSERT INTO Students (id, courses_enrolled) VALUES (?, ?)";
            $insertStmt = $conn->prepare($insertSql);
            $insertStmt->bind_param("is", $user_id, $course_id);
            $insertStmt->execute();
        }

        // Commit the transaction
        $conn->commit();
        echo json_encode(['status' => 'success', 'message' => 'Student enrolled successfully']);
    } catch (Exception $e) {
        // Something went wrong, rollback
        $conn->rollback();
        echo json_encode(['status' => 'error', 'message' => "Enrollment failed: " . $e->getMessage()]);
    }
    break;

    case 'get_enrolled_courses':
    // Ensure the user_id is provided in the request
    if (!isset($input['user_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'user_id is required']);
        break;
    }

    $user_id = $input['user_id'];

    // Fetch the courses_enrolled from the Students table
    $studentSql = "SELECT courses_enrolled FROM Students WHERE id = ?";
    $studentStmt = $conn->prepare($studentSql);
    $studentStmt->bind_param("i", $user_id);
    $studentStmt->execute();
    $studentResult = $studentStmt->get_result();
    $enrolledCourses = [];

    if ($studentResult->num_rows > 0) {
        $studentRow = $studentResult->fetch_assoc();
        $enrolledCourseIds = explode(',', $studentRow['courses_enrolled']);

        // Fetch details for each enrolled course
        foreach ($enrolledCourseIds as $enrolledCourseId) {
            $courseSql = "SELECT * FROM Courses WHERE course_id = ?";
            $courseStmt = $conn->prepare($courseSql);
            $courseStmt->bind_param("s", $enrolledCourseId);
            $courseStmt->execute();
            $courseResult = $courseStmt->get_result();

            while ($courseRow = $courseResult->fetch_assoc()) {
                $enrolledCourses[] = $courseRow;
            }
        }

        echo json_encode(['status' => 'success', 'enrolled_courses' => $enrolledCourses]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No enrolled courses found for this student']);
    }
    break;
            
            
            
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'No action specified']);
}


$conn->close();
?>