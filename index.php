<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Calendar</title>
    <!-- Link Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Link FullCalendar CSS -->
    <link href="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/main.min.css" rel="stylesheet">
    <!-- Link custom CSS -->
    <link href="style.css" rel="stylesheet">

    <!-- JQuery -->
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <!-- Moment JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment-with-locales.min.js"></script>
    <!-- Link Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Link FullCalendar JS -->
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js'></script>
    <!-- Link custom script.js -->
    <script src="script.js"></script>
</head>

<body>
<div class="container my-5">
    <h2>Event Calendar</h2>
    <p>Control panel</p>
    <p class="text-warning fw-bold">NOTE: Please, be aware events can ONLY be resized in the week or day views</p>
    <div id="calendar"></div>

    <!-- Event Form Modal -->
    <div class="modal fade" id="eventForm" tabindex="-1" aria-labelledby="eventFormLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="eventFormLabel">Event</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <input type="hidden" id="id">
                        <div class="mb-3">
                            <label for="title" class="form-label">Title</label>
                            <input type="text" class="form-control" id="title">
                        </div>
                        <div class="mb-3">
                            <label for="start" class="form-label">Start Date and Time</label>
                            <input type="datetime-local" class="form-control" id="start">
                        </div>
                        <div class="mb-3">
                            <label for="end" class="form-label">End Date and Time</label>
                            <input type="datetime-local" class="form-control" id="end">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" id="description" rows="3"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="backgroundColor" class="form-label">Background Color</label>
                            <input type="color" class="form-control" id="backgroundColor" value="#ffffff"
                                   style="height:30px;">
                        </div>
                        <div class="mb-3">
                            <label for="textColor" class="form-label">Text Color</label>
                            <input type="color" class="form-control" id="textColor" value="#000000"
                                   style="height:30px;">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id="addEventButton">Add Event</button>
                    <button type="button" class="btn btn-warning" id="editEventButton">Save changes</button>
                    <button type="button" class="btn btn-primary" id="resizeEventButton">Resize</button>
                    <button type="button" class="btn btn-danger" id="deleteEventButton">Delete</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>