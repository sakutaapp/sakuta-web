<template>
  <Container>
    <div class="bg-primary bg-opacity-15 rounded-lg flex space-x-3 p-3 items-center mt-3 mb-5">
      <div class="flex-grow">
        <AttentionIcon :filled="true" size="50" />
      </div>
      <div class="flex flex-col items-start flex-grow w-full">
        <h2 class="text-white font-semibold text-lg">
          {{ $t("news.notReleased.heading") }}
        </h2>
        <p>{{ $t("news.notReleased.text") }}</p>
        <p v-if="language !== 'en'" class="mt-2 font-medium">
          {{ $t("news.notReleased.text.language") }}
        </p>
        <Button v-if="language !== 'en'" to="/news?lang=en" css="bg-dark-900 hover:bg-dark-800 text-white mt-2">
          {{ $t("news.notReleased.viewInEnglish") }}
        </Button>
      </div>
    </div>
    <div v-if="posts.length >= 1" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-2">
      <NewsCard v-for="post in posts" :key="post.slug" :post="post" />
    </div>
    <div v-else-if="pulled" class="flex justify-center w-full">
      <div class="flex flex-col">
        <div class="flex justify-center space-x-2 mb-5 mt-5">
          <Eye />
          <Eye />
        </div>
        <h2>{{ $t("news.noPosts") }}</h2>
      </div>
    </div>
    <div v-else>
      <p class="text-center">
        {{ $t("news.loadingPosts") }}
      </p>
    </div>
  </Container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      language: this.$route.query.lang || localStorage.getItem("lang") || "en",
      posts: [],
      pulled: false,
    };
  },
  mounted() {
    this.updatePosts();
    this.$nuxt.$on("languageSwitch", this.updatePosts);
  },
  methods: {
    updatePosts() {
      this.language = this.$route.query.lang || localStorage.getItem("lang") || "en";
      this.pulled = false;
      this.$axios
        .$get(
          `https://cms.sakuta.app/items/articles?fields=slug,title,published,image.filename_disk,author.*,author.avatar.filename_disk&sort=-published&filter[language][_eq]=${this.language}`,
        )
        .then((response: any) => {
          this.posts = response.data;
          this.pulled = true;
        });
    },
  },
});
</script>
