<template>
  <div>
    <LandingHeader :image="image" :source="source" />
    <Container>
      <div class="grid grid-cols-2 gap-y-10 py-10">
        <LandingFeature v-for="feature in features" :key="feature" :feature="feature" />
      </div>
      <p
        class="text-center text-gray-500 text-sm mt-5"
        v-html="
          $t('landing.iconCredits', {
            icons8:
              '<a target=\'_blank\' href=\'https://icons8.com/\' class=\'underline hover:text-primary transition duration-100\'>Icons8</a>',
          })
        "
      />
    </Container>
  </div>
</template>

<script>
import Vue from "vue";
import landing from "../apollo/queries/landing";

export default Vue.extend({
  data() {
    return {
      features: ["layout", "linked", "mobile", "list"],
      image: { anime: null, url: "" },
      dataLoaded: 0,
    };
  },
  head: {
    title: "Home",
  },
  apollo: {
    Media: {
      query: landing,
      variables() {
        return { id: this.image.anime };
      },
    },
  },
  computed: {
    source() {
      return this.Media?.title?.english || this.Media?.title?.romaji || this.Media?.title?.native || "...";
    },
  },
  watch: {
    Media: {
      deep: true,
      handler(_newData, oldData) {
        if (oldData) {
          return;
        }
        this.dataLoaded++;
      },
    },
    image: {
      deep: true,
      handler() {
        this.dataLoaded++;
      },
    },
    dataLoaded() {
      if (this.dataLoaded < 2) {
        return;
      }
      this.$nuxt.$loading.finish();
    },
  },
  mounted() {
    this.setImage();
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });
  },
  methods: {
    async setImage() {
      const images = (await this.$axios.get("https://screencaps.sakuta.app/index.json")).data;
      this.image = images?.images[Math.floor(Math.random() * images?.images.length)] || "";
    },
  },
});
</script>
