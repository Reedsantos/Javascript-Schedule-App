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
