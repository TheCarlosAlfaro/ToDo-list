import { getLocalTodos, updateLocalTodos } from './localStorageModules.js';
import renderTodos from './renderTodos.js';

const saveTask = (task, todosContainer) => {
  let localTodos = getLocalTodos();
  localTodos.push(task);

  updateLocalTodos(localTodos);
  renderTodos(todosContainer);
};

export default saveTask;
