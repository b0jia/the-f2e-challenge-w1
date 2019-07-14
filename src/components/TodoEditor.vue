<template>
  <div
    class="todo-editor-wrapper"
    v-click-outside="hideFull"
  >
    <div
      class="todo-editor-quickbar"
      :class="[errorAnimateClass, {'show-full-form': showFull}]"
    >
      <input
        type="text"
        class="form-control form-control-lg"
        placeholder="add a new mission…"
        v-model="todo.title"
        ref="todoInput"
      >
      <button
        id="toggleFull"
        class="btn btn-white btn-lg text-primary"
        type="button"
        @click="toggleFullForm"
      >
        <i class="material-icons">keyboard_arrow_down</i>
      </button>
      <button
        id="addTodo"
        class="btn btn-white btn-lg text-primary"
        type="button"
        @click="addTodo"
      >
        <i class="material-icons">add</i>
      </button>
    </div>
    <!-- Todo full from -->
    <transition
      name="custom-classes-transtion"
      enter-active-class="animated faster fadeInDown"
      leave-active-class="animated faster fadeOutUp"
      duration="500"
    >
      <div
        class="todo-editor-full-form"
        :class="{'show': showFull}"
        v-if="showFull"
        ref="fullForm"
      >
        <div class="row">
          <div class="col-12">
            <div class="form-group row">
              <label for="inputEstimated" class="col-3 col-form-label">Estimated</label>
              <div class="col-9">
                <select
                  id="inputEstimated"
                  class="custom-select"
                  v-model="todo.estimated"
                >
                  <option
                    v-for="tomato in (10)"
                    :key="tomato"
                    :value="tomato"
                  >{{ tomato }}</option>
                </select>
                <small id="estimatedHelp" class="form-text text-muted">
                  How many tomatoes you need? About {{ aboutHours }} hours
                </small>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group row">
              <label for="inputLevel" class="col-3 col-form-label">Level</label>
              <div class="col-9">
                <select
                  id="inputLevel"
                  class="custom-select"
                  v-model="todo.level"
                >
                  <option value="0">Height</option>
                  <option value="1">Nromal</option>
                  <option value="2">Low</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group row">
              <label for="inputDueDate" class="col-3 col-form-label">Due Date</label>
              <div class="col-9">
                <datepicker
                  id="inputDueDate"
                  lang="en"
                  v-model="todo.dueDate"
                  valueType="format"
                  input-class="form-control"
                />
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group row">
              <label for="inputDescriptions" class="col-3 col-form-label">Descriptions</label>
              <div class="col-9">
                <textarea
                  id="inputDescriptions"
                  class="form-control"
                  cols="30" rows="3"
                  placeholder="Type some descriptions…"
                  v-model="todo.descriptions"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="col-12 text-right">
            <button
              class="btn btn-primary px-4"
              type="button"
              @click="addTodo"
            >Add</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Datepicker from 'vue2-datepicker';
import moment from 'moment';

export default {
  name: 'TodoEditor',

  components: {
    Datepicker,
  },

  data() {
    return {
      showFull: false,
      error: false,
      todo: {
        title: '',
        estimated: 1, // tomatoes, each tomato mean 30 mins.
        dueDate: null,
        level: 1, // 0-1-2: height to low
        descriptions: '',
        createdAt: 0,
        firstStartedAt: 0,
        startedAt: 0,
        finishedAt: 0,
        workingRecords: [],
      },
      tweenTL: null,
      // vcoConfig: {
      //   // handler: this.handler,
      //   // middleware: this.middleware,
      //   events: ['dblclick', 'click'],
      //   // Note: The default value is true, but in case you want to activate / deactivate
      //   //       this directive dynamically use this attribute.
      //   isActive: true,
      // },
    };
  },

  computed: {
    aboutHours() {
      return this.todo.estimated * 0.5;
    },

    errorAnimateClass() {
      return this.error ? 'shake animated fast' : null;
    },
  },

  mounted() {
    this.popupItem = this.$refs.fullForm;
    this.todo.dueDate = moment(new Date()).format('YYYY-MM-DD');

    this.$bus.$on('focus-todo-editor-title', this.focusTitle);
  },

  methods: {
    toggleFullForm(action) {
      if (action !== undefined && typeof action === 'boolean') {
        this.showFull = action;
        return;
      }

      this.showFull = !this.showFull;
    },

    hideFull() {
      this.toggleFullForm(false);
    },

    addTodo() {
      // console.log(this.todo);
      if (this.todo.title === '' || this.todo.title === null || this.todo.title === undefined) {
        this.focusTitle();
        this.error = true;
        window.setTimeout(() => {
          this.error = false;
        }, 800);
        return;
      }
      this.TODO_ADD(this.todo);
      this.resetTodo();
      this.toggleFullForm(false);
    },

    focusTitle() {
      this.$refs.todoInput.focus();
    },

    resetTodo() {
      this.todo = {
        title: '',
        estimated: 1, // tomatoes, each tomato mean 30 mins.
        dueDate: null,
        level: 1, // 0-1-2: height to low
        descriptions: '',
        createdAt: 0,
        firstStartedAt: 0,
        startedAt: 0,
        finishedAt: 0,
        workingRecords: [],
      };
    },

    ...mapMutations('todos', [
      'TODO_ADD',
    ]),

    // // Transition functions...
    // navbarNavEnter(el, done) {
    //   // console.log(el);
    //   const self = this;
    //   const items = el.querySelectorAll('.nav-item');

    //   if (this.tweenTL !== null) {
    //     this.tweenTL.progress(1);
    //   }

    //   this.tweenTL = new TimelineMax({
    //     onComplete() {
    //       self.tweenTL = null;
    //       done();
    //     },
    //   });
    //   this.tweenTL
    //     .add(TweenMax.fromTo(el, 0.3, {
    //       autoAlpha: 0,
    //     }, {
    //       autoAlpha: 1,
    //     }))
    //     .add(TweenMax.staggerFromTo(items, 0.5, {
    //       autoAlpha: 0,
    //       x: -50,
    //     }, {
    //       autoAlpha: 1,
    //       x: 0,
    //     }, 0.05));
    // },
    // navbarNavAfterEnter(el) {
    //   console.log(el);
    // },
    // navbarNavLeave(el, done) {
    //   const self = this;
    //   const items = el.querySelectorAll('.nav-item');

    //   if (this.tweenTL !== null) {
    //     this.tweenTL.progress(1);
    //   }


    //   this.tweenTL = new TimelineMax({
    //     onComplete() {
    //       self.tweenTL = null;
    //       done();
    //     },
    //   });
    //   this.tweenTL
    //     .add(TweenMax.staggerTo(items, 0.5, {
    //       autoAlpha: 0,
    //       x: -50,
    //     }, 0.05))
    //     .add(TweenMax.to(el, 0.3, {
    //       autoAlpha: 0,
    //     }));
    // },
    // navbarNavAfterLeave(el) {
    //   console.log(el);
    // },
  },
};
</script>
