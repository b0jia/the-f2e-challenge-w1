import Vue from 'vue';
import Vuex from 'vuex';

import jobModule from './modules/job';
import settingModule from './modules/setting';
import todosModule from './modules/todos';
import timerModule from './modules/timer';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    job: jobModule,
    setting: settingModule,
    todos: todosModule,
    timer: timerModule,
  },
});
