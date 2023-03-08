<template>
  <div
    class="w-full h-64 rounded-lg shadow-lg mb-5"
    :style="`background-image: url('${avatar}'); background-size: cover; background-position: center;`"
  >
    <div
      class="h-full w-full rounded-lg backdrop-filter backdrop-blur-lg p-5 flex items-center space-x-5"
      style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%)"
    >
      <img :src="avatar" class="h-full rounded-lg" />
      <div class="text-white flex flex-col space-y-1">
        <h1 class="text-2xl sm:text-3xl md:text-5xl font-bold">
          {{ name }}
        </h1>
        <div class="hidden md:flex items-center space-x-5">
          <Button :to="`https://anilist.co/user/${name}`" :new-tab="true" css="bg-blue-500 hover:bg-blue-600" text-color="white">
            {{ $t("general.viewOn", ["AniList"]) }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    avatar(): any {
      return this.user?.avatar?.large || "";
    },
    name(): any {
      return this.user?.name || "";
    },
  },
});
</script>
