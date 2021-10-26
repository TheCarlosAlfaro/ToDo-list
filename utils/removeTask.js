import { getLocalTodos, updateLocalTodos } from './localStorageModules.js';
import findTaskIndex from './findTaskIndex.js';

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

export default removeTask;
