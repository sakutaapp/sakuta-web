<template>
  <div :class="`bg-dark-800 rounded-lg shadow ${noPadding ? '' : 'px-4 py-2'}`">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Section",
  props: {
    noPadding: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
