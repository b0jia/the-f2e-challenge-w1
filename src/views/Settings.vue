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
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
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

    ...mapMutations('setting', {
      settingSetRingtone: 'SETTING_SET_RINGTON',
    }),
  },
};
</script>
