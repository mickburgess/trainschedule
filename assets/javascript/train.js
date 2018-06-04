$(document).ready(function() {
  // reference to the database service
  var database = firebase.database();

  // Initial Values
  var trainName = "";
  var destination = "";
  var trainTime = "";
  var frequency = 0;

  $("#addTrain").on("click", function(event) {
    event.preventDefault();

    // code for storing and retrieving train information
    trainName = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    trainTime = moment($("#trainTimeInput").val().trim(), "HH:mm", true);
    frequency = $("#frequencyInput").val().trim();
    
    // add values to database
    database.ref().push({

      train: trainName,
      destination: destination,
      firstTrainTime: trainTime,
      frequency: frequency,
    });

    // clear the input fields after storing values in Firebase
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#trainTimeInput").val("");
    $("#frequencyInput").val("");
  });

  // Firebase watcher
  database.ref().on("child_added", function(childSnapshot) {

    // log what's returned in snapshot
    console.log(childSnapshot.val().train);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().frequency);
    
    // store frequency in a variable
    var tFrequency = childSnapshot.val().frequency;

    // store first train time in a variable
    var firstTime = childSnapshot.val().firstTrainTime;

    // firstTime converted to hour:minute format
    var firstTimeConverted = moment(firstTime, "HH:mm");

    // current time
    var currentTime = moment();
    console.log(moment(currentTime).format("HH:mm"));

    // difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(diffTime);

    // time apart
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // minutes until train
    var tMinutesTillTrain = tFrequency - tRemainder;

    // next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainConversion = moment(nextTrain).format("hh:mm A");

    // create variable that will hold a "<tr>"
    var newRow = $("<tr>");

    // create variables to hold our table data
    var trainData = $("<td>").append(childSnapshot.val().train);

    var destinationData = $("<td>").append(childSnapshot.val().destination);

    var frequencyData = $("<td>").append(tFrequency);

    var arrivalData = $("<td>").append(nextTrainConversion);

    var minAwayData = $("<td>").append(tMinutesTillTrain);

    // append table data to the row
    newRow.append(trainData);
    newRow.append(destinationData);
    newRow.append(frequencyData);
    newRow.append(arrivalData);
    newRow.append(minAwayData);

    // append table row to table
    $("#tableBody").append(newRow);
  });
  
});
