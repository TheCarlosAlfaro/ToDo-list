import { getLocalTodos } from './localStorageModules.js';

const renderTodos = (todosContainer) => {
  let localTodos = getLocalTodos();
  let todosMarkup = localTodos
    .map((task) => {
      return `<div class="todo ${task.isDone ? 'completed' : ''}" data-key='${
        task.id
      }'>
    <li class="todo-item">
    ${task.task}
    </li>
    <button class="complete-btn">${task.isDone ? 'Completed' : 'Done'}</button>
    <button class="delete-btn">Delete</button>
    </div>`;
    })
    .join('');

  todosContainer.innerHTML = todosMarkup;
};

export default renderTodos;
