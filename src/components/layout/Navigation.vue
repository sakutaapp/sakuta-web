<template>
  <div class="bg-dark-900 shadow-sm py-4">
    <Container>
      <div class="flex items-center">
        <!-- Logo -->
        <div class="flex-grow w-1/6">
          <nuxt-link to="/">
            <img src="/assets/svg/logo.svg" class="h-8" />
          </nuxt-link>
        </div>
        <!-- Navigation -->
        <div v-if="!alwaysShowBottom" class="w-full flex-grow hidden md:flex justify-center items-center space-x-4">
          <nuxt-link
            v-for="link in navLinks"
            :key="link.to"
            exact-active-class="text-white bg-dark-800"
            :to="link.to || ''"
            class="hover:text-white transition duration-250 bg-dark-900 hover:bg-dark-800 px-4 py-1.5 rounded-full flex space-x-2"
            @click="link.callback || null"
          >
            <Component :is="link.icon" :filled="$route.path === link.to" />
            <span>{{ $t(`nav.link.${link.name}`) }}</span>
          </nuxt-link>
          <div
            exact-active-class="text-white bg-dark-800"
            class="hover:text-white transition duration-250 bg-dark-900 hover:bg-dark-800 px-4 py-1.5 rounded-full flex space-x-2 cursor-pointer"
            @click="$nuxt.$emit('openSearch')"
          >
            <SearchIcon />
            <span>{{ $t(`nav.link.search`) }}</span>
          </div>
        </div>
        <!-- Search / Settings -->
        <div class="flex-grow w-1/6 flex justify-end space-x-3">
          <div
            v-if="alwaysShowBottom"
            class="cursor-pointer bg-dark-800 md:bg-dark-900 hover:bg-dark-800 transition duration-250 p-2 rounded-full hidden md:flex items-center justify-center"
            @click="$nuxt.$emit('openSearch')"
          >
            <SearchIcon size="24" />
          </div>
          <div
            class="center cursor-pointer bg-dark-800 md:bg-dark-900 hover:bg-dark-800 transition duration-250 p-2 rounded-full"
            @click="$store.commit('settings/open')"
          >
            <SettingsIcon size="24" />
          </div>
        </div>
      </div>
    </Container>
    <NavBottom :always-show="alwaysShowBottom" @settings="$emit('toggleSettings')" @toggle-command-menu="$emit('toggle-command-menu')" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      alwaysShowBottom: localStorage.getItem("navigation") === "bottom",
      navLinks: [
        {
          to: "/",
          icon: "HomeIcon",
          name: "home",
        },
        {
          to: "/explore",
          icon: "ExploreIcon",
          name: "explore",
        },
        {
          to: "/news",
          icon: "BookIcon",
          name: "news",
        },
      ],
    };
  },
  mounted() {
    this.$nuxt.$on("navigationTypeChange", (type: string) => {
      this.alwaysShowBottom = type === "bottom";
    });
  },
});
</script>
