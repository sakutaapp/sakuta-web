<template>
  <a v-if="!nuxtLink" :href="to" :target="newTab ? '_blank' : ''" :class="classes"><slot /></a>
  <nuxt-link v-else :to="to" :class="classes">
    <slot />
  </nuxt-link>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    to: {
      type: String,
      required: true,
    },
    nuxtLink: Boolean,
    newTab: Boolean,
    css: {
      type: String,
      default: "",
    },
  },
  computed: {
    classes() {
      return `${this.css} px-2 py-1 rounded shadow transition duration-100`;
    },
  },
});
</script>
