<template>
  <Container class="mt-5">
    <h1 class="text-3xl font-bold mb-1">
      {{ $t("privacy.heading") }}
    </h1>
    <p
      v-html="
        $t('privacy.text', {
          netlify: `<a target='_blank' href='https://www.netlify.com/privacy/' class='underline'>${$t('privacy.netlifyLink')}</a>`,
          anilist: `<a target='_blank' href='https://anilist.co/terms' class='underline'>${$t('privacy.anilistLink')}</a>`,
        })
      "
    />
  </Container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  head: {
    title: "Privacy Policy",
  },
});
</script>
