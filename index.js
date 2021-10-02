const todoInputEl = document.querySelector('.todo-input');
const addTodoButtonEl = document.querySelector('.add-todo-button');
const todoListContainer = document.querySelector('.todo-list');

// generate ID function
makeId = () => {
  let ID = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (var i = 0; i < 12; i++) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return ID;
};

// Render todo list
const renderTodoList = () => {
  if (localStorage.getItem('localTodos') === null) {
    return;
  } else {
    localTodos = JSON.parse(localStorage.getItem('localTodos'));
  }
  let todoListEl = localTodos
    .map((task) => {
      return `<div class="todo">
    <li class="todo-item" data-key='${task.id}'>
    ${task.task}
    </li>
    <button class="complete-btn">Add</button>
    <button class="delete-btn">Delete</button>
    </div>`;
    })
    .join('');

  todoListContainer.innerHTML = todoListEl;
};

// save todo
const saveTask = (newTask) => {
  if (localStorage.getItem('localTodos') === null) {
    localTodos = [];
    console.log('checking if exists');
  } else {
    localTodos = JSON.parse(localStorage.getItem('localTodos'));
  }
  localTodos.push(newTask);
  localStorage.setItem('localTodos', JSON.stringify(localTodos));
  renderTodoList(localTodos);
};

// Add new task
const addTask = (event) => {
  event.preventDefault();

  const newTask = {
    id: makeId(),
    task: todoInputEl.value,
    done: false,
  };
  // save to localStorage
  saveTask(newTask);
  todoInputEl.value = '';
};
// Event Listeners
document.addEventListener('DOMContentLoaded', renderTodoList);
addTodoButtonEl.addEventListener('click', addTask);
