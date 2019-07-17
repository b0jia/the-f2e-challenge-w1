<template>
  <nav
    class="global-navigation"
    :class="{'global-navigation-left': !isHome}"
  >
    <div
      class="navbar-close"
      v-if="!isHome"
    >
      <router-link :to="{name: 'home'}"><i class="material-icons">close</i></router-link>
    </div>
    <div
      class="navbar-menu"
    >
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link
            :to="{ name: 'todos' }"
            class="nav-link"
          >
            <div class="nav-icon">
              <i class="material-icons">list</i>
            </div>
            <div
              class="nav-text"
              v-if="!isHome"
            >To-Do list</div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'analytics' }"
            class="nav-link"
          >
            <div class="nav-icon">
              <i class="material-icons">insert_chart</i>
            </div>
            <div
              class="nav-text"
              v-if="!isHome"
            >Analytics</div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'settings' }"
            class="nav-link"
          >
            <div class="nav-icon">
              <i class="material-icons">library_music</i>
            </div>
            <div
              class="nav-text"
              v-if="!isHome"
            >Ringtones</div>
          </router-link>
        </li>
        <li
          class="nav-item"
          v-if="!isHome"
        >
          <router-link
            :to="{ name: 'home' }"
            class="nav-link"
            exact
          >
            <div class="nav-icon">
              <i class="material-icons">close</i>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div
      class="navbar-brand"
      v-if="isHome"
    >
      <div class="brand-title">POMODORO</div>
    </div>

    <quick-timer
      v-if="!isHome"
    />
  </nav>
</template>

<script>
import QuickTimer from './QuickTimer.vue';

export default {
  name: 'GlobalNavigation',

  components: {
    QuickTimer,
  },

  computed: {
    isHome() {
      return this.$route.name === 'home';
    },
  },

  methods: {
    // navTextEnter(el, done) {
    //   console.log(getComputedStyle(el));
    //   done();
    // },
    // navTextAfterEnter() {},
    // navTextLeave() {},
    // navTextAfterLeave() {},
  },
};
</script>
