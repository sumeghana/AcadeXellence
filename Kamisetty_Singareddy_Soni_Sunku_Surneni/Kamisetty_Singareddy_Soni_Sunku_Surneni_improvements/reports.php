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
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    die();
}

// Assuming the action is passed as a query string parameter
$action = isset($_GET['action']) ? $_GET['action'] : null;

switch ($action) {

    case 'get_pie_charts_data':
        // Course Enrollment Distribution Data
        $courseEnrollmentStmt = $conn->prepare(
            "SELECT Courses.course_name, COUNT(Grades.course_id) as student_count
             FROM Courses
             LEFT JOIN Grades ON Courses.course_id = Grades.course_id
             GROUP BY Courses.course_name"
        );
        $courseEnrollmentStmt->execute();
        $courseEnrollmentData = $courseEnrollmentStmt->fetchAll(PDO::FETCH_ASSOC);

        // Grade Distribution Data
        $gradeDistributionStmt = $conn->prepare(
            "SELECT grade, COUNT(*) as grade_count
             FROM Grades
             GROUP BY grade"
        );
        $gradeDistributionStmt->execute();
        $gradeDistributionData = $gradeDistributionStmt->fetchAll(PDO::FETCH_ASSOC);

        // Return the data as JSON
        echo json_encode([
            'course_enrollment' => $courseEnrollmentData,
            'grade_distribution' => $gradeDistributionData
        ]);
        break;

    // ... (other cases)

    // default case to handle unknown actions
    default:
        echo json_encode(['error' => 'Action not recognized']);
        break;
}

// It's important to close the connection
$conn = null;
?>
