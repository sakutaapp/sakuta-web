<template>
  <div
    :class="`flex items-center cursor-pointer space-x-7 md:space-x-3 transition duration-250 ${
      active ? 'md:bg-dark-800' : 'bg-dark-900'
    } hover:md:bg-dark-800 rounded-full py-2.5 md:py-1.5 md:px-4 md:pr-14`"
    @click="$emit('pageswitch', page.name)"
  >
    <Component :is="page.icon" class="hidden md:block" :filled="active" />
    <Component :is="page.icon" class="md:hidden" :filled="false" />
    <span class="text-lg md:text-base">{{ $t(`settings.page.${page.name}`) }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    page: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
