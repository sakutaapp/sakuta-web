<template>
  <Section>
    <h2 class="text-lg font-semibold">
      {{ $t("media.section.trailer") }}
    </h2>
    <iframe
      v-if="!customTrailer"
      class="w-full"
      :src="`https://www.youtube-nocookie.com/embed/${trailer}`"
      title="YouTube video player"
      height="500px"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
    <VideoPlayer v-else :video="getVideo()" />
  </Section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    trailer: {
      type: String,
      required: true,
    },
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
    getVideo() {
      let trailerLanguage = "jp";

      if (this.customTrailer[`trailer_${localStorage.getItem("lang")}`]) {
        trailerLanguage = localStorage.getItem("lang") as string;
        console.log(trailerLanguage);
      } else if (this.customTrailer.trailer_en) {
        trailerLanguage = "en";
      } else {
        trailerLanguage = "jp";
      }

      return this.customTrailer["trailer_" + trailerLanguage];
    },
  },
});
</script>
