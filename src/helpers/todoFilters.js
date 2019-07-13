export default {
  current(todos) {
    return todos[0];
  },

  active(todos) {
    return todos.filter(todo => todo.finishedAt === 0);
  },

  done(todos) {
    return todos.filter(todo => todo.finishedAt !== 0);
  },
};
