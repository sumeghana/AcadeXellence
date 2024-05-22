<?php

$apiKey = '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'; 

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

function askOpenAI($prompt, $apiKey) {
    $apiUrl = 'https://api.openai.com/v1/chat/completions?'; 

    $headers = [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ];

    $postData = json_encode([
        'model' => 'gpt-4-1106-preview', 
        'messages' => [['role' => 'user', 'content' => $prompt]], 
        'temperature' => 0.7, 
        'max_tokens' => 250
    ]);

    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    if (curl_errno($ch)) {
        $error_msg = curl_error($ch);
    }
    curl_close($ch);

    if (isset($error_msg)) {
        return ['error' => $error_msg];
    }

    return json_decode($response, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $topic = $data['topic'] ?? '';

    if (!empty($topic)) {
        // Formulate a prompt for question suggestions on the topic
        $prompt = "Provide a list of engaging and insightful questions about the topic: " . $topic;
        $aiResponse = askOpenAI($prompt, $apiKey);
        echo json_encode(['response' => $aiResponse]);
    } else {
        echo json_encode(['error' => 'No topic provided']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method. Please use POST.']);
}
?>
