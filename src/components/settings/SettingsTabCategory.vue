<template>
  <div class="flex flex-col space-y-2 mb-5">
    <p class="md:text-xs font-semibold uppercase pl-5 md:pl-0">
      {{ $t(`settings.headings.${category}`) }}
    </p>
    <SettingsTab
      v-for="page in pages"
      :key="page.name"
      :class="page.name === 'appearance' ? 'hidden md:flex' : ''"
      :page="page"
      :active="page.name === activePage"
      @pageswitch="$emit('pageswitch', $event)"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    category: {
      type: String,
      required: true,
    },
    pages: {
      type: Array,
      required: true,
    },
    activePage: {
      type: String,
      default: "",
    },
  },
});
</script>
