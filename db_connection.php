<?php

require "config.php";

// Create a new database connection here (Use your database credentials)
$dbConnection = "";

$dblanguage = DB_LANGUAGE;
$host = DB_HOST;
$dbname = DB_NAME;
$username = DB_USERNAME;
$password = DB_PASSWORD;

try {
    $dbConnection = new PDO("$dblanguage:host=$host;dbname=$dbname", $username, $password);
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
    // Return an error message on failure
    echo json_encode("Connection to the database has failed: " . $e->getMessage());
}
