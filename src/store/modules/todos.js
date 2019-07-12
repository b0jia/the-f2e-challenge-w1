import $ls from '../../helpers/localstorage';

export const namespaced = true;

export const mutations = {
  initTodos(state) {
    const data = $ls.get('todos');
    if (data === null) {
      $ls.put('todos', state.todos);
    }
  },
};

export const actions = {};

export const state = {
  todos: [],
};
