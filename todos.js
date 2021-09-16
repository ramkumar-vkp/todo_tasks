function todoObj() {
  let todos = [];
  return (type, taskName) => {
    if (type == "add") {
      let task = {};
      task.name = taskName;
      task.isCompleted = false;
      task.isDeleted = false;
      todos.push(task);
      console.log(`todos : ` + JSON.stringify(todos));
    } else if (type == "clear") {
      todos = [];
      console.log(`todos : ` + JSON.stringify(todos));
    } else if (type == "completed") {
      let index = todos.findIndex((task) => task.name == taskName);
      if (index > -1) {
        todos[index].isCompleted = true;
      }
      console.log(`todos : ` + JSON.stringify(todos));
      showToDos();
    } else if (type == "deleted") {
      let index = todos.findIndex((task) => task.name == taskName);
      if (index > -1) {
        todos[index].isDeleted = true;
      }
      console.log(`todos : ` + JSON.stringify(todos));
      showToDos();
    } else if (type == "get") {
      console.log(`GET todos : ` + JSON.stringify(todos));
      return todos;
    }
  };
}

const todo = new todoObj();
window.onload = function onLoadSetup() {
  todo("add", "My Task 1");
  todo("add", "My Task 2");
  todo("add", "My Task 3");
  todo("add", "My Task 4");
  todo("add", "My Task 5");
  showToDos();
};

function showToDos() {
  var rowWrapper = document.getElementById("rowWrapper");
  let todos = todo("get");
  console.log(`TODO : ${JSON.stringify(todos)}`);
  let elements = "";
  for (let index in todos) {
    let todo = todos[index];
    if (!todo.isDeleted) {
      if (todo.isCompleted) {
        elements += `<div class="flex bg-yellow-500 my-2 rounded-lg opacity-50">`;
      } else {
        elements += `<div class="flex bg-yellow-500 my-2 rounded-lg">`;
      }
      elements += `<div class="flex-1 pl-4 px-2 py-2 text-gray-300 font-mono text-xl">${todo.name}</div>
      <div id="completedButton" onclick="taskCompletedAction('${todo.name}')" class="flex-none px-2 py-2 bg-green-600 hover:bg-green-400 text-gray-300 font-mono">Completed
      </div>
      <div id="deletedButton" onclick="taskDeletedAction('${todo.name}')" class="flex-none px-2 py-2 bg-red-500 hover:bg-red-300 text-gray-300 font-mono rounded-r-lg">
          Delete</div>
      </div>`;
    }
  }
  rowWrapper.innerHTML = elements;
}

var addButton = document.getElementById("addButton");
var enteredTask = document.getElementById("enteredTask");
var clearButton = document.getElementById("clearButton");
var completedButton = document.getElementById("completedButton");
var deletedButton = document.getElementById("deletedButton");

addButton.addEventListener("click", () => {
  if (enteredTask.value) {
    todo("add", enteredTask.value);
  } else {
    alert("Please enter the task");
  }
  showToDos();
});

clearButton.addEventListener("click", () => {
  todo("clear");
  showToDos();
});

function taskCompletedAction(taskName) {
  todo("completed", taskName);
  showToDos();
}

function taskDeletedAction(taskName) {
  todo("deleted", taskName);
  showToDos();
}
