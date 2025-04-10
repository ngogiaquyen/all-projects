<?php
require_once 'app/App.php';

session_start();

$allowed_origins = [
    "https://ngogiaquyen.io.vn",
    "http://localhost:3000",
    "http://192.168.1.99:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

// header("Access-Control-Allow-Origin: https://ngogiaquyen.id.vn/");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once './bootstrap.php';
new App();