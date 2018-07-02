var config = {
    apiKey: "AIzaSyD-LntO4pfFkAW_MmZwr_hGnqzRfL4i9rw",
    authDomain: "train-scheduler-2b0f1.firebaseapp.com",
    databaseURL: "https://train-scheduler-2b0f1.firebaseio.com",
    projectId: "train-scheduler-2b0f1",
    storageBucket: "train-scheduler-2b0f1.appspot.com",
    messagingSenderId: "1090225822346"
};

firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function () {
    $(".submit").on("click", function (event) {
        event.preventDefault();

        // Grabbed values from text boxes
        name = $("#name-input").val().trim();
        destination = $("#destination-input").val().trim();
        var time = moment($("#time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
        frequency = $("#frequency-input").val().trim();

        // Code for handling the push
        database.ref().push({
            name: name,
            destination: destination,
            time: time,
            frequency: frequency
        });

        $("#name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");

        return false;
    });

   
    database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {

        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();
        var tName = sv.name;
        var tDestination = sv.destination;
        var tTime = sv.time;
        var tFrequency = sv.frequency;
       
        let tRemainder = moment().diff(moment.unix(tTime), "minutes") % tFrequency ;
        var tMinutes = tFrequency - tRemainder;
        var tArrival = moment().add(tMinutes, "m").format("hh:mm");

        var newTr = $("<tr>");
        var td1 = $("<td>");
        var td2 = $("<td>");
        var td3 = $("<td>");
        var td4 = $("<td>");
        var td5 = $("<td>");

        


        td1.text(tName);
        td2.text(tDestination);
        td3.text(tFrequency);
        td4.text(tArrival);
        td5.text(tMinutes);
    
    


        newTr.append(td1, td2, td3, td4, td5);
        $("#list").append(newTr);

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
});