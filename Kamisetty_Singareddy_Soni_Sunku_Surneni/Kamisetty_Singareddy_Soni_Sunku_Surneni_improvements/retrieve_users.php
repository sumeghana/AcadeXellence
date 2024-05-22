<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET"); // Change to GET method
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

$action = $_GET['action'] ?? '';
$user_id = $_GET['id'] ?? null; 

switch ($action) {
    case 'list_users':
        // Retrieve name, id, and role of all users from the Users table
        $stmt = $conn->prepare("SELECT username as username, id as userid, role as role FROM Users"); // Modify column names
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($users)) {
            echo json_encode(['error' => 'No users found']);
        } else {
            echo json_encode(['users' => $users]);
        }
        break;
    
    // Add other cases for different actions if needed

    default:
        echo json_encode(['error' => 'Invalid action specified.']);
        break;
}
?>
