<template>
    <Container>
        <div class="bg-primary bg-opacity-15 rounded-lg flex space-x-3 p-3 items-center mt-3 mb-5">
            <div class="flex-grow">
                <AttentionIcon :filled="true" size="50" />
            </div>
            <div class="flex flex-col items-start">
                <h2 class="text-white font-semibold text-lg">{{ $t("news.notReleased.heading") }}</h2>
                <p>{{ $t("news.notReleased.text") }}</p>
            </div>
        </div>
        <div class="mt-2" v-if="loaded">
            <NewsHeader :post="post" />
            <div class="news-content mt-8 mb-8" v-html="post.content" />
            <VideoPlayer v-if="post.video" :options="getVideoOptions(post.video)" />
        </div>
    </Container>
</template>

<style lang="postcss">
.news-content p {
    @apply text-lg my-2;
}
.news-content h1 {
    @apply text-xl font-semibold text-white mt-4 -mb-1;
}
.news-content h2 {
    @apply text-2xl font-semibold text-white mt-4 -mb-1;
}
.news-content h3 {
    @apply text-xl font-semibold text-white mt-4 -mb-1;
}
.news-content a {
    @apply underline hover:text-primary transition duration-100;
}
</style>

<script lang="ts">
import Vue from "vue";
import "video.js/dist/video-js.css";

export default Vue.extend({
    data() {
        return {
            post: {},
            loaded: false,
        };
    },
    mounted() {
        this.$axios.$get(`https://cms.sakuta.app/items/articles/${this.$route.params.slug}?fields=*,author.username,author.avatar.filename_disk,translator.username,image.filename_disk,translationOriginal.slug,translationOriginal.title,video.video_1080p.filename_disk,video.thumbnail.filename_disk`).then((response) => {
            this.post = response.data;
            this.loaded = true;
        });
    },
    methods: {
        getVideoOptions(videoData: any) {
            return {
                autoplay: false,
                controls: true,
                fluid: true,
                sources: [
                    {
                        src: `https://cms.sakuta.app/assets/${videoData.video_1080p.filename_disk}`,
                        type: "video/mp4",
                    },
                ],
                poster: `https://cms.sakuta.app/assets/${videoData.thumbnail.filename_disk}`,
                controlBar: {
                    remainingTimeDisplay: {
                        displayNegative: true,
                    },
                },
                userActions: {
                    hotkeys: function (event: any) {
                        // Space or K to play/pause
                        if (event.which === 32 || event.which === 75) {
                            // @ts-ignore
                            this.playing ? this.pause() : this.play();
                        }

                        // Left or J to jump back 5 seconds
                        if (event.which === 37 || event.which === 74) {
                            // @ts-ignore
                            this.currentTime(this.currentTime() - 5);
                        }

                        // Right or L to jump forward 5 seconds
                        if (event.which === 39 || event.which === 76) {
                            // @ts-ignore
                            this.currentTime(this.currentTime() + 5);
                        }

                        // Up or I to increase volume
                        if (event.which === 38 || event.which === 73) {
                            // @ts-ignore
                            this.volume(this.volume() + 0.1);
                        }

                        // Down or O to decrease volume
                        if (event.which === 40 || event.which === 79) {
                            // @ts-ignore
                            this.volume(this.volume() - 0.1);
                        }

                        // M to mute/unmute
                        if (event.which === 77) {
                            // @ts-ignore
                            this.muted(!this.muted());
                        }

                        // F to enter or exit fullscreen
                        if (event.which === 70) {
                            // @ts-ignore
                            this.fullscreen() ? this.exitFullscreen() : this.requestFullscreen();
                        }
                    },
                },
            };
        },
    },
});
</script>
