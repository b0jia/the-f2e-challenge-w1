import $ls from '../../helpers/localstorage';

export const namespaced = true;

export const mutations = {
  TODOS_INIT(state, todos) {
    state.todos = todos;
  },

  TODO_ADD(state, data) {
    // TODO: insert data with level.
    console.log(data);
    state.todos.push(data);
    $ls.put('todos', state.todos);
  },
};

export const actions = {
  TODOS_INIT({ commit, state }) {
    const data = $ls.get('todos');
    if (data === null) {
      $ls.put('todos', state.todos);
    } else {
      commit('TODOS_INIT', data);
    }
  },
};

export const state = {
  todos: [],
};
