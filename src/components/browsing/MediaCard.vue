<template>
    <nuxt-link :to="`/${type}/${id}`" class="media-card">
        <div class="w-full aspect-w-3 aspect-h-3.5 media-card-cover rounded-lg overflow-hidden transition-all duration-250" :style="`background-image: url('${coverImage}')`">
            <div class="w-full h-full bg-dark-900 bg-opacity-70 backdrop-filter backdrop-blur-sm opacity-0 transition duration-250 p-2 md:p-3 lg:p-4 text-white text-opacity-80 media-card-cover-inner">
                <h3 class="text-lg md:text-xl lg:text-2xl font-bold uppercase text-white text-opacity-100">{{ title }}</h3>
                <h3 class="text-sm md:text-base lg:text-lg font-bold uppercase">{{ $t(`media.format.${format}`) }}</h3>
                <h4 class="text-xs md:text-sm font-semibold uppercase">{{ $t(`media.status.${status}`) }}</h4>
                <h4 class="text-xs md:text-sm font-semibold uppercase">{{ $t(`media.season`, { season: $t(`media.season.${season}`), year: seasonYear }) }}</h4>
            </div>
        </div>
        <p class="mt-1 media-card-text transition duration-250">{{ title }}</p>
    </nuxt-link>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
    props: {
        media: Object
    },
    computed: {
        coverImage(): any { return this.media?.coverImage?.large || "" },
        title(): any {  return this.media?.title.english || this.media?.title.romaji || this.media?.title.native || "" },
        id(): any { return this.media?.id || 0 },
        type(): any { return this.media?.type ? this.media?.type.toLowerCase() : "unknown" },
        format(): any { return this.media?.format || "unknown" },
        status(): any { return this.media?.status || "unknown" },
        season(): any { return this.media?.season || "unknown" },
        seasonYear(): any { return this.media?.seasonYear || "unknown" }
    }
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

.media-card:hover .media-card-cover-inner {
    opacity: 100%;
}

.media-card:hover .media-card-text {
    transform: translateY(calc(-100% - 10px));
}
</style>