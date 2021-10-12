const todoInputEl = document.querySelector('.todo-input');
const addTodoButtonEl = document.querySelector('.add-todo-button');
const todoListContainer = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

const generateId = () => {
  let ID = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < 12; i++) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return ID;
};

const getLocalTodos = () => {
  return localStorage.getItem('localTodos')
    ? JSON.parse(localStorage.getItem('localTodos'))
    : [];
};

const updateLocalTodos = (localTodos) => {
  localStorage.setItem('localTodos', JSON.stringify(localTodos));
};

const renderTodos = () => {
  let localTodos = getLocalTodos();
  let todosMarkup = localTodos
    .map((task) => {
      return `<div class="todo ${task.isDone ? 'completed' : ''}" data-key='${
        task.id
      }'>
    <li class="todo-item">
    ${task.task}
    </li>
    <button class="complete-btn">${
      task.isDone ? 'Completed' : 'isDone'
    }</button>
    <button class="delete-btn">Delete</button>
    </div>`;
    })
    .join('');

  todoListContainer.innerHTML = todosMarkup;
};

const saveTask = (newTask) => {
  let localTodos = getLocalTodos();
  localTodos.push(newTask);

  updateLocalTodos(localTodos);
  renderTodos(localTodos);
};

const addTask = (event) => {
  event.preventDefault();

  const newTask = {
    id: generateId(),
    task: todoInputEl.value,
    isDone: false,
  };

  saveTask(newTask);
  todoInputEl.value = '';
};

const removeTodo = (todo) => {
  const todoId = todo.dataset.key;

  let localTodos = getLocalTodos();
  const todoIndex = localTodos.findIndex((task) => task.id === todoId);

  localTodos.splice(todoIndex, 1);

  updateLocalTodos(localTodos);
};

const changeStatus = (todo, isisDone) => {
  const todoId = todo.dataset.key;

  let localTodos = getLocalTodos();
  const todoIndex = localTodos.findIndex((task) => task.id === todoId);
  localTodos[todoIndex].isDone = isisDone;

  updateLocalTodos(localTodos);
};

const actionCheck = (event) => {
  const button = event.target;

  if (button.classList.contains('delete-btn')) {
    const todo = button.parentElement;

    todo.classList.add('fall');

    removeTodo(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }

  if (button.classList.contains('complete-btn')) {
    const todo = button.parentElement;
    todo.classList.toggle('completed');
    if (todo.classList.contains('completed')) {
      button.innerText = 'Completed';
      changeStatus(todo, true);
    } else {
      button.innerText = 'isDone';
      changeStatus(todo, false);
    }
  }
};

function filterTodo() {
  const todos = todoListContainer.childNodes;
  todos.forEach(function (todo) {
    switch (filterOption.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      default:
        todo.style.display = 'flex';
    }
  });
}

document.addEventListener('DOMContentLoaded', renderTodos);
addTodoButtonEl.addEventListener('click', addTask);
todoListContainer.addEventListener('click', actionCheck);
filterOption.addEventListener('change', filterTodo);
