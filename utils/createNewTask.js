import saveTask from './saveTask.js';
import generateId from './generateId.js';

const createNewTask = (todoInput, todosContainer) => {
  return function (event) {
    event.preventDefault();

    const task = {
      id: generateId(),
      task: todoInput.value,
      isDone: false,
    };

    saveTask(task, todosContainer);
    todoInput.value = '';
  };
};

export default createNewTask;
