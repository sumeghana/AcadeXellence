<?php
include "config.php";
require "../../vendor/autoload.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header(
    "Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With"
);

$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

// Check the connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Read JSON input
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);

$action = $data["action"];
$email = $data["email"];

switch ($action) {
    case "create":
        $otp = rand(100000, 999999);
        $sql = "INSERT INTO OTP (email, otp) VALUES (:email, :otp)";
        $stmt = $conn->prepare($sql);

        // Bind parameters
        $stmt->bindParam(":email", $email, PDO::PARAM_STR);
        $stmt->bindParam(":otp", $otp, PDO::PARAM_INT);

        // Execute the query
        try {
            $stmt->execute();

            // Get the last inserted ID
            $lastId = $conn->lastInsertId();

            // Send OTP via email
            $mail = new PHPMailer();
            $mail->isSMTP();
            $mail->SMTPSecure = "ssl";
            $mail->Host = $smtpHost; // Specify your SMTP server
            $mail->Port = $smtpPort; // Specify the SMTP port
            $mail->SMTPAuth = true; // Enable SMTP authentication
            $mail->Username = $smtpUsername; // SMTP username
            $mail->Password = $smtpPassword; // SMTP password
            $mail->setFrom("$smtpUsername", "OTP Verification");
            $mail->addAddress($email, $username);
            $mail->isHTML(true);
            $mail->Subject = "OTP Verification";
            $mail->Body = "Your OTP is: " . $otp;
            if (!$mail->send()) {
                echo json_encode(["error" => "Error sending OTP"]);
                exit();
            } else {
                echo json_encode(["success" => "success"]);
            }
        } catch (PDOException $e) {
            echo json_encode([
                "status" => "error",
                "message" => "Error: " . $e->getMessage(),
            ]);
        }
        break;
    case "verify":
        $otp = $data["otp"];
        $sql = "SELECT 1 FROM OTP WHERE email = :email AND otp = :otp";
        $stmt = $conn->prepare($sql);

    // Bind parameters
    $stmt->bindParam(":otp", $otp, PDO::PARAM_STR);
    $stmt->bindParam(":email", $email, PDO::PARAM_STR);

    // Execute the query
    try {
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode([
                "status" => "success"
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Invalid OTP",
            ]);
        }
    } catch (PDOException $e) {
        echo json_encode([
            "status" => "error",
            "message" => "Error: " . $e->getMessage(),
        ]);
    }
    break;
        
}
