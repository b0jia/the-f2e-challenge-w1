import moment from 'moment';

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

  todayDone(todos) {
    const today = new Date().setHours(0, 0, 0, 0);
    return todos.filter(todo => todo.finishedAt !== 0 && todo.finishedAt >= today);
  },

  // weekDone(todos) {
  //   const weekStart = moment().startOf('week').format('x');
  //   return todos.filter(todo => todo.finishedAt !== 0 && todo.finishedAt >= weekStart);
  // },

  weekDone(todos, startDay) {
    const weekStart = startDay !== undefined ? moment(startDay).startOf('week').format('x') : moment().startOf('week').format('x');
    const weekEnd = startDay !== undefined ? moment(startDay).endOf('week').format('x') : moment().endOf('week').format('x');

    // console.log(weekStart, weekEnd); // Timestamps of week: 604799999
    return todos.filter(todo => todo.finishedAt !== 0
      && todo.finishedAt >= weekStart
      && todo.finishedAt <= weekEnd);
  },
};
