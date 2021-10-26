function filterTodo(filterOption, todosContainer) {
  return function () {
    const todos = todosContainer.childNodes;
    todos.forEach(function (todo) {
      switch (filterOption.value) {
        case 'all':
          todo.style.display = 'flex';
          break;
        case 'completed':
          todo.classList.contains('completed')
            ? (todo.style.display = 'flex')
            : (todo.style.display = 'none');

          break;
        case 'uncompleted':
          !todo.classList.contains('completed')
            ? (todo.style.display = 'flex')
            : (todo.style.display = 'none');
          break;
        default:
          todo.style.display = 'flex';
      }
    });
  };
}

export default filterTodo;
