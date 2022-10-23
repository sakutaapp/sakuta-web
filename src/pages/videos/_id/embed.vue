<template>
    <VideoPlayer v-if="loaded" :video="video" class="h-screen" />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    layout: "empty",
    data() {
        return {
            video: {},
            loaded: false,
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
        });
        this.$axios.$get(`https://cms.sakuta.app/items/video/${this.$route.params.id}?fields=*.*`).then((response) => {
            this.video = response.data;
            this.loaded = true;
        });
        const interval = setInterval(() => {
            const player = document.querySelector(".plyr");
            if (player) {
                player.classList.add("h-screen");
                clearInterval(interval);
                this.$nuxt.$loading.finish();
            }
        }, 100);
    },
});
</script>
