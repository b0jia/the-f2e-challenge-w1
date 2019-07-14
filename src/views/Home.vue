<template>
  <div class="page page-home">
    <div class="pomodoro">
      <div class="pomodoro-jobs">
        <todo-editor
          ref="todoEditor"
        />

        <!-- current time (number) -->
        <div class="todo-current"
          v-if="currentTodo"
        >
          <div class="todo-item">
            <div class="todo-checkbox">
              <checkbox
                :checked="currentTodo.finishedAt !== 0"
                v-on:click-check="doneTodo"
              />
            </div>
            <div class="todo-content">
              <div class="todo-title">{{ currentTodo.title }}</div>
              <div
                class="todo-summary-wrapper"
              >
                <div class="todo-summary todo-summary-estimations">
                  <span
                    class="todo-clock"
                    :class="{}"
                    v-for="i in currentTodo.estimated"
                    :key="i"
                  ></span>
                </div>
                <div class="todo-summary todo-summary-actual">
                  <!-- <span
                    class="todo-clock"
                    :class="{}"
                    v-for="i in currentTodo.workingRecords"
                    :key="i"
                  ></span> -->
                </div>
              </div>
            </div>
          </div>

          <div class="pomodoro-timer-text todo-timer-text">
            {{ timerGetString }}
          </div>
        </div>
        <div
          class="todo-current no-todos"
          v-else
        >
          Please add a new mission to start.
        </div>
        <!-- next jobs -->
        <todo-list theme="navy" :list="nextItems" :show-more="true" />
      </div>
      <div class="pomodoro-timer-wrapper">
        <div class="pomodoro-timer">
          <div
            class="timer-action timer-action-pp"
            @click.prevent="toogleTimer"
            v-if="currentTodo"
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
          <div
            class="timer-action timer-action-stop"
            @click.prevent="stopTimer"
            v-if="currentTodo"
          >
            <i class="material-icons icon-stop">stop</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters, mapMutations } from 'vuex';
import Checkbox from '@/components/Checkbox.vue';
import TodoEditor from '@/components/TodoEditor.vue';
import TodoList from '@/components/TodoList.vue';

export default {
  name: 'Home',

  components: {
    Checkbox,
    TodoEditor,
    TodoList,
  },

  data() {
    return {
      nextItemsNum: 3,
    };
  },

  computed: {
    nextItems() {
      return this.activeTodos.slice(1, this.nextItemsNum + 1);
    },

    ...mapState('job', {
      jobStatus: 'status',
    }),
    ...mapState('setting', {
      settingTime: 'time',
    }),
    ...mapGetters('todos', [
      'activeTodos',
      'currentTodo',
    ]),
    ...mapGetters('timer', {
      timerGetString: 'GET_TIME_STRING',
      timerStatus: 'GET_STATUS',
    }),
  },

  created() {
    this.timerSetNewTime(this.settingTime[this.jobStatus]);
  },

  methods: {
    toogleTimer() {
      this.$bus.$emit('toggle-timer');
    },

    doneTodo() {
      // TODO: stop timer.
      console.log('doneTodo');
      const data = this.currentTodo;
      data.finishedAt = new Date().getTime();
      console.log(data);
      this.todoUpdate(this.currentTodo, data);
    },

    ...mapMutations('todos', {
      todoUpdate: 'TODO_UPDATE',
    }),
    ...mapMutations('timer', {
      timerSetNewTime: 'SET_NEW_TIME',
    }),
  },
};
</script>
