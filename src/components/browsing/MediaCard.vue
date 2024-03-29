<template>
  <nuxt-link :to="`/${type}/${id}`" class="media-card group">
    <div
      class="w-full aspect-w-3 aspect-h-3.5 media-card-cover rounded-lg overflow-hidden transition-all duration-250"
      :style="`background-image: url('${coverImage}')`"
    >
      <div
        :class="`w-full h-full bg-dark-900 bg-opacity-70 backdrop-filter backdrop-blur-sm transition duration-250 p-2 md:p-3 lg:p-4 text-white text-opacity-80 media-card-cover-inner opacity-0 group-hover:opacity-100`"
      >
        <h3 class="text-lg md:text-xl lg:text-2xl font-bold uppercase text-white text-opacity-100">
          {{ charLimit(title, 55) }}
        </h3>
        <h3 v-if="format" class="text-sm md:text-base lg:text-lg font-bold uppercase">
          {{ $t(`media.format.${format}`) }}
        </h3>
        <h4 v-if="status" class="text-xs md:text-sm font-semibold uppercase">
          {{ $t(`media.status.${status}`) }}
        </h4>
        <h4 v-if="season && seasonYear" class="text-xs md:text-sm font-semibold uppercase">
          {{ $t(`media.season`, { season: $t(`media.season.${season}`), year: seasonYear }) }}
        </h4>
      </div>
    </div>
    <p class="mt-1 media-card-text transition duration-250">
      {{ charLimit(title, 45) }}
    </p>
  </nuxt-link>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    media: {
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
      return this.media?.coverImage?.large || "";
    },
    title(): any {
      return this.media?.title.english || this.media?.title.romaji || this.media?.title.native || "";
    },
    id(): any {
      return this.media?.id || 0;
    },
    type(): any {
      return this.media?.type ? this.media?.type.toLowerCase() : "unknown";
    },
    format(): any {
      return this.media?.format || undefined;
    },
    status(): any {
      return this.media?.status || undefined;
    },
    season(): any {
      return this.media?.season || undefined;
    },
    seasonYear(): any {
      return this.media?.seasonYear || undefined;
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
.media-card-cover {
  background-position: center;
  background-size: 100%;
  z-index: 2;
}

.media-card:hover .media-card-cover {
  background-size: 105%;
}

.media-card:hover .media-card-text {
  transform: translateY(calc(-100% - 10px));
}
</style>
