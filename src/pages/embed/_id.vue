<template>
    <div class="bg-black h-screen w-screen overflow-hidden center">
        <p v-if="!videoLoaded" class="text-white text-3xl font-bold">Loading...</p>
        <VideoPlayer v-if="video && videoLoaded" :options="getVideoOptions()" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    layout: "empty",
    data(): { video: any; videoLoaded: boolean } {
        return {
            video: undefined,
            videoLoaded: false,
        };
    },
    mounted() {
        this.$axios
            .$get(`https://cms.sakuta.app/items/video/${this.$route.params.id}?fields=video_1080p.filename_disk,thumbnail.filename_disk,title`)
            .then((response) => {
                if (response.data) {
                    this.video = response.data;
                    this.videoLoaded = true;
                } else {
                    this.$router.push("/");
                }
            })
            .catch((err) => {
                this.$router.push("/");
            });
    },
    methods: {
        getVideoOptions() {
            if (this.video === undefined) return;
            return {
                sources: [
                    {
                        src: `https://cms.sakuta.app/assets/${this.video.video_1080p.filename_disk}`,
                        type: "video/mp4",
                    },
                ],
                poster: `https://cms.sakuta.app/assets/${this.video.thumbnail.filename_disk}`,
            };
        },
    },
});
</script>
