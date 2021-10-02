const todoInputEl = document.querySelector('.todo-input');
const addTodoButtonEl = document.querySelector('.add-todo-button');
const todoListContainer = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

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
      return `<div class="todo ${task.done ? 'completed' : ''}" data-key='${
        task.id
      }'>
    <li class="todo-item">
    ${task.task}
    </li>
    <button class="complete-btn">${task.done ? 'Completed' : 'Done'}</button>
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

const removeTodo = (todo) => {
  const todoId = todo.dataset.key;

  if (localStorage.getItem('localTodos') === null) {
    return;
  } else {
    localTodos = JSON.parse(localStorage.getItem('localTodos'));
  }
  const todoIndex = localTodos.findIndex((task) => task.id === todoId);

  localTodos.splice(todoIndex, 1);
  localStorage.setItem('localTodos', JSON.stringify(localTodos));
};

const changeStatus = (todo, isDone) => {
  const todoId = todo.dataset.key;

  if (localStorage.getItem('localTodos') === null) {
    return;
  } else {
    localTodos = JSON.parse(localStorage.getItem('localTodos'));
  }
  const todoIndex = localTodos.findIndex((task) => task.id === todoId);
  localTodos[todoIndex].done = isDone;
  console.log(localTodos);
  console.log(localTodos[todoIndex]);
  localStorage.setItem('localTodos', JSON.stringify(localTodos));
};

const actionCheck = (event) => {
  const button = event.target;

  // delete todo
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
      button.innerText = 'Done';
      changeStatus(todo, false);
    }
  }
};

function filterTodo(event) {
  if (localStorage.getItem('localTodos') === null) {
    return;
  } else {
    localTodos = JSON.parse(localStorage.getItem('localTodos'));
  }
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

// Event Listeners
document.addEventListener('DOMContentLoaded', renderTodoList);
addTodoButtonEl.addEventListener('click', addTask);
todoListContainer.addEventListener('click', actionCheck);
filterOption.addEventListener('change', filterTodo);
