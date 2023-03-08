<template>
  <div
    class="w-full h-64 rounded-lg shadow-lg mb-7 md:mb-5"
    :style="`background-image: url('${coverImageXl}'); background-size: cover; background-position: center;`"
  >
    <div
      class="h-full w-full rounded-lg backdrop-filter backdrop-blur-lg p-5 flex items-center space-x-5"
      style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%)"
    >
      <img :src="coverImageXl" class="h-4/5 sm:h-full rounded-lg" />
      <div class="text-white flex flex-col space-y-1 w-full flex-grow">
        <h1 class="text-xl sm:text-2xl md:text-4xl font-semibold">
          {{ title }}
        </h1>
        <div class="flex flex-col md:flex-row md:items-center md:space-x-3">
          <p>{{ $t("media.favorites.text", [favourites]) }}</p>
          <div class="hidden md:block bg-white w-1.5 h-1.5 rounded-full" />
          <p>{{ $t(`media.format.${format}`) }}</p>
          <div class="hidden md:block bg-white w-1.5 h-1.5 rounded-full" />
          <p>{{ $t(`media.status.${status}`) }}</p>
          <div v-if="episodes || chapters" class="hidden md:block bg-white w-1.5 h-1.5 rounded-full" />
          <p v-if="type === 'anime' && episodes">
            {{ $tc("media.episodes.text", episodes, [episodes]) }}
          </p>
          <p v-if="type === 'manga' && volumes">
            {{ $tc("media.volumes.text", volumes, [volumes]) }}
          </p>
        </div>
      </div>
      <div class="absolute -bottom-4 right-4 md:relative flex space-x-2 items-center">
        <a
          v-tippy
          :href="share()"
          class="center w-12 h-12 min-w-12 min-h-12 rounded-full bg-gray-600 hover:bg-gray-700 cursor-pointer transition duration-250 mt-3 md:mt-0"
          :content="$t('general.share')"
        >
          <ShareIcon />
        </a>
        <a
          v-tippy
          :href="`https://anilist.co/anime/${id}`"
          target="_blank"
          class="center w-12 h-12 min-w-12 min-h-12 rounded-full bg-blue-500 hover:bg-blue-600 cursor-pointer transition duration-250 !hidden !md:flex"
          :content="$t('general.viewOn', ['AniList'])"
        >
          <AniListIcon />
        </a>
        <a
          v-tippy
          :href="`https://myanimelist.net/anime/${id}`"
          target="_blank"
          class="center w-12 h-12 min-w-12 min-h-12 rounded-full bg-blue-800 hover:bg-blue-900 cursor-pointer transition duration-250 !hidden !md:flex"
          :content="$t('general.viewOn', ['MyAnimeList'])"
        >
          <MyAnimeListIcon />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    media: {
      type: Object,
      default: null,
    },
    mediaType: {
      type: String,
      default: null,
    },
  },
  computed: {
    type(): any {
      if (this.mediaType === "manga") {
        return "manga";
      } else {
        return "anime";
      }
    },

    coverImageXl(): any {
      return this.media?.coverImage?.extraLarge || "";
    },
    title(): any {
      return this.media?.title?.english || this.media?.title?.romaji || this.media?.title?.native || "";
    },
    favourites(): any {
      return this.media?.favourites || 0;
    },
    format(): any {
      return this.media?.format || "TV";
    },
    status(): any {
      return this.media?.status || "FINISHED";
    },
    episodes(): any {
      return this.media?.episodes > 0
        ? (this.media?.format === "MOVIE" || this.media?.format === "MUSIC") && this.media?.episodes === 1
          ? undefined
          : this.media?.episodes
        : undefined;
    },
    volumes(): any {
      return this.media?.volumes || 0;
    },
    id(): any {
      return this.media?.id || 0;
    },
    idMal(): any {
      return this.media?.idMal || 0;
    },
  },
  methods: {
    share() {
      return `javascript:navigator.share({ title: '${
        this.media?.title?.english || this.media?.title?.romaji || this.media?.title?.native || "[Unknown]"
      } on Sakuta', text: 'Check out ${
        this.media?.title?.english || this.media?.title?.romaji || this.media?.title?.native || "[Unknown]"
      } on Sakuta', url: document.location.href, });`;
    },
  },
});
</script>
