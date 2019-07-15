import moment from 'moment';

import $ls from '../../helpers/localstorage';
import filters from '../../helpers/todoFilters';

const store = {
  namespaced: true,

  mutations: {
    TODOS_INIT(state, todos) {
      state.todos = todos;
    },

    TODO_ADD(state, data) {
      // TODO: insert data with level.
      console.log(data);
      state.todos.push(data);
      $ls.put('todos', state.todos);
    },

    TODO_UPDATE(state, data) {
      // console.log(data);
      // Find index
      const index = state.todos.indexOf(data);

      state.todos[index] = data;

      // Update localstorage data.
      $ls.put('todos', state.todos);
    },

    TODO_SET_SHOW_WEEK(state, data) {
      // show week start.
      state.showWeek = data;
    },

    TODO_SET_PREV_WEEK(state) {
      state.showWeek = moment(new Date(state.showWeek)).subtract(1, 'week');
    },

    TODO_SET_NEXT_WEEK(state) {
      state.showWeek = moment(new Date(state.showWeek)).add(1, 'week');
    },
  },

  actions: {
    TODOS_INIT({ commit, state }) {
      const data = $ls.get('todos');
      if (data === null) {
        $ls.put('todos', state.todos);
      } else {
        commit('TODOS_INIT', data);
      }
      commit('TODO_SET_SHOW_WEEK', new Date().getTime());
    },
  },

  getters: {
    activeTodos(state) {
      return filters.active(state.todos);
    },

    currentTodo(state, getters) {
      return getters.activeTodos[0];
    },

    finishedTodos(state) {
      return filters.done(state.todos);
    },

    allDone(getters) {
      return getters.activeTodos === 0;
    },

    todayDone(state) {
      return filters.todayDone(state.todos);
    },

    weekDone(state) {
      return filters.weekDone(state.todos);
    },

    weekDayDone(state) {
      // timestamp each day: 86400000
      const days = [];
      const weekStart = moment(state.showWeek).startOf('week').format('x');
      const weekEnd = moment(state.showWeek).endOf('week').format('x');
      const todayInWeek = moment().isBetween(moment(weekStart, 'x'), moment(weekEnd, 'x'));
      const weekDoneTodos = filters.weekDone(state.todos, state.showWeek);

      for (let day = 0; day < 7; day += 1) {
        const thisDay = moment(weekStart, 'x').add(day, 'days').format('x');
        const startDay = moment(thisDay, 'x').startOf('day').format('x');
        const endDay = moment(thisDay, 'x').endOf('day').format('x');

        days.push({
          date: moment(thisDay, 'x').format('YYYY-MM-DD'),
          todos: weekDoneTodos.filter(
            todo => todo.finishedAt >= startDay && todo.finishedAt <= endDay,
          ),
        });
      }

      return {
        start: moment(weekStart, 'x').format('YYYY-MM-DD'),
        end: moment(weekEnd, 'x').format('YYYY-MM-DD'),
        todayInWeek,
        days,
      };
    },
  },

  state: {
    todos: [],
    showWeek: null,
  },
};

export default store;
