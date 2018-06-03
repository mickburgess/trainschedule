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
    trainTime = $("#trainTimeInput").val().trim();
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
  
    // create variable that will hold a "<tr>"
    var newRow = $("<tr>");

    // create variables to hold our table data
    var trainData = $("<td>").append(childSnapshot.val().train);
    var destinationData = $("<td>").append(childSnapshot.val().destination);
    var frequencyData = $("<td>").append(childSnapshot.val().frequency);

    // append table data to the row
    newRow.append(trainData);
    newRow.append(destinationData);
    newRow.append(frequencyData);

    // append table row to table
    $("#tableBody").append(newRow);
  });
  
});
