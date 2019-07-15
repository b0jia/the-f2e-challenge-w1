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
            <checkbox
              :checked="todo.finishedAt !== 0"
              :theme="theme"
              @click.prevent="clickCheck(todo)"
            />
          </div>
          <div class="todo-title">
            <span class="text">{{ todo.title }}</span>
            <time class="date" v-if="showDate">{{ todo.dueDate }}</time>
          </div>
          <div
            class="todo-summary-wrapper"
          >
            <div class="todo-summary todo-summary-actual">
              <span
                class="todo-clock"
                :class="{}"
                v-for="i in todo.workingRecords"
                :key="i"
              ></span>
            </div>
          </div>
          <div
            class="todo-actions"
            v-if="todo.finishedAt === 0"
          >
            <button class="btn btn-todo-cutline">
              <i class="material-icons">play_circle_outline</i>
            </button>
          </div>
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
          v-if="list.length === 0 && showMore === true"
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

    showDate: {
      default: false,
      type: Boolean,
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

    clickCheck(todo) {
      this.$emit('click-check', todo);
    },
  },
};
</script>
