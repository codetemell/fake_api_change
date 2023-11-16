

let state = {
  todos: []
};

function getRequest() {
  fetch("http://localhost:5050/todos")
    .then((res) => res.json())
    .then((todos) => {
      state.todos = todos;
      renderTodos();
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderTodos() {
  var todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  state.todos.forEach(function(todo) {
    var div = document.createElement("div");

    var li = document.createElement("li");
    li.textContent = todo.title;

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn")
    deleteButton.addEventListener("click", function() {
      deleteTodoRequest(todo.id);
    });

    var changeButton = document.createElement("button");
    changeButton.textContent = "Change";
    changeButton.classList.add("btn")
    changeButton.style.backgroundColor="orange"
    changeButton.addEventListener("click", function() {
      openModal(todo.id, todo.title);
    });

    div.appendChild(li);

    div.appendChild(deleteButton);
    div.appendChild(changeButton);
      div.style.marginTop="30px"
  div.style.marginLeft="80px"

  div.classList.add('active')


    todoList.appendChild(div);
  });
}

function deleteTodoRequest(id) {
  fetch(`http://localhost:5050/todos/${id}`, {
    method: "DELETE"
  })
    .then((res) => {
      if (res.ok) {
        getRequest();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateTodoRequest(id, newTitle) {
  fetch(`http://localhost:5050/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title: newTitle })
  })
    .then((res) => {
      if (res.ok) {
        getRequest();
        closeModal();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function openModal(id, currentTitle) {
  var modal = document.getElementById("modal");
  var modalTitle = document.getElementById("modal-title");
  var input = document.getElementById("modal-input");
  var saveButton = document.getElementById("modal-save");
input.classList.add("inputicin")
saveButton.classList.add("btn")
  modal.style.display = "inline-block";
  modal.classList.add("modalicin")
  modalTitle.textContent = "Change Todo Title";
  input.value = currentTitle;

  saveButton.onclick = function() {
    var newTitle = input.value;
    if (newTitle) {
      updateTodoRequest(id, newTitle);
    }
  };
}

function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
}

getRequest();
