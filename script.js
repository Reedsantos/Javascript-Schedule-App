// Declare variables
const currentDate = moment().format("dddd, MMMM Do");
const currentHour = moment().format("H");
const currentDay = $("#currentDay");
const scheduleContainer = $(".schedule");
const timeRow = $(".time-row");
var toDoItems = [];

// Creates key value pair for each row in local storage
function hourText() {

  timeRow.each(function () {
    var thisRow = $(this);
    var thisRowHr = parseInt(thisRow.attr("data-hour"));

    var todoObj = {
      hour: thisRowHr,
      text: "",
    }
    toDoItems.push(todoObj);
  });

  localStorage.setItem("todos", JSON.stringify(toDoItems));
};

// Function to change row color accoding to the time
function rowColor() {
  timeRow.each(function () {
    var thisRow = $(this);
    var thisRowHr = parseInt(thisRow.attr("data-hour"));

    if (thisRowHr == currentHour) {
      thisRow.addClass("present").removeClass("past future");
    }
    if (thisRowHr < currentHour) {
      thisRow.addClass("past").removeClass("present future");
    }
    if (thisRowHr > currentHour) {
      thisRow.addClass("future").removeClass("past present");
    }
  });
}

// Saves text in text area to local storage
function save() {
  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();
  for (var j = 0; j < toDoItems.length; j++) {
    if (toDoItems[j].hour == hourToUpdate) {

      toDoItems[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  displaySchedule();
}

// Takes data from local storage and displays it 
function displaySchedule() {

  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);

  for (var i = 0; i < toDoItems.length; i++) {
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text;

    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }
}

// Fires as soon as the dom is loaded
$(document).ready(function () {
  rowColor();

  // If there are no key value pairs in the local storage it will create them
  if (!localStorage.getItem("todos")) {
    hourText();
  }

  //Show current date
  currentDay.text(currentDate);

  // Displays local storage
  displaySchedule();
  // Save button saves text to local storage
  scheduleContainer.on("click", "button", save);

});
