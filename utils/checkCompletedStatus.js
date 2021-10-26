import changeTaskStatus from './changeTaskStatus.js';

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

export default checkCompletedStatus;
