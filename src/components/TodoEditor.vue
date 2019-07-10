<template>
  <div>
    <div class="todo-editor-wrapper">
      <div
        class="todo-editor-quickbar"
        :class="{'show-full-form': showFull}"
      >
        <input
          type="text"
          class="form-control form-control-lg"
          placeholder="add a new mission…"
          v-model="todo.title"
        >
        <button
          id="toggleFull"
          class="btn btn-white btn-lg text-primary"
          type="button"
          @click="toggleFullForm"
        >
          <i class="material-icons">keyboard_arrow_down</i>
        </button>
        <button id="addTodo" class="btn btn-white btn-lg text-primary">
          <i class="material-icons">add</i>
        </button>
      </div>
      <div class="todo-editor-full-form">
        <div class="row">
          <div class="col-12 col-lg-6">
            <div class="form-group row">
              <label for="inputEstimated" class="col-sm-4 col-form-label">Estimated</label>
              <div class="col-sm-8">
                <select
                  id="inputEstimated"
                  class="custom-select"
                  v-model="todo.estimated"
                >
                  <option value="0" selected>0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <small id="estimatedHelp" class="form-text text-muted">
                  How many tomatoes you need?
                </small>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="form-group row">
              <label for="inputLevel" class="col-sm-4 col-form-label">Level</label>
              <div class="col-sm-8">
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
              <label for="inputDueDate" class="col-sm-2 col-form-label">Due Date</label>
              <div class="col-sm-10">
                <input
                  id="inputDueDate"
                  type="text"
                  class="form-control"
                  v-model="todo.dueDate"
                >
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group row">
              <label for="inputDescriptions" class="col-sm-2 col-form-label">Descriptions</label>
              <div class="col-sm-10">
                <textarea
                  id="inputDescriptions"
                  class="form-control"
                  cols="30" rows="3"
                  placeholder="Descriptions"
                  v-model="todo.descriptions"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoEditor',

  data() {
    return {
      showFull: false,
      todo: {
        title: '',
        estimated: 0, // tomatoes, each tomato mean 30 mins.
        dueDate: new Date().getTime(),
        level: 1, // 0-1-2: height to low
        descriptions: '',
        createdAt: 0,
        firstStartedAt: 0,
        startedAt: 0,
        finishedAt: 0,
        workingRecords: [],
      },
    };
  },

  mounted() {
    this.todo.dueDate = new Date().getTime();
  },

  methods: {
    toggleFullForm(action) {
      if (action !== undefined && typeof action === 'boolean') {
        this.showFull = action;
      }

      this.showFull = !this.showFull;
    },
  },
};
</script>
