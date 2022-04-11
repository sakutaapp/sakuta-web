<template>
    <div class="w-full rounded-md shadow min-h-70 sm:min-h-100 xl:min-h-150 flex items-end justify-start text-white pl-8 pb-8 transition-all duration-250 bg-cover bg-center" :style="`background-image: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%), url('https://cms.sakuta.app/assets/${post.image.filename_disk}');`">
        <div class="flex flex-col h-full space-y-1.5 pr-5 lg:pr-70">
            <div class="flex items-center">
                <img height="20px" width="20px" :src="`https://cms.sakuta.app/assets/${post.author.avatar.filename_disk}`" class="rounded-full" />
                <p class="text-md font-semibold uppercase opacity-85 ml-1">{{ post.author.username }}</p>
                <p class="opacity-85 ml-5">{{ $moment.unix(publishedDate).locale($i18n.locale).fromNow() }}</p>
            </div>
            <p class="font-bold text-2xl sm:text-3xl md:text-4xl">{{ post.title }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        post: Object,
    },
    computed: {
        publishedDate(): any {
            return new Date(this.post.published).getTime() / 1000 || "0";
        },
    },
    methods: {
        open() {
            this.$router.push("/news/" + this.post.slug);
        },
    },
});
</script>
