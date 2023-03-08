<template>
  <div
    class="w-full rounded-md shadow min-h-40 lg:min-h-45 flex items-end justify-start text-white p-2 pb-2 hover:pb-4 transition-all duration-250 cursor-pointer character-card"
    :style="`background-image: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%), url('${character.node.image.large}');`"
    @click="$emit('open')"
  >
    <div>
      <p class="font-semibold">
        {{ character.node.name.full }}
      </p>
      <p class="text-xs font-semibold uppercase opacity-70">
        {{ $t(`character.role.${character.role}`) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style>
.character-card {
  background-size: 100%;
  background-position: 50% 35%;
}

.character-card:hover {
  background-size: 105%;
}
</style>
