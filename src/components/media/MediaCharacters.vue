<template>
  <Section>
    <h2 class="text-lg font-semibold">
      {{ $t("media.section.characters") }}
    </h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-2">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character" @open="$emit('open', character.node.id)" />
    </div>
  </Section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    characters: {
      type: Array,
      required: true,
    },
  },
});
</script>
