<template>
  <div id="app"
    class="app-wrapper"
    :class="[`app-theme-${jobStatus}`, {'app-navigation-open': !isHome}]"
  >
    <navigation></navigation>

    <transition
      name="custom-classes-transtion"
      enter-active-class="animated faster fadeIn"
      leave-active-class="animated faster fadeOut"
      mode="out-in"
      duration="500"
    >
      <router-view></router-view>
    </transition>

    <!-- <audio
      :src="ringTone"
      ref="ringTone"
    ></audio> -->
    <audio
      controls
      ref="workingRingTone"
    >
      <source :src="workingRingTonePath" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    <audio
      controls
      ref="restingRingTone"
    >
      <source :src="restingRingTonePath" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Navigation from '@/components/Navigation.vue';
import timer from '@/helpers/timer';

export default {
  name: 'App',

  components: {
    Navigation,
  },

  data() {
    return {
      timer: null,

      startTime: null,
      finishTime: null,
    };
  },

  computed: {
    isHome() {
      return this.$route.name === 'home';
    },

    workingRingTonePath() {
      // eslint-disable-next-line max-len
      return `./ringtones/${this.settingRingtone.working}.mp3`;
    },
    restingRingTonePath() {
      // eslint-disable-next-line max-len
      return `./ringtones/${this.settingRingtone.resting}.mp3`;
    },
    // ...mapMutations('todos', [
    //   'TODOS_INIT',
    // ]),
    ...mapState('job', {
      jobStatus: 'status',
    }),

    ...mapState('setting', {
      settingTime: 'time',
      settingRingtone: 'rington',
    }),

    ...mapGetters('todos', [
      'currentTodo',
    ]),

    ...mapGetters('timer', {
      timerGetString: 'GET_TIME_STRING',
      timerTime: 'GET_TIME',
      timerStatus: 'GET_STATUS',
    }),
  },

  created() {
    this.$store.dispatch('todos/TODOS_INIT');
    this.$store.dispatch('setting/SETTING_INIT');
    // this.TODOS_INIT();
  },

  mounted() {
    this.$bus.$on('toggle-timer', this.toogleTimer);
    this.$bus.$on('stop-timer', this.stopTimer);
  },

  methods: {
    toogleTimer() {
      if (this.timerStatus !== 'playing') {
        if (this.timerStatus === 'stop') {
          this.startTime = new Date().getTime();

          this.timer = timer.interval(() => {
            this.timerCountdown();
            // console.log(this.timerTime);
            this.checkTimeout();
          }, 1000);
          this.timerSetStatus('playing');
        } else {
          this.timer.resume();
          this.timerSetStatus('playing');
        }
      } else {
        this.timer.pause();
        this.timerSetStatus('paused');
      }
    },

    stopTimer() {
      if (this.timerStatus !== 'stop') {
        this.timer.pause();
        this.timerSetStatus('stop');
        this.timer.destroy();
        this.timer = null;
        this.timerSetNewTime(this.settingTime[this.jobStatus]);
      }
    },

    checkTimeout() {
      console.log('check time out');
      if (this.timerTime === 0) {
        this.playRingTone();
        this.doneTomato();
      }
    },

    playRingTone() {
      if (this.jobStatus === 'working') {
        this.$refs.workingRingTone.play();
      } else {
        this.$refs.restingRingTone.play();
      }
    },

    doneTomato() {
      this.stopTimer();

      if (this.jobStatus === 'resting') {
        this.finishTime = new Date().getTime();
        console.log('done a tomato');
        // update current todo data
        const data = this.currentTodo;
        data.workingRecords.push([this.startTime, this.finishTime]);
        console.log(data);
        this.todoUpdate(this.currentTodo, data);
      }

      this.switchJob();
    },

    switchJob() {
      if (this.jobStatus === 'working') {
        this.jobSetStatus('resting');
      } else {
        this.jobSetStatus('working');
      }
      this.timerSetNewTime(this.settingTime[this.jobStatus]);
    },

    ...mapMutations('job', {
      jobSetStatus: 'SET_STATUS',
    }),

    ...mapMutations('todos', {
      todoUpdate: 'TODO_UPDATE',
    }),

    ...mapMutations('timer', {
      timerCountdown: 'COUNTDOWN',
      timerSetNewTime: 'SET_NEW_TIME',
      timerSetStatus: 'SET_STATUS',
    }),
  },
};
</script>
