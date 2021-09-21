const taskInput = document.querySelector('#new-task');
const addButton = document.querySelector('#add-button');
const incompleteTaskHolder = document.querySelector('#incomplete-tasks');
const completedTaskHolder = document.querySelector('#completed-tasks');

// New task list item
const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');

  //input (checkbox)
  const checkBox = document.createElement('input');
  // checkbox label
  const label = document.createElement('label');
  // input (text)
  const editInput = document.createElement('input');
  // button.edit
  const editButton = document.createElement('button');
  // button.delete
  const deleteButton = document.createElement('button');

  label.innerText = taskString;

  // appending each element
  checkBox.type = 'checkbox';
  editInput.type = 'text';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = () => {
  console.log('Adding task...');
  //Create a new list item with the text from the #new-task;
  const listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

//Edit an existing task
const editTask = function () {
  console.log('Editing a task...');
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const containsClass = listItem.classList.contains('editMode');

  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  //toggle .editmode on the parent
  listItem.classList.toggle('editMode');
};

//Delete a task
const deleteTask = function () {
  console.log('Deliting a task...');

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from ul.
  ul.removeChild(listItem);
};

// Mark task completed
const taskCompleted = function () {
  console.log('Compliting task...');

  //Append the task list item to the #completed-taks
  const listItem = this.parentNode;
  completedTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  console.log('Incompleting task...');

  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

const ajaxRequest = function () {
  console.log('AJAX request');
};

//The glue to hold it all together
// addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log('Binding list item events...');

  //select listItems children
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list listItems
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// cycle over completedTaskHolder ul list items
for (let i = 0; i < completedTaskHolder.children.length; i++) {
  bindTaskEvents(completedTaskHolder.children[i], taskIncomplete);
}
