<?php

header("Content-Type: application/json");
require "db_connection.php";
global $dbConnection;

if(isset($_GET["action"])){
    switch ($_GET["action"]){
        case "list":
            // Query to get events data from the "events" table
            $selectSql = /** @lang text */
                "SELECT id, title, start, end, description, backgroundColor, textColor FROM events";

            // Prepare and execute the query
            $selectStmt = $dbConnection->prepare($selectSql);
            $selectStmt->execute();

            // Fetch all the events data as an associative array
            $events = $selectStmt->fetchAll(PDO::FETCH_ASSOC);

            // Return the events data as JSON
            echo json_encode($events);

            break;



        case "add":
            // Get the event data from the POST request
            $title = $_POST["title"];
            $start = $_POST["start"];
            $end = $_POST["end"];
            $description = $_POST["description"];
            $backgroundColor = $_POST["backgroundColor"];
            $textColor = $_POST["textColor"];

            // Prepare the SQL statement for inserting the event into the "events" table
            $insertSql = /** @lang text */
                "INSERT INTO events (title, start, end, description, backgroundColor, textColor) 
                VALUES (:title, :start, :end, :description, :backgroundColor, :textColor)";

            $insertStmt = $dbConnection->prepare($insertSql);

            // Bind the parameters
            $insertStmt->bindParam(":title", $title);
            $insertStmt->bindParam(":start", $start);
            $insertStmt->bindParam(":end", $end);
            $insertStmt->bindParam(":description", $description);
            $insertStmt->bindParam(":backgroundColor", $backgroundColor);
            $insertStmt->bindParam(":textColor", $textColor);

            // Execute the SQL statement to insert the event
            $insertStmt->execute();

            // Return the data as JSON
            echo json_encode($insertStmt);

            break;



        case "edit":
            // Get the event data from the POST request
            $id = $_POST["id"];
            $title = $_POST["title"];
            $start = $_POST["start"];
            $end = $_POST["end"];
            $description = $_POST["description"];
            $textColor = $_POST["textColor"];
            $backgroundColor = $_POST["backgroundColor"];

            // Prepare the SQL statement for updating the event in the "events" table
            $updateSql = /** @lang text */
                "UPDATE events SET 
                title = :title, 
                start = :start, 
                end = :end, 
                description = :description, 
                textColor = :textColor, 
                backgroundColor = :backgroundColor 
                WHERE id = :id";

            $updateStmt = $dbConnection->prepare($updateSql);

            // Bind the parameters
            $updateStmt->bindParam(":id", $id);
            $updateStmt->bindParam(":title", $title);
            $updateStmt->bindParam(":start", $start);
            $updateStmt->bindParam(":end", $end);
            $updateStmt->bindParam(":description", $description);
            $updateStmt->bindParam(":textColor", $textColor);
            $updateStmt->bindParam(":backgroundColor", $backgroundColor);

            // Execute the SQL statement to update the event
            $updateStmt->execute();

            // Return the response as JSON
            echo json_encode($updateStmt);

            break;



        case "drag":
            // Get the event data from the POST request
            $id = $_POST["id"];
            $start = $_POST["start"];
            $end = $_POST["end"];


            // Prepare the SQL statement for updating the event in the "events" table
            $dragSql = /** @lang text */
                "UPDATE events SET 
                start = :start, 
                end = :end 
                WHERE id = :id";

            $dragStmt = $dbConnection->prepare($dragSql);

            // Bind the parameters
            $dragStmt->bindParam(":id", $id);
            $dragStmt->bindParam(":start", $start);
            $dragStmt->bindParam(":end", $end);

            // Execute the SQL statement to update the event
            $dragStmt->execute();

            // Return the response as JSON
            echo json_encode($dragStmt);

            break;



        case "resize":
            // Get the event data from the POST request
            $id = $_POST["id"];
            $start = $_POST["start"];
            $end = $_POST["end"];


            // Prepare the SQL statement for updating the event in the "events" table
            $resizeSql = /** @lang text */
                "UPDATE events SET 
                start = :start, 
                end = :end 
                WHERE id = :id";

            $resizeStmt = $dbConnection->prepare($resizeSql);

            // Bind the parameters
            $resizeStmt->bindParam(":id", $id);
            $resizeStmt->bindParam(":start", $start);
            $resizeStmt->bindParam(":end", $end);

            // Execute the SQL statement to update the event
            $resizeStmt->execute();

            // Return the response as JSON
            echo json_encode($resizeStmt);

            break;



        case "delete":
            $id = $_POST["id"];

            // Prepare the SQL statement to delete the event from the "events" table
            $deleteSql = /** @lang text */
                "DELETE FROM events WHERE id = :id";

            $deleteStmt = $dbConnection->prepare($deleteSql);

            $deleteStmt->bindParam(":id", $id);

            // Execute the SQL statement to delete the event
            $deleteStmt->execute();

            // Return the response as JSON
            echo json_encode($deleteStmt);

            break;



        default:
            echo json_encode("Action could not be done");
            break;
    }
}