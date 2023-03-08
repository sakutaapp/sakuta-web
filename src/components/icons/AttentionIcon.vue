<template>
  <svg v-if="!filled" :width="size" :height="size" viewBox="0 0 24 24" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 5C12.5523 5 13 5.44772 13 6V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V6C11 5.44772 11.4477 5 12 5ZM12 16C12.5523 16 13 16.4477 13 17V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V17C11 16.4477 11.4477 16 12 16Z"
      fill="currentColor"
    />
  </svg>

  <svg
    v-else
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    version="1.1"
    style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2"
  >
    <path
      d="M12,2C6.5,2 2,6.5 2,12C2,17.5 6.5,22 12,22C17.5,22 22,17.5 22,12C22,6.5 17.5,2 12,2ZM12,18.7C11.4,18.7 11,18.3 11,17.7L11,16.7C11,16.1 11.4,15.7 12,15.7C12.6,15.7 13,16.1 13,16.7L13,17.7C13,18.3 12.6,18.7 12,18.7ZM12,14C11.4,14 11,13.6 11,13L11,6.3C11,5.7 11.4,5.3 12,5.3C12.6,5.3 13,5.7 13,6.3L13,13C13,13.5 12.6,14 12,14Z"
      style="fill-rule: nonzero"
      fill="currentColor"
    />
  </svg>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    filled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "24",
    },
  },
});
</script>
