<template>
  <div
    v-if="value"
    :class="`whitespace-normal flex ${
      list ? 'flex-col items-start' : 'md:flex-col items-center md:items-start justify-between space-x-5 md:space-x-0'
    }`"
  >
    <p class="text-gray-300 md:text-gray-400 md:text-xs font-semibold md:uppercase flex-grow w-full">
      {{ $t(`media.props.${prop}.title`) }}
    </p>
    <p v-if="!list" class="text-gray-400 md:text-gray-300 flex-grow w-full text-right md:text-left">
      {{ value }}
    </p>
    <div v-else class="flex flex-col">
      <p v-for="item in value.split(', ')" :key="item" class="text-gray-400 md:text-gray-300">
        {{ item }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    prop: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    list: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
