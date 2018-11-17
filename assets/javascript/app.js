$(document).ready(function() {

    let input = {
        name: "",
        destination: "",
        frequency: 0,
        firstTrainTime: 0,
    };
    
    $(".btn").on("click", function () {
        event.preventDefault();
        input.name = $("#trainName").val().trim();
        input.destination = $("#destination").val().trim();
        input.firstTrainTime = $("#firstTrainTime").val().trim();
        input.frequency = $("#frequency").val().trim();
        console.log(input);
    });
    
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAFcsX41t_7ih7rXRjPBHYCIDdHTngyDkY",
        authDomain: "train-scheduler-75513.firebaseapp.com",
        databaseURL: "https://train-scheduler-75513.firebaseio.com",
        projectId: "train-scheduler-75513",
        storageBucket: "train-scheduler-75513.appspot.com",
        messagingSenderId: "81264783174"
      };
      firebase.initializeApp(config);
      let database = firebase.database();
    
    
    // On-click function for taking the user-input values
    $(".btn").on("click", function () {
        event.preventDefault();
        input.name = $("#trainName").val().trim();
        input.destination = $("#destination").val().trim();
        input.frequency = $("#frequency").val().trim();
        input.firstTrainTime = $("#firstTrainTime").val().trim();
        console.log(input);
    
        // Code for the push
        database.ref().push({
            name: input.name,
            destination: input.destination,
            frequency: input.frequency,
            firstTrainTime: input.firstTrainTime,
        });
    });
    
        // Log everything that's coming out of snapshot
        database.ref().on("child_added", function(childSnapshot) {
            console.log(childSnapshot.val());
            let newName = childSnapshot.val().name;
            let newdestination = childSnapshot.val().destination;
            let newfrequency = childSnapshot.val().frequency;
            let firstTime = childSnapshot.val().firstTrainTime;

        // Variables to manipulate
        let start = firstTime;
        let trainFreq = newfrequency;

        // First user train time converted
        let firstTimeConverted = moment(start, "LT").subtract(1, "weeks");

        // Difference between times
        let diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        // Time apart (remainder);
        let tRemainder = diffTime % trainFreq;

        // Minutes until train
        let tMinutesTillTrain = trainFreq - tRemainder;

        // Next train
        let nextTrain = moment().add(tMinutesTillTrain, "minutes").format("LT");

    
        // Create new row to stick variables into columns.
            let tRow = $("<tr>");
            let tName = $("<th scope='row'>").text(newName);
            let tdestination = $("<td>").text(newdestination);
            let tfrequency = $("<td>").text(newfrequency);
            let tNextArrival = $("<td>").text(nextTrain);
            let tminutesaway = $("<td>").text(tMinutesTillTrain);
        
        // Append info to document table
            tRow.append(
                tName,
                tdestination,
                tfrequency,
                tNextArrival,
                tminutesaway,
            );
            $("#train-data").append(tRow);

        });
    });