<template>
  <Section class="flex items-center justify-center space-x-7">
    <nuxt-link
      v-for="tab in tabs"
      :key="tab.name"
      :to="tab.disabled ? '' : `/user/${username}${tab.url}`"
      :class="`hover:text-white transition duration-250 bg-dark-800 hover:bg-dark-700 px-4 py-1.5 rounded-full flex space-x-2 ${
        tab.disabled ? 'cursor-not-allowed' : ''
      }`"
      :active-class="tab.disabled ? '' : 'text-white bg-primary hover:bg-primary'"
    >
      {{ tab.text }}
    </nuxt-link>
  </Section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tabs: [
        {
          name: "overview",
          text: this.$i18n.t("user.tabs.overview"),
          url: "",
        },
        {
          name: "animeList",
          text: this.$i18n.t("user.tabs.animeList"),
          url: "/anime",
          disabled: true,
        },
        {
          name: "mangaList",
          text: this.$i18n.t("user.tabs.mangaList"),
          url: "/manga",
          disabled: true,
        },
        {
          name: "stats",
          text: this.$i18n.t("user.tabs.stats"),
          url: "/stats",
          disabled: true,
        },
      ],
    };
  },
});
</script>
