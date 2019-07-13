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
      console.log(data);
      // Find index
      const index = state.todos.indexOf(data);

      state.todos[index] = data;

      // Update localstorage data.
      $ls.put('todos', state.todos);
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
    },
  },

  getters: {
    activeTodos(state) {
      return filters.active(state.todos);
    },

    currentTodo(state, getters) {
      return getters.activeTodos[0];
    },

    allDone(getters) {
      return getters.activeTodos === 0;
    },
  },

  state: {
    todos: [],
  },
};

export default store;
