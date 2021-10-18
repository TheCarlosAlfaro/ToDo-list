const getLocalTodos = () => {
  return localStorage.getItem('localTodos')
    ? JSON.parse(localStorage.getItem('localTodos'))
    : [];
};

const updateLocalTodos = (localTodos) => {
  localStorage.setItem('localTodos', JSON.stringify(localTodos));
};

export { getLocalTodos, updateLocalTodos };
