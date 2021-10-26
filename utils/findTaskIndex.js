const findTaskIndex = (localTodos, todoId) => {
  return localTodos.findIndex((task) => task.id === todoId);
};

export default findTaskIndex;
