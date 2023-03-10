<template>
  <div
    class="fixed w-screen h-screen top-0 left-0 flex items-end justify-center bg-black bg-opacity-60 backdrop-filter backdrop-blur-md z-110"
    @click.self="$emit('close')"
  >
    <div class="bg-dark-800 rounded-t-lg shadow min-w-full md:min-w-128 max-w-full md:max-w-3/4 lg:max-w-1/2 relative pb-5">
      <CloseButton class="absolute top-2 right-2 z-10" @close="$emit('close')" />
      <div
        v-if="header"
        class="h-42 md:h-64 relative rounded-t-lg"
        :style="`background-image: url('${headerImage}'); background-position: center; background-size: cover;`"
      >
        <div
          class="w-full h-full absolute backdrop-filter backdrop-blur-lg rounded-t-lg p-3 md:p-5"
          style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%)"
        >
          <slot name="header" />
        </div>
      </div>
      <div class="p-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    header: Boolean,
    headerImage: {
      type: String,
      default: "",
    },
  },
});
</script>
