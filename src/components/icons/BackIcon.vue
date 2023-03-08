<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
    style="fill-rule: evenodd; clip-rule: evenodd; stroke-linecap: round; stroke-linejoin: round"
  >
    <path
      d="M2.455,11.381C2.352,11.554 2.291,11.756 2.286,11.971L2.286,12.029C2.291,12.244 2.352,12.446 2.455,12.619C2.547,12.774 2.673,12.908 2.826,13.01L10.326,18.01C10.884,18.382 11.639,18.231 12.01,17.674C12.382,17.116 12.231,16.361 11.674,15.99L7.511,13.214L20.5,13.214C21.17,13.214 21.714,12.67 21.714,12C21.714,11.33 21.17,10.786 20.5,10.786L7.511,10.786L11.674,8.01C12.231,7.639 12.382,6.884 12.01,6.326C11.639,5.769 10.884,5.618 10.326,5.99L2.826,10.99C2.673,11.092 2.547,11.226 2.455,11.381Z"
      fill="currentColor"
    />
  </svg>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    size: {
      type: String,
      default: "24",
    },
  },
});
</script>
