<template>
  <div
    class="w-full rounded-md shadow min-h-40 lg:min-h-45 xl:min-h-50 flex items-end justify-start text-white p-2 pb-2 hover:pb-4 transition-all duration-250 cursor-pointer news-card"
    :style="`background-image: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%), url('https://cms.sakuta.app/assets/${post.image.filename_disk}');`"
    @click="open()"
  >
    <div class="flex flex-col h-full space-y-1.5">
      <p class="text-xs opacity-85 flex-grow whitespace-nowrap h-full flex-grow text-right">
        {{ $moment.unix(publishedDate).locale($i18n.locale).fromNow() }}
      </p>
      <p class="font-semibold">
        {{ post.title }}
      </p>
      <div class="flex items-center space-x-1">
        <img height="20px" width="20px" :src="`https://cms.sakuta.app/assets/${post.author.avatar.filename_disk}`" class="rounded-full" />
        <p class="text-sm font-semibold opacity-85 flex-grow w-full">
          {{ post.author.username }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    post: {
      type: Object,
      required: true,
    },
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

<style>
.news-card {
  background-size: 100% auto;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}

.news-card:hover {
  background-size: 105% auto;
}
</style>
