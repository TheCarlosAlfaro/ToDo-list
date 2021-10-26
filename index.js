import renderTodos from './utils/renderTodos.js';
import createNewTask from './utils/createNewTask.js';
import buttonActionCheck from './utils/buttonActionCheck.js';
import filterTodo from './utils/filterTodo.js';

const todoInput = document.querySelector('.todo-input');
const addTodoButton = document.querySelector('.add-todo-button');
const todosContainer = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', renderTodos(todosContainer));
addTodoButton.addEventListener(
  'click',
  createNewTask(todoInput, todosContainer)
);
todosContainer.addEventListener('click', buttonActionCheck);
filterOption.addEventListener(
  'change',
  filterTodo(filterOption, todosContainer)
);
