const todoInputEl = document.querySelector('.todo-input');
const addTodoButtonEl = document.querySelector('.add-todo-button');
const todoListContainer = document.querySelector('.todo-list');

// Dummy todo list
const todoList = [
  {
    id: 'helooid234',
    task: 'Practice Dj skills',
    done: false,
  },
  {
    id: 'heasdid234',
    task: 'Program for a better life, have fun!',
    done: false,
  },
  {
    id: 'hdallooid2ds4',
    task: 'Do not forget to go for a walk',
    done: false,
  },
];

// Create id generaton function
makeId = () => {
  let ID = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (var i = 0; i < 12; i++) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return ID;
};

// Render todo function
const renderTodoList = (todoList) => {
  let todoListEl = todoList
    .map((task) => {
      return `<div class="todo">
    <li class="todo-item">
    ${task.task}
    </li>
    <button class="complete-btn">Add</button>
    <button class="delete-btn">Delete</button>
    </div>`;
    })
    .join('');

  todoListContainer.innerHTML = todoListEl;
};

renderTodoList(todoList);

// Add new task
const addTask = (event) => {
  event.preventDefault();

  const newTask = {
    id: makeId(),
    task: todoInputEl.value,
    done: false,
  };

  todoList.push(newTask);
  console.log(todoList);

  todoInputEl.value = '';
  renderTodoList(todoList);
};
// Event Listeners
addTodoButtonEl.addEventListener('click', addTask);
