<?php
include "config.php";
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

function writeToLog($conn, $user_id, $action) {
    $sql = "INSERT INTO Logs (user_id, action) VALUES (:user_id, :action)";

    try {
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':action', $action, PDO::PARAM_STR);
        $stmt->execute();
        return true; // Successfully logged the action
    } catch (PDOException $e) {
        // Handle any errors, e.g., log or return an error message
        error_log("Error writing to log: " . $e->getMessage());
        return false; // Failed to log the action
    }
}

// Database connection
$host = "localhost";
$dbname = "sxs3330_wdm";
$username = "sxs3330_1";
$password = "Course_WDM";

$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

// Check the connection
if (!$conn) {
die("Connection failed: " . mysqli_connect_error());
}

// Read JSON input
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);

// Check for registration
if (isset($data['action']) && $data['action'] === "register") {
    // Get data from JSON
$role = $data['role'];
$username = $data['username'];
$email = $data['email'];
$password = $data['password'];
$confirmPassword = $data['confirmPassword'];

    // SQL query to insert data into table
$sql = "INSERT INTO Users (role, username, email, password, confirmPassword) VALUES (:role, :username, :email, :password, :confirmPassword)";

    // Prepare the query
$stmt = $conn->prepare($sql);
    // Bind parameters
$stmt->bindParam(':role', $role, PDO::PARAM_STR);
$stmt->bindParam(':username', $username, PDO::PARAM_STR);
$stmt->bindParam(':email', $email, PDO::PARAM_STR);
$stmt->bindParam(':password', $password, PDO::PARAM_STR);
$stmt->bindParam(':confirmPassword', $confirmPassword, PDO::PARAM_STR);

    // Execute the query
try {
      $stmt->execute();
        
        // Get the last inserted ID
       $lastId = $conn->lastInsertId();
       writeToLog($conn, $user_id, 'registered');
       echo json_encode(["status" => "success", "message" => "User successfully registered.", "id" => $lastId]);
   } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
   }
}

// Check for login
elseif (isset($data['action']) && $data['action'] === "login") {
    // Get data from JSON
$username = $data['username'];
$password = $data['password'];

    // SQL query to check user and retrieve id
    $sql = "SELECT id, role FROM Users WHERE username = :username AND password = :password";

    // Prepare the query
 $stmt = $conn->prepare($sql);

    // Bind parameters
  $stmt->bindParam(':username', $username, PDO::PARAM_STR);
  $stmt->bindParam(':password', $password, PDO::PARAM_STR);

    // Execute the query
try {
      $stmt->execute();
       $result = $stmt->fetch(PDO::FETCH_ASSOC);

   if ($result) {
    writeToLog($conn, $result["id"], 'login');
    echo json_encode(["status" => "success", "role" => $result['role'], "id" => $result['id']]);
 } else {
        echo json_encode(["status" => "error", "message" => "Invalid username or password."]);
      }
 } catch (PDOException $e) {
       echo json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
 }
    
}
elseif (isset($data["action"]) && $data["action"] === "logout") {
    // Get user ID from the request (you may need to adjust how you obtain the user's ID based on your authentication system)
    $user_id = $data["user_id"] ?? null;

    if ($user_id) {
        // Log the 'logout' action in the Logs table
        $sql = "INSERT INTO Logs (user_id, action) VALUES (:user_id, 'logout')";

        // Prepare the query
        $stmt = $conn->prepare($sql);

        // Bind parameters
        $stmt->bindParam(":user_id", $user_id, PDO::PARAM_INT);

        // Execute the query
        try {
            $stmt->execute();
            writeToLog($conn, $user_id, 'logout');
            echo json_encode([
                "status" => "success",
                "message" => "User successfully logged out.",
            ]);
        } catch (PDOException $e) {
            echo json_encode([
                "status" => "error",
                "message" => "Error: " . $e->getMessage(),
            ]);
        }
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "User ID is required for logout.",
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid action specified.",
    ]);
}
?>

