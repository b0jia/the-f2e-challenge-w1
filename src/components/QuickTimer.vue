<template>
  <div class="quick-timer">
    <div
      class="quick-timer-action quick-timer-action-pp"
      @click.prevent="toogleTimer"
    >
      <i
        class="material-icons icon-play"
        v-if="timerStatus !== 'playing'"
      >play_circle_filled</i>
      <i
        class="material-icons icon-pause"
        v-if="timerStatus === 'playing'"
      >pause_circle_filled</i>
      <!-- <div class="bar"></div>
      <div class="bar"></div> -->
    </div>
    <div class="quick-timer-content">
      <div class="quick-timer-time">
        {{ timerGetString }}
      </div>
      <div class="quick-timer-todo-title">
        {{ currentTodo.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'QuickTimer',

  data() {
    return {};
  },

  computed: {
    ...mapGetters('todos', [
      'currentTodo',
    ]),

    ...mapGetters('timer', {
      timerGetString: 'GET_TIME_STRING',
      timerStatus: 'GET_STATUS',
    }),
  },

  methods: {
    toogleTimer() {
      this.$bus.$emit('toggle-timer');
    },
  },
};
</script>
