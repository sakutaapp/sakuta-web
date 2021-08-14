<template>
    <div class="h-192 w-full relative flex justify-center items-center" :style="`background-image: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%), url('${image.url}'); background-size: cover; background-position: center;`">
        <p class="absolute bottom-3 left-3 md:bottom-5 md:left-5 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg px-3 py-1.5 rounded">{{ $t("landing.imageSource") }} <nuxt-link class="text-white font-semibold hover:text-primary transition duration-100" :to="`/anime/${image.anime}`">{{ source }}</nuxt-link></p>
        <div class="text-white px-10 py-5">
            <div class="flex flex-col items-center text-center">
                <img src="/assets/svg/icon.svg" class="h-32 mb-5">
                <h1 class="text-5xl font-semibold mb-2" v-html="$t('landing.heading', { sakuta: '<span class=\'font-bold\'>Sakuta</span>'})" />
                <h2 class="text-3xl font-semibold mb-2">{{ $t("landing.subheading") }}</h2>
                <p class="text-xl font-semibold" v-html="$t('landing.intro', { anilist: '<a target=\'_blank\' href=\'https://anilist.co\' class=\'underline hover:text-primary transition duration-100\'>AniList</a>' })" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        image: Object,
        source: String
    }
});
</script>