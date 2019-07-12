<template>
  <div class="page page-home">
    <div class="pomodoro">
      <div class="pomodoro-jobs">
        <todo-editor />

        <!-- current time (number) -->
        <!-- next jobs -->
        <todo-list theme="navy" :list="list" :show-more="true" />
      </div>
      <div class="pomodoro-timer-wrapper">
        <div class="pomodoro-timer"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoEditor from '@/components/TodoEditor.vue';
import TodoList from '../components/TodoList.vue';

export default {
  name: 'Home',

  components: {
    TodoEditor,
    TodoList,
  },

  data() {
    return {
      list: [{
        title: '1',
        estimated: 1, // tomatoes, each tomato mean 30 mins.
        dueDate: null,
        level: 1, // 0-1-2: height to low
        descriptions: '',
        createdAt: 1562956621573,
        firstStartedAt: 0,
        startedAt: 0,
        finishedAt: 0,
        workingRecords: [],
      }, {
        title: '2',
        estimated: 1, // tomatoes, each tomato mean 30 mins.
        dueDate: null,
        level: 1, // 0-1-2: height to low
        descriptions: '',
        createdAt: 1562956621573,
        firstStartedAt: 0,
        startedAt: 1562956809041,
        finishedAt: 1562956821260,
        workingRecords: [],
      }],
    };
  },
};
</script>
