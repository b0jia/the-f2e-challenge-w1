<template>
  <div class="page page-settings">
    <div class="setting-group">
      <div class="setting-header">
        <h5>Work</h5>
      </div>
      <div class="setting-content">
        <div class="row">
          <div
            class="list-item col-6 col-lg-4"
            v-for="(ringtone, index) in options.ringtones"
            :key="index"
          >
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                :id="`settingWorkingRingtone_${index}`"
                name="settingWorkingRingtone"
                class="custom-control-input"
                :value="ringtone.value"
                :checked="ringtone.value === settingRingtone.working"
                @change="changeRingtone('working', ringtone.value)"
              >
              <label
                class="custom-control-label text-uppercase font-weight-bold pl-1"
                :for="`settingWorkingRingtone_${index}`"
              >
                {{ ringtone.name }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="setting-group">
      <div class="setting-header">
        <h5>Break</h5>
      </div>
      <div class="setting-content">
        <div class="row">
          <div
            class="list-item col-6 col-lg-4"
            v-for="(ringtone, index) in options.ringtones"
            :key="index"
          >
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                :id="`settingRestingRingtone_${index}`"
                name="settingRestingRingtone"
                class="custom-control-input"
                :value="ringtone.value"
                :checked="ringtone.value === settingRingtone.resting"
                @change="changeRingtone('resting', ringtone.value)"
              >
              <label
                class="custom-control-label text-uppercase font-weight-bold pl-1"
                :for="`settingRestingRingtone_${index}`"
              >
                {{ ringtone.name }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="setting-group">
      <div class="setting-header">
        <h5>Settings</h5>
      </div>
      <div class="setting-content">
        <div class="row">
          <div class="col-auto">
            <button
              class="btn btn-danger"
              :class="{'disabled': allTodos === 0}"
              type="button"
              @click.prevent="deleteTodos"
              :disabled="allTodos === 0"
            >Delete All Todos</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import ringtones from '../configs/ringtones';

export default {
  name: 'Settings',

  data() {
    return {
      options: {
        ringtones,
      },
    };
  },

  computed: {
    ...mapGetters('todos', [
      'allTodos',
    ]),

    ...mapState('setting', {
      settingRingtone: 'rington',
    }),
  },

  methods: {
    changeRingtone(key, value) {
      this.settingSetRingtone({
        key,
        value,
      });
    },

    deleteTodos() {
      // eslint-disable-next-line no-alert
      const deleteConfirm = window.confirm('Confirm to delete all to-do items? This will not be restored.');
      if (deleteConfirm === true) {
        // document.write("You pressed OK!");
        this.todoDeleteAll();
      } else {
        // document.write("You pressed Cancel!");
      }
    },

    ...mapMutations('setting', {
      settingSetRingtone: 'SETTING_SET_RINGTON',
    }),

    ...mapMutations('todos', {
      todoDeleteAll: 'TODO_DELETE_ALL',
    }),
  },
};
</script>
