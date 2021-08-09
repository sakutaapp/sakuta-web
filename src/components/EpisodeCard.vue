<template>
    <div class="w-full rounded-md shadow min-h-30 lg:min-h-35 flex items-end justify-start text-white p-2 pb-2 hover:pb-4 transition-all duration-250 cursor-pointer episode-card" :style="`background-image: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%), url('${episode.thumbnail}');`" @click="open()">
        <div>
            <p class="font-semibold">{{ episode.title.split(" - ")[0] }}</p>
            <p class="text-xs font-semibold uppercase opacity-70">{{ episode.title.split(" - ")[1] }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        episode: Object
    },
    methods: {
        open() {
            window.open(this.episode.url, '_blank')
        }
    }
});
</script>

<style>
.episode-card {
    background-size: 100% auto;
    background-position: 50% 50%;
    background-repeat: no-repeat;
}

.episode-card:hover {
    background-size: 105% auto;
}
</style>