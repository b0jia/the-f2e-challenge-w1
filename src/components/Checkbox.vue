<template>
  <div
    class="checkbox"
    :class="[`checkbox-${theme}`]"
  >
    <i
      class="checkbox-icon material-icons"
      v-if="checked"
    >done</i>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',

  props: {
    theme: {
      default: 'navy',
      type: String,
    },

    checked: {
      default: false,
      type: Boolean,
    },
  },
};
</script>
