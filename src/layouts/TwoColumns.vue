<template>
  <div class="layout-two-columns">
    <navigation />
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue';

export default {
  name: 'LayoutTwoColumns',

  components: {
    Navigation,
  },
};
</script>
