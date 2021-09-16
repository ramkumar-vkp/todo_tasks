function todoObj() {
  let todos = [];
  return (type, taskName, setToDos) => {
    if (type == "add") {
      let index = todos.findIndex((task) => task.name == taskName);
      if (index > -1) {
        alert(
          `Task already exists, Please complete the old task or rename the new Task`
        );
      } else {
        let task = {};
        task.name = taskName;
        task.isCompleted = false;
        task.isDeleted = false;
        todos.push(task);
        console.log(`todos : ` + JSON.stringify(todos));
      }
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
        todos.splice(index, 1);
      }
      console.log(`todos : ` + JSON.stringify(todos));
      showToDos();
    } else if (type == "get") {
      console.log(`GET todos : ` + JSON.stringify(todos));
      return todos;
    } else if (type == "set") {
      console.log(`SET todos : ` + JSON.stringify(todos));
      todos = setToDos;
    }
  };
}

const todo = new todoObj();
window.onload = function onLoadSetup() {
  let localList = localStorage.getItem("todoList");
  if (localList) {
    todo("set", "", JSON.parse(localList));
  }
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
    localStorage.setItem("todoList", JSON.stringify(todo("get")));
  } else {
    alert("Please enter the task");
  }
  showToDos();
});

clearButton.addEventListener("click", () => {
  todo("clear");
  localStorage.setItem("todoList", JSON.stringify(todo("get")));
  showToDos();
});

function taskCompletedAction(taskName) {
  todo("completed", taskName);
  localStorage.setItem("todoList", JSON.stringify(todo("get")));
  showToDos();
}

function taskDeletedAction(taskName) {
  todo("deleted", taskName);
  localStorage.setItem("todoList", JSON.stringify(todo("get")));
  showToDos();
}
