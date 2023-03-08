<template>
  <Section v-if="episodes.length > 0">
    <h2 class="text-lg font-semibold">
      {{ $t("media.section.episodes") }}
    </h2>
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 mt-2">
      <EpisodeCard v-for="episode in episodes" :key="episode.title" :episode="episode" />
    </div>
  </Section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    episodes: {
      type: Array,
      required: true,
    },
  },
});
</script>
