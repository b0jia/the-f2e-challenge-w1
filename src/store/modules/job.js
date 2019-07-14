const store = {
  namespaced: true,

  mutations: {
    SET_STATUS(state, status) {
      state.status = status;
    },
  },

  state: {
    status: 'working', // working, resting
  },
};

export default store;
