<template>
    <Container>
        <div class="bg-primary bg-opacity-15 rounded-lg flex space-x-3 p-3 items-center mt-3 mb-5">
            <div class="flex-grow">
                <AttentionIcon :filled="true" size="50" />
            </div>
            <div class="flex flex-col items-start flex-grow w-full">
                <h2 class="text-white font-semibold text-lg">{{ $t("news.notReleased.heading") }}</h2>
                <p>{{ $t("news.notReleased.text") }}</p>
            </div>
        </div>
        <div class="mt-2" v-if="loaded">
            <NewsHeader class="mb-8" :post="post" />
            <div class="bg-dark-800 rounded-lg p-3 mb-5" v-if="post.translationOriginal">
                <h2 class="text-white font-semibold text-lg">{{ $t("news.translation.heading") }}</h2>
                <p class="news-content" v-html="$t('news.translation.text', { article: `<a href='/news/${post.translationOriginal.slug}'>${post.translationOriginal.title}</a>`, author: `<a href='/user/${post.translationOriginal.author.username}'>${post.translationOriginal.author.username}</a>` })" />
            </div>
            <div class="news-content mb-8" v-html="post.content" />
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

export default Vue.extend({
    data() {
        return {
            post: {},
            loaded: false,
        };
    },
    mounted() {
        this.$axios.$get(`https://cms.sakuta.app/items/articles/${this.$route.params.slug}?fields=*,author.username,author.avatar.filename_disk,image.filename_disk,translationOriginal.slug,translationOriginal.title,translationOriginal.author.username,video.video_1080p.filename_disk,video.thumbnail.filename_disk`).then((response) => {
            this.post = response.data;
            this.loaded = true;
        });
    },
    methods: {
        getVideoOptions(videoData: any) {
            return {
                sources: [
                    {
                        src: `https://cms.sakuta.app/assets/${videoData.video_1080p.filename_disk}`,
                        type: "video/mp4",
                    },
                ],
                poster: `https://cms.sakuta.app/assets/${videoData.thumbnail.filename_disk}`,
            };
        },
    },
});
</script>
