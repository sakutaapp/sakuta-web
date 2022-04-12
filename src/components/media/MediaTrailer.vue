<template>
    <Section>
        <h2 class="text-lg font-semibold">{{ $t("media.section.trailer") }}</h2>
        <iframe v-if="!customTrailer" class="w-full" :src="`https://www.youtube-nocookie.com/embed/${trailer}`" title="YouTube video player" height="500px" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <VideoPlayer v-else :options="getVideoOptions()" />
    </Section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        trailer: String,
        customTrailer: {
            type: Object,
            default: undefined,
        },
    },
    data() {
        return {
            videoData: {},
        };
    },
    methods: {
        getVideoOptions() {
            let trailerLanguage = "jp";

            if (this.customTrailer[`trailer_${localStorage.getItem("lang")}`]) {
                trailerLanguage = localStorage.getItem("lang") as string;
                console.log(trailerLanguage);
            } else if (this.customTrailer.trailer_en) {
                console.log("B");
                trailerLanguage = "en";
            } else {
                console.log("C");
                trailerLanguage = "jp";
            }

            return {
                sources: [
                    {
                        src: `https://cms.sakuta.app/assets/${this.customTrailer["trailer_" + trailerLanguage].video_1080p.filename_disk}`,
                        type: "video/mp4",
                    },
                ],
                poster: `https://cms.sakuta.app/assets/${this.customTrailer["trailer_" + trailerLanguage].thumbnail.filename_disk}`,
            };
        },
    },
});
</script>
