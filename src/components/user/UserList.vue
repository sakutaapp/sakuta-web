<template>
  <Section>
    <h2 class="text-lg font-semibold">
      {{ list?.isCustomList ? list?.name : $t(`user.list.${list?.name}`) }}
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
      <UserListMediaCard v-for="entry in list.entries" :key="entry.media.id" :entry="entry" />
    </div>
  </Section>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
});
</script>
