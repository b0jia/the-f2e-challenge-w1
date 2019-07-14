import $ls from '../../helpers/localstorage';

const store = {
  namespaced: true,

  mutations: {
    SETTING_INIT(state, { time, rington }) {
      state.time = time;
      state.rington = rington;
    },

    SETTING_SET_TIME(state, { key, val }) {
      state.time[key] = val;
    },

    SETTING_SET_RINGTON(state, { key, val }) {
      state.rington[key] = val;
    },
  },

  actions: {
    SETTING_INIT({ commit, state }) {
      const data = $ls.get('setting');
      if (data === null) {
        $ls.put('setting', state);
      } else {
        commit('SETTING_INIT', data);
      }
    },
  },

  state: {
    time: {
      working: 1500,
      resting: 300,
    },

    rington: {
      working: 'default',
      resting: 'default',
    },
  },
};

export default store;
