<template>
  <div
    class="fixed top-0 left-0 w-full h-full z-490 backdrop-filter backdrop-blur-lg bg-black bg-opacity-20 text-center text-white flex items-center justify-center"
  >
    <div v-if="hostname === 'dev.sakuta.app'" class="flex flex-col items-center px-20 md:px-50 lg:px-80 xl:px-150">
      <svg class="w-32 h-32 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h1 class="text-3xl font-bold">
        {{ $t("dev.pageWarning.title", ["dev.sakuta.app"]) }}
      </h1>
      <p class="text-xl mt-1" v-html="warningText($t('dev.pageWarning.text'))" />
      <Button :nuxt-link="false" to="https://sakuta.app" css="bg-primary mt-5">
        {{ $t("dev.pageWarning.button", ["sakuta.app"]) }}
      </Button>
      <p
        class="underline text-white text-opacity-70 hover:text-opacity-100 transition duration-100 cursor-pointer mt-3 text-sm"
        @click="$emit('continue')"
      >
        {{ $t("dev.pageWarning.continue", ["dev.sakuta.app"]) }}
      </p>
    </div>
    <div v-else class="flex flex-col items-center px-20 md:px-50 lg:px-80 xl:px-150">
      <svg class="w-32 h-32 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
        />
      </svg>
      <h1 class="text-3xl font-bold">
        {{ $t("dev.unofficialPageWarning.title") }}
      </h1>
      <p class="text-xl mt-1" v-html="warningText($t('dev.unofficialPageWarning.text'))" />
      <Button :nuxt-link="false" to="https://sakuta.app" css="bg-primary mt-5">
        {{ $t("dev.pageWarning.button", ["sakuta.app"]) }}
      </Button>
      <p
        class="underline text-white text-opacity-70 hover:text-opacity-100 transition duration-100 cursor-pointer mt-3 text-sm"
        @click="$emit('continue')"
      >
        {{ $t("dev.pageWarning.continue", [hostname]) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  computed: {
    hostname() {
      return document.location.hostname;
    },
  },
  methods: {
    warningText(string: string): string {
      const match = string.match(/\[.*?\]/g);
      if (!match) {
        return string;
      }
      return string.replace(
        match[0],
        `<a href="https://twitter.com/trysakuta" target="_blank" class="underline">${match[0].slice(1, match[0].length - 1)}</a>`,
      );
    },
  },
});
</script>
