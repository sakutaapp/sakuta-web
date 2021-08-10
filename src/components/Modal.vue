<template>
  <div class="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-filter backdrop-blur-md" @click.self="$emit('close')" style="z-index: 99;">
    <div class="bg-gray-800 dark:bg-dark-800 rounded-lg shadow min-w-64 max-w-9/10">
      <div v-if="header" class="h-32 md:h-64 relative rounded-t-lg" :style="`background-image: url('${headerImage}'); background-position: center; background-size: cover;`">
        <div class="w-full h-full absolute backdrop-filter backdrop-blur-lg rounded-t-lg p-3 md:p-5" style="background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%);">
          <div class="absolute top-2 right-2 p-1 bg-white bg-opacity-10 hover:bg-opacity-30 rounded-lg transition transition-250 cursor-pointer" @click="$emit('close')">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </div>
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
    headerImage: String
  }
});
</script>