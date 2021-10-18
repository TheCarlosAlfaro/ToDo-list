const todoInput = document.querySelector('.todo-input');
const addTodoButton = document.querySelector('.add-todo-button');
const todosContainer = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

import generateId from './utils/generateId.js';
import {
  getLocalTodos,
  updateLocalTodos,
} from './utils/localStorageModules.js';
import renderTodos from './utils/renderTodos.js';
import saveTask from './utils/saveTask.js';

const createNewTask = (event) => {
  event.preventDefault();

  const task = {
    id: generateId(),
    task: todoInput.value,
    isDone: false,
  };

  saveTask(task, todosContainer);
  todoInput.value = '';
};

const findTaskIndex = (localTodos, todoId) => {
  return localTodos.findIndex((task) => task.id === todoId);
};

const removeTask = (todo) => {
  todo.classList.add('fall');
  const todoId = todo.dataset.key;

  const localTodos = getLocalTodos();

  const todoIndex = findTaskIndex(localTodos, todoId);

  localTodos.splice(todoIndex, 1);

  updateLocalTodos(localTodos);

  todo.addEventListener('transitionend', function () {
    todo.remove();
  });
};

const checkCompletedStatus = (button, todo) => {
  todo.classList.toggle('completed');
  if (todo.classList.contains('completed')) {
    button.innerText = 'Completed';
    changeTaskStatus(todo, true);
  } else {
    button.innerText = 'Done';
    changeTaskStatus(todo, false);
  }
};

const changeTaskStatus = (todo, isDone) => {
  const todoId = todo.dataset.key;

  let localTodos = getLocalTodos();
  const todoIndex = findTaskIndex(localTodos, todoId);
  localTodos[todoIndex].isDone = isDone;

  updateLocalTodos(localTodos);
};

const buttonActionCheck = (event) => {
  const button = event.target;
  const todo = button.parentElement;

  if (button.classList.contains('delete-btn')) {
    removeTask(todo);
  }

  if (button.classList.contains('complete-btn')) {
    checkCompletedStatus(button, todo);
  }
};

// Refactor filterTodo, to a cleaner smaller function
function filterTodo() {
  const todos = todosContainer.childNodes;
  todos.forEach(function (todo) {
    switch (filterOption.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        todo.classList.contains('completed')
          ? (todo.style.display = 'flex')
          : (todo.style.display = 'none');

        break;
      case 'uncompleted':
        !todo.classList.contains('completed')
          ? (todo.style.display = 'flex')
          : (todo.style.display = 'none');
        break;
      default:
        todo.style.display = 'flex';
    }
  });
}

document.addEventListener('DOMContentLoaded', renderTodos(todosContainer));
addTodoButton.addEventListener('click', createNewTask);
todosContainer.addEventListener('click', buttonActionCheck);
filterOption.addEventListener('change', filterTodo);
