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
        v-on:click-delete="deleteTodo"
        class="mb-5"
      />

      <todo-list
        theme="light"
        title="DONE"
        :list="finishedTodos"
        :show-more="false"
        :show-date="true"
        :show-delete="true"
        v-on:click-delete="deleteTodo"
        class="mb-5"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
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
      console.log(todo);
      const data = todo;
      data.finishedAt = new Date().getTime();
      console.log(data);
      this.todoUpdate(todo, data);
    },

    deleteTodo(todo) {
      this.todoDeleteOne(todo);
    },

    ...mapMutations('todos', {
      todoUpdate: 'TODO_UPDATE',
      todoDeleteOne: 'TODO_DELETE_ONE',
    }),
  },
};
</script>
