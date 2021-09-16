function todoObj() {
  let todos = [];
  return (type, taskName) => {
    if (type == "add") {
      todos.push(taskName);
      console.log(`todos : ` + todos);
    } else if (type == "remove") {
      let index = todos.indexOf(taskName);
      if (index > -1) {
        todos.splice(index, 1);
      }
      console.log(`todos : ` + todos);
    }
  };
}

const todo = new todoObj();
todo("add", "My Task 1");
todo("add", "My Task 2");
todo("add", "My Task 3");
todo("remove", "My Task 2");
