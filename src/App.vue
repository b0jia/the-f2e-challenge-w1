<template>
  <div id="app"
    class="app-wrapper"
    :class="[`app-theme-${currentJob}`]"
  >
    <navigation></navigation>

    <transition
      name="custom-classes-transtion"
      enter-active-class="animated faster fadeIn"
      leave-active-class="animated faster fadeOut"
      mode="out-in"
      duration="500"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',

  components: {
    Navigation,
  },

  data() {
    return {
      currentJob: 'working', // working, resting
    };
  },

  created() {
    this.$store.commit('todos/initTodos');
  },

  computed: {
    ...mapMutations('todos', [
      'initTodos',
    ]),
  },
};
</script>
