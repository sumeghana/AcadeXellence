
text/x-generic Users.php ( PHP script, ASCII text )
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
}
?>