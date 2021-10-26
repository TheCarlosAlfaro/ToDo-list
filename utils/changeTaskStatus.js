import { getLocalTodos, updateLocalTodos } from './localStorageModules.js';
import findTaskIndex from './findTaskIndex.js';

const changeTaskStatus = (todo, isDone) => {
  const todoId = todo.dataset.key;

  let localTodos = getLocalTodos();
  const todoIndex = findTaskIndex(localTodos, todoId);
  localTodos[todoIndex].isDone = isDone;

  updateLocalTodos(localTodos);
};

export default changeTaskStatus;
