<template>
  <div class="page page-home">
    <div class="pomodoro-jobs">
      <todo-editor />

      <!-- current time (number) -->
      <!-- next jobs -->
    </div>
    <div class="pomodoro-timer"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoEditor from '@/components/TodoEditor.vue';

export default {
  name: 'Home',

  components: {
    TodoEditor,
  },
};
</script>
