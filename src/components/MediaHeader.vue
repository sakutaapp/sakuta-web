<template>
    <div class="w-full h-64 rounded-lg shadow-lg mb-5" :style="`background-image: url('${coverImageXl}'); background-size: cover; background-position: center;`">
        <div class="h-full w-full rounded-lg backdrop-filter backdrop-blur-lg p-5 flex items-center space-x-5" style="background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%);">
            <img :src="coverImageXl" class="h-full rounded-lg">
            <div class="text-white flex flex-col space-y-1">
                <h1 class="text-xl sm:text-2xl md:text-4xl font-semibold">{{ title }}</h1>
                <div class="flex flex-col md:flex-row md:items-center md:space-x-3">
                    <p>{{ $t("media.favorites.text", [favourites]) }}</p>
                    <div class="hidden md:block bg-white w-1.5 h-1.5 rounded-full"></div>
                    <p>{{ $t(`media.format.${format}`) }}</p>
                    <div class="hidden md:block bg-white w-1.5 h-1.5 rounded-full"></div>
                    <p>{{ $t(`media.status.${status}`) }}</p>
                    <div class="hidden md:block bg-white w-1.5 h-1.5 rounded-full"></div>
                    <p>{{ $t("media.episodes.text", [episodes]) }}</p>
                </div>
                <div class="hidden md:flex items-center space-x-5">
                    <Button :to="`https://anilist.co/anime/${id}`" :newTab="true" css="bg-blue-500 hover:bg-blue-600" textColor="white">{{ $t("general.viewOn", ["AniList"]) }}</Button>
                    <Button :to="`https://myanimelist.net/anime/${idMal}`" :newTab="true" css="bg-blue-800 hover:bg-blue-900" textColor="white">{{ $t("general.viewOn", ["MyAnimeList"]) }}</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    media: Object
  },
  computed: {
      coverImageXl(): any { return this.media?.coverImage?.extraLarge || "" },
      title(): any { return this.media?.title?.english || this.media?.title?.romaji || this.media?.title?.native || "" },
      favourites(): any { return this.media?.favourites || 0 },
      format(): any { return this.media?.format || "TV" },
      status(): any { return this.media?.status || "FINISHED" },
      episodes(): any { return this.media?.episodes || 0 },
      id(): any { return this.media?.id || 0 },
      idMal(): any { return this.media?.idMal || 0 }
  }
});
</script>