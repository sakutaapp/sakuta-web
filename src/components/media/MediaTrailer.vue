<template>
  <Section>
    <h2 class="text-lg font-semibold">
      {{ $t("media.section.trailer") }}
    </h2>
    <VideoPlayer v-if="customTrailer" :video="getVideo()" />
    <VideoEmbed v-else-if="!customTrailer && trailer" :id="trailer" />
  </Section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    trailer: {
      type: String,
      default: null,
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
