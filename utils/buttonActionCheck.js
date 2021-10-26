import removeTask from './removeTask.js';
import checkCompletedStatus from './checkCompletedStatus.js';

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

export default buttonActionCheck;
