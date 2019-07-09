<template>
  <div id="app"
    class="app-wrapper app-theme-working"
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
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',

  components: {
    Navigation,
  },
};
</script>
