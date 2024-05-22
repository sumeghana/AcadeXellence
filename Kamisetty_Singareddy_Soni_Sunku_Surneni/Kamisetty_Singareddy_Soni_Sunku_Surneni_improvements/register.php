<?php
// header("Content-Type: application/json");
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

// // Database connection
// $host = "localhost";
// $dbname = "sxs3330_wdm";
// $username = "sxs3330_1";
// $password = "Course_WDM";


// $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

// // Check the connection
// if (!$conn) {
//     die("Connection failed: " . mysqli_connect_error());
// }

// // Read JSON input
// $json_data = file_get_contents("php://input");
// $data = json_decode($json_data, true);

// // Get data from JSON or POST (depending on your test method)
// $role = $data['role'];
// $username = $data['username'];
// $email = $data['email'];
// $password = $data['password'];
// $confirmPassword = $data['confirmPassword'];


// // SQL query to insert data into table
// $sql = "INSERT INTO Users (role, username, email, password, confirmPassword) VALUES (:role, :username, :email, :password, :confirmPassword)";

// // Prepare the query
// $stmt = $conn->prepare($sql);

// // Bind parameters
// $stmt->bindParam(':role', $role, PDO::PARAM_STR);
// $stmt->bindParam(':username', $username, PDO::PARAM_STR);
// $stmt->bindParam(':email', $email, PDO::PARAM_STR);
// $stmt->bindParam(':password', $password, PDO::PARAM_STR);
// $stmt->bindParam(':confirmPassword', $confirmPassword, PDO::PARAM_STR);

// // Execute the query
// try {
//     $stmt->execute();
//     echo json_encode(["status" => "User successfully registered"]);
// } catch (PDOException $e) {
//         echo json_encode(["Error" => $e->getMessage()]);
    
// }
// try {
//     $stmt->execute();
//     $userId = $conn->lastInsertId(); // Get the last inserted user ID

//     // Check if the role is 'student' and insert into students table
//     if ($role === 'student') {
//         $sql_student = "INSERT INTO Students (id) VALUES (:userId)";
//         $stmt_student = $conn->prepare($sql_student);
//         $stmt_student->bindParam(':userId', $userId, PDO::PARAM_INT);
//         $stmt_student->execute();
//     }

//     echo json_encode(["status" => "User successfully registered"]);
// } catch (PDOException $e) {
//     echo json_encode(["Error" => $e->getMessage()]);
// }


header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

try {
    // Database connection
    $host = "localhost";
    $dbname = "sxs3330_wdm";
    $username = "sxs3330_1";
    $password = "Course_WDM";
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

    // Read JSON input
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);

    $role = $data['role'];
    $username = $data['username'];
    $email = $data['email'];
$password = $data['password'];
$confirmPassword = $data['confirmPassword'];

    // Begin transaction
    $conn->beginTransaction();

    // SQL query to insert data into Users table
$sql = "INSERT INTO Users (role, username, email, password, confirmPassword) VALUES (:role, :username, :email, :password, :confirmPassword)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':role', $role, PDO::PARAM_STR);
$stmt->bindParam(':username', $username, PDO::PARAM_STR);
$stmt->bindParam(':email', $email, PDO::PARAM_STR);
$stmt->bindParam(':password', $password, PDO::PARAM_STR);
$stmt->bindParam(':confirmPassword', $confirmPassword, PDO::PARAM_STR);

$stmt->execute();
$userId = $conn->lastInsertId();


    if ($role === 'student') {
        $sql_student = "INSERT INTO Students (id) VALUES (:userId)";
        $stmt_student = $conn->prepare($sql_student);
        $stmt_student->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt_student->execute();
    }

    // Commit transaction
    $conn->commit();
    echo json_encode(["status" => "User successfully registered"]);
} catch (PDOException $e) {
    $conn->rollBack(); // Roll back the transaction on error
    echo json_encode(["Error" => $e->getMessage()]);
}

?>
