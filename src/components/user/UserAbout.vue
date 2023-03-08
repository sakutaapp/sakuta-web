<template>
  <Section>
    <h2 class="text-lg font-semibold">
      {{ $t("user.section.about") }}
    </h2>
    <p v-html="about" />
  </Section>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    about: {
      type: String,
      required: true,
    },
  },
});
</script>
