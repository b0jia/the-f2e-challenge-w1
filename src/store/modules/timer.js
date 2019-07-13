import utils from '../../utils';

const store = {
  namespaced: true,

  mutations: {
    COUNTDOWN(state) {
      state.time -= 1;
    },

    SET_NEW_TIME(state, val) {
      if (state.status === 'stop') {
        state.time = val;
      }
    },

    SET_STATUS(state, status) {
      state.status = status;
    },
  },

  getters: {
    GET_TIME_STRING(state) {
      const min = Math.floor(state.time / 60);
      const sec = state.time % 60;
      return `${utils.strings.paddingLeft(min.toString(), 2)}:${utils.strings.paddingLeft(sec.toString(), 2)}`;
    },

    GET_TIME(state) {
      return state.time;
    },

    GET_STATUS(state) {
      return state.status;
    },
  },

  state: {
    status: 'stop', // playing, paused, stop
    time: 0,
  },
};

export default store;
