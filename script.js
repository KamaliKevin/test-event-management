document.addEventListener('DOMContentLoaded', function() {
    // Initialize FullCalendar with the fetched events data
    let calendarEl = document.getElementById("calendar");
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        eventTimeFormat: {
            // Set the time format for events
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: '', // Remove AM/PM indicators
            hour12: false // Use 24-hour format
        },
        slotLabelFormat: {
            // Set the time format for week view columns
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: '', // Remove AM/PM indicators
            hour12: false // Use 24-hour format
        },
        firstDay: 1, // Set Monday as the first day of the week (0 is Sunday, 1 is Monday, etc.)
        viewDidMount: function (info) {
            // Show the custom date format only for week view
            if (info.view.type === 'timeGridWeek') {
                calendar.setOption('dayHeaderFormat', function (info) {
                    return moment(info.date).format("ddd D/M");
                });
            } else {
                calendar.setOption('dayHeaderFormat', { weekday: 'short' });
            }
        },
        viewWillUnmount: function (info) {
            // Reset the dayHeaderFormat when switching views to prevent
            // the custom format from carrying over to other views
            calendar.setOption('dayHeaderFormat', { weekday: 'short' });
        },
        events: "events_data.php?action=list",
        editable: true,
        eventResizableFromStart: true, // Allow resizing from the start (top side)
        eventDurationEditable: true, // Allow resizing the event's duration
        droppable: true,
        eventResize: function (info) {
            // Get the updated event data
            let id = info.event.id;

            // Get the updated event data
            let start = info.event.start;
            let end = info.event.end;

            let newStart = moment(start).format("YYYY-MM-DD HH:mm");
            let newEnd = moment(end).format("YYYY-MM-DD HH:mm");

            // Perform an AJAX request to update the database
            $.ajax({
                type: "POST",
                url: "events_data.php?action=resize",
                data: {
                    id: id,
                    start: newStart,
                    end: newEnd
                },
                success: function(response) {
                    calendar.refetchEvents();
                },
                error: function(error) {
                    alert("Error resizing and updating event: " + error);
                }
            });

        },
        eventDrop: function(info) {
            // You can handle the event drop logic here, such as updating the start and end dates
            // on the server-side.

            // Get the updated event data
            let id = info.event.id;

            let start = info.event.start;
            let end = info.event.end;

            let newStart = moment(start).format("YYYY-MM-DD HH:mm");
            let newEnd = moment(end).format("YYYY-MM-DD HH:mm");


            // Perform an AJAX request to update the database
            $.ajax({
                type: "POST",
                url: "events_data.php?action=drag",
                data: {
                    id: id,
                    start: newStart,
                    end: newEnd
                },
                success: function(response) {
                    calendar.refetchEvents();
                },
                error: function(error) {
                    alert("Error dragging and updating event: " + error);
                }
            });
        },
        dateClick: function (info) {
            emptyEventForm();

            // Get the clicked moment
            let clickedMoment = info.dateStr;

            // Get the current type of view
            let currentView = info.view.type;

            // Default start and end dates
            let start = "";
            let end = "";

            if (currentView === "dayGridMonth") {
                // If in month view, use the clicked date and current time as start / current time and +1 hour as end
                start = clickedMoment + " " + moment().format("HH:mm");
                end = clickedMoment + " " + moment().add(1, "hour").format("HH:mm");
            }
            else {
                // If in week/day view, use the clicked date and selected time as start:
                start = moment(clickedMoment).format("YYYY-MM-DD HH:mm");
                if(info.allDay){
                    // If "all day" is clicked, end time should be 12:00AM/00:00 of the following day:
                    end = moment(clickedMoment).add(24, "hour").format("YYYY-MM-DD HH:mm");
                }
                else {
                    // If "all day" is ignored and a random time was clicked, end time is +1 the start time:
                    end = moment(clickedMoment).add(1, "hour").format("YYYY-MM-DD HH:mm");
                }
            }

            // Update the date inputs in the form
            $("#start").val(start);
            $("#end").val(end);

            // Show the corresponding buttons
            $("#addEventButton").show();
            $("#editEventButton").hide();
            $("#resizeEventButton").hide();
            $("#deleteEventButton").hide();

            // Show the event form modal
            $("#eventForm").modal("show");
        },
        eventClick: function(info) {
            emptyEventForm();

            // Get the current type of view
            let currentView = info.view.type;

            // Getting the date and times in the correct format
            let start = info.event.start;
            let end = info.event.end;

            let newStart = moment(start).format("YYYY-MM-DD HH:mm");
            let newEnd = moment(end).format("YYYY-MM-DD HH:mm");

            // Update the form data
            $("#id").val(info.event.id);
            $("#title").val(info.event.title);
            $("#start").val(newStart);
            $("#end").val(newEnd);
            $("#description").val(info.event.extendedProps.description);
            $("#backgroundColor").val(info.event.backgroundColor);
            $("#textColor").val(info.event.textColor);


            // Show the corresponding buttons
            $("#addEventButton").hide();
            $("#editEventButton").show();

            if(currentView === "dayGridMonth"){
                $("#resizeEventButton").show();
            }
            else {
                $("#resizeEventButton").hide();
            }

            $("#deleteEventButton").show();


            // Show the event form modal
            $("#eventForm").modal("show");
        }
    });


    calendar.render();


    // Add Event button click handler
    $("#addEventButton").click(function () {
        $("#eventForm").modal("hide");

        // Submit the form data to add the event
        $.ajax({
            type: "POST",
            url: "events_data.php?action=add",
            data: getEventFormData(),
            dataType: "json", // Add this line to parse response as JSON
            success: function (response) {
                if (response.success) {
                    // On success, display a success message and refresh the calendar
                    $("#successModalBody").html("<div class='alert alert-success'>" +
                        "<i class='fa-solid fa-circle-check text-success'></i>" +
                        "<span class='text-success fw-bold'> Event added successfully</span></div>");
                    $("#successModal").modal("show");
                    calendar.refetchEvents();
                }
                else {
                    // On error, display the error message in the modal
                    let errorMessage = "<div class='alert alert-danger'>" +
                        "<i class='fa-solid fa-circle-xmark text-danger'></i>" +
                        "<span class='text-danger fw-bold'> There was an error adding the event:</span><br>";
                    for (let i = 0; i < response.errors.length; i++) {
                        errorMessage += "• " + response.errors[i] + "<br>";
                    }
                    errorMessage += "</div>";

                    $("#errorModalBody").html(errorMessage);
                    $("#errorModal").modal("show");
                }
            },
            error: function (error) {
                // On other error, display a generic error message
                $("#errorModalBody").html("<div class='alert alert-danger'>" +
                    "<i class='fa-solid fa-circle-xmark text-danger'></i>" +
                    "<span class='text-danger fw-bold'> There was an error adding the event</span></div>");
                $("#errorModal").modal("show");
            }
        });
    });


    // Save changes button click handler
    $("#editEventButton").click(function () {
        $("#eventForm").modal("hide");

        // Submit the form data to edit the event
        $.ajax({
            type: "POST",
            url: "events_data.php?action=edit",
            data: getEventFormData(),
            dataType: "json", // Add this line to parse response as JSON
            success: function (response) {
                if (response.success) {
                    // On success, display a success message and refresh the calendar
                    $("#successModalBody").html("<div class='alert alert-success'>" +
                        "<i class='fa-solid fa-circle-check text-success'></i>" +
                        "<span class='text-success fw-bold'> Event edited successfully</span></div>");
                    $("#successModal").modal("show");
                    calendar.refetchEvents();
                }
                else {
                    // On error, display the error message in the modal
                    let errorMessage = "<div class='alert alert-danger'>" +
                        "<i class='fa-solid fa-circle-xmark text-danger'></i>" +
                        "<span class='text-danger fw-bold'> There was an error editing the event:</span><br>";
                    for (let i = 0; i < response.errors.length; i++) {
                        errorMessage += "• " + response.errors[i] + "<br>";
                    }
                    errorMessage += "</div>";

                    $("#errorModalBody").html(errorMessage);
                    $("#errorModal").modal("show");
                }
            },
            error: function (error) {
                // On other error, display a generic error message
                $("#errorModalBody").html("<div class='alert alert-danger'>" +
                    "<i class='fa-solid fa-circle-xmark text-danger'></i>" +
                    "<span class='text-danger fw-bold'> There was an error editing the event</span></div>");
                $("#errorModal").modal("show");
            }
        });
    });


    // Resize Event button click handler
    $("#resizeEventButton").click(function () {
        // Get the form data the view can be directed towards a specific week:
        let data = getEventFormData();

        // Get the start date of the week from the retrieved data
        let startOfWeek = moment(data.start).format("YYYY-MM-DD HH:mm");

        $("#eventForm").modal("hide"); // Close the modal

        // Change to the timeGridWeek view
        calendar.changeView("timeGridWeek", startOfWeek);
    });


    // Delete Event button click handler
    $("#deleteEventButton").click(function () {
        $("#eventForm").modal("hide");
        $("#confirmDeleteModal").modal("show");
    });


    // Confirm Delete button click handler
    $("#confirmDeleteButton").click(function () {
        $("#confirmDeleteModal").modal("hide");

        // Get the event ID
        let id = $("#id").val();

        // Submit the form data to delete the event
        $.ajax({
            type: "POST",
            url: "events_data.php?action=delete",
            data: { id: id },
            dataType: 'json', // Add this line to parse response as JSON
            success: function (response) {
                if (response.success) {
                    // On success, display a success message and refresh the calendar
                    $("#successModalBody").html("<div class='alert alert-success'>" +
                        "<i class='fa-solid fa-circle-check text-success'></i>" +
                        "<span class='text-success fw-bold'> Event deleted successfully</span></div>");
                    $("#successModal").modal("show");
                    calendar.refetchEvents();
                }
                else {
                    // On error, display the error message in the modal
                    $("#errorModalBody").html("<div class='alert alert-danger'>" +
                        "<i class='fa-solid fa-circle-xmark text-danger'></i>" +
                        "<span class='text-danger fw-bold'>There was an unknown error deleting the event</span></div>");
                    $("#errorModal").modal("show");
                }
            },
            error: function (error) {
                // On other error, display a generic error message
                $("#errorModalBody").html("<div class='alert alert-danger'>" +
                    "<i class='fa-solid fa-circle-xmark text-danger'></i>" +
                    "<span class='text-danger fw-bold'>There was an unknown error deleting the event</span></div>");
                $("#errorModal").modal("show");
            }
        });
    });



    // FUNCTIONS:
    function emptyEventForm() {
        $("#id").val("");
        $("#title").val("");
        $("#start").val("");
        $("#end").val("");
        $("#description").val("");
        $("#backgroundColor").val("#FFFFFF");
        $("#textColor").val("#000000");
    }

    function getEventFormData() {
        return {
            id: $("#id").val(),
            title: $("#title").val(),
            start: $("#start").val(),
            end: $("#end").val(),
            description: $("#description").val(),
            backgroundColor: $("#backgroundColor").val(),
            textColor: $("#textColor").val()
        }
    }

    function displayErrorMessage(message) {
        let errorEl = $("#errors");
        errorEl.html("<div class='alert alert-danger' role='alert'>" + message + "</div>");
    }
});