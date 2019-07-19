<template>
  <div class="page page-home">
    <div class="pomodoro">
      <div class="pomodoro-wrapper">
        <div class="pomodoro-block pomodoro-block-editor">
          <todo-editor
            ref="todoEditor"
          />
        </div>

        <div class="pomodoro-block pomodoro-block-timer">
          <div class="pomodoro-timer">
            <div class="pomodoro-timer-text todo-timer-text d-lg-none">
              {{ timerGetString }}
            </div>
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
            <pie
              class="pomodoro-pie"
              :size="540"
              :angle="currentTime"
              :color="jobStatus === 'resting' ? '#007bff' : '#FF4384'"
            />
          </div>
        </div>

        <div class="pomodoro-block pomodoro-block-current">
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
                      :key="`estimations_${i}`"
                    ></span>
                  </div>
                  <div class="todo-summary todo-summary-actual">
                    <span
                      class="todo-clock"
                      :class="{}"
                      v-for="i in currentTodo.workingRecords"
                      :key="`actual_${i}`"
                    ></span>
                    <span
                      class="todo-clock todo-clock-current"
                    >
                      <pie
                        class="pomodoro-pie"
                        :size="10"
                        :angle="currentTime"
                        :color="jobStatus === 'resting' ? '#007bff' : '#FF4384'"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="pomodoro-timer-text todo-timer-text d-none d-lg-block">
              {{ timerGetString }}
            </div>
          </div>
          <div
            class="todo-current no-todos"
            v-else
          >
            Please add a new mission to start.
          </div>
        </div>

        <div class="pomodoro-block pomodoro-block-list">
          <!-- next jobs -->
          <todo-list theme="navy" :list="nextItems" :show-more="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters, mapMutations } from 'vuex';
import Checkbox from '@/components/Checkbox.vue';
import Pie from '../components/Pie.vue';
import TodoEditor from '@/components/TodoEditor.vue';
import TodoList from '@/components/TodoList.vue';

export default {
  name: 'Home',

  components: {
    Checkbox,
    Pie,
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
    ...mapState('timer', {
      currentTime: 'time',
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

    stopTimer() {
      this.$bus.$emit('stop-timer');
    },

    doneTodo() {
      // TODO: stop timer.
      this.stopTimer();
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
