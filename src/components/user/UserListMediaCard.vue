<template>
  <nuxt-link :to="`/${type}/${id}`" class="user-list-media-card">
    <div
      class="w-full aspect-w-3 aspect-h-3.5 user-list-media-card-cover rounded-lg overflow-hidden transition-all duration-250"
      :style="`background-image: url('${coverImage}')`"
    >
      <div class="flex flex-col justify-between p-1">
        <div class="flex justify-between">
          <div
            v-if="entry?.repeat > 0"
            class="bg-black bg-opacity-50 rounded-md py-0.5 px-1 text-sm flex items-center space-x-0.5 text-white"
          >
            <RewatchIcon :size="16" /><span>{{ entry?.repeat }}</span>
          </div>
          <div v-else></div>
          <div v-if="entry?.score" class="bg-black bg-opacity-50 rounded-md py-0.5 px-1 text-sm flex items-center space-x-0.5 text-white">
            <StarIcon filled :size="16" /><span>{{ entry?.score }}</span>
          </div>
        </div>
        <div class="flex justify-between">
          <div
            v-if="entry?.progress > 0 && entry?.media?.episodes > 1"
            class="bg-black bg-opacity-50 rounded-md py-0.5 px-1 text-sm text-white"
          >
            {{ entry?.progress }}/{{ entry?.media?.episodes }}
          </div>
          <div v-else></div>
        </div>
      </div>
    </div>
    <p class="mt-1 transition duration-250">
      {{ charLimit(title, 45) }}
    </p>
  </nuxt-link>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showInner: false,
    };
  },
  computed: {
    coverImage(): any {
      return this.entry?.media?.coverImage?.large || "";
    },
    title(): any {
      return this.entry?.media?.title?.english || this.entry?.media?.title?.romaji || this.entry?.media?.title?.native || "";
    },
    id(): any {
      return this.entry?.media?.id || 0;
    },
  },
  methods: {
    charLimit(text: string, limit: number): string {
      return text.length > limit ? `${text.substring(0, limit)}...` : text;
    },
  },
});
</script>

<style>
.user-list-media-card-cover {
  background-position: center;
  background-size: 100%;
  z-index: 2;
}

.user-list-media-card:hover .user-list-media-card-cover {
  background-size: 105%;
}
</style>
