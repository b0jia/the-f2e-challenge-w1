<template>
  <div class="page page-todos">
    <todo-editor
      ref="todoEditor"
    />

    <div class="todo-list-wrapper">
      <todo-list
        theme="light"
        title="TO-DO"
        :list="activeTodos"
        :show-more="false"
        :show-date="true"
        v-on:click-check="doneTodo"
      />

      <todo-list
        theme="light"
        title="DONE"
        :list="finishedTodos"
        :show-more="false"
        :show-date="true"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TodoEditor from '@/components/TodoEditor.vue';
import TodoList from '@/components/TodoList.vue';

export default {
  name: 'PageTodo',

  components: {
    TodoEditor,
    TodoList,
  },

  data() {
    return {
    };
  },

  computed: {
    ...mapGetters('todos', [
      'activeTodos',
      'finishedTodos',
    ]),
  },

  methods: {
    doneTodo(todo) {
      // TODO: stop timer.
      console.log('doneTodo');
      const data = todo;
      data.finishedAt = new Date().getTime();
      console.log(data);
      this.todoUpdate(todo, data);
    },
  },
};
</script>
