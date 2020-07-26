const currentDate = moment().format("dddd, MMMM Do");
const currentHour = moment().format("H");
const currentDay = $("#currentDay");
const scheduleContainer = $(".schedule");
const timeRow = $(".time-row");
var toDoItems = [];

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
};
