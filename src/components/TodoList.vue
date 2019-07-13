<template>
  <div
    class="todo-list-wrapper"
    :class="[`todo-list-theme-${theme}`]"
  >
    <header
      class="todo-list-header"
      v-if="title"
      @click="toggleBody"
    >
      <h5>{{ title }}</h5>
    </header>
    <main
      class="todo-list-body"
      v-show="active"
    >
      <ul class="todo-list">
        <li
          class="todo-item"
          :class="{'todo-item-done': todo.finishedAt !== 0}"
          v-for="(todo, index) in list"
          :key="index"
        >
          <div class="todo-checkbox">
            <checkbox :checked="todo.finishedAt !== 0" />
          </div>
          <div class="todo-title">{{ todo.title }}</div>
          <div
            class="todo-actions"
            v-if="todo.finishedAt === 0"
          >
            <button class="btn btn-todo-cutline">
              <i class="material-icons">play_circle_outline</i>
            </button>
          </div>
          <div
            class="todo-summary"
            v-else
          >OOO</div>
        </li>
        <li
          class="todo-item todo-item-more"
          v-if="showMore && list.length > 0"
        >
          <div class="todo-actions">
            <a href="#">MORE</a>
          </div>
        </li>
        <li
          class="todo-item todo-item-more"
          v-if="list.length === 0"
        >
          <div class="todo-actions">
            <a
              href="#"
              class="text-uppercase"
              @click.prevent="addNewMission"
            >add a new mission…</a>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import Checkbox from '@/components/Checkbox.vue';

export default {
  name: 'TodoList',

  props: {
    title: {
      type: String,
      default: null,
    },

    active: {
      type: Boolean,
      default: true,
    },

    list: {
      required: true,
      type: Array,
    },

    theme: {
      default: 'navy',
      type: String,
    },

    showMore: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      bActive: false,
    };
  },

  components: {
    Checkbox,
  },

  mounted() {
    this.bActive = this.active;
  },

  methods: {
    toggleBody() {
      this.bActive = !this.bActive;
    },

    addNewMission() {
      this.$bus.$emit('focus-todo-editor-title');
    },
  },
};
</script>
