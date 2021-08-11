<template>
  <div class="bg-gray-800 dark:bg-dark-800 shadow-sm py-8 absolute bottom-0 w-full">
    <Container>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="text-left">
          <nuxt-link to="/"><img src="/assets/svg/logo.svg" class="w-2/3 lg:w-1/2" /></nuxt-link>
          <p class="mt-2 text-gray-400">© 2021 Sakuta | All rights reserved.</p>
        </div>
        <div class="text-left flex flex-col" v-for="category in links" :key="category.title">
          <h2 class="font-semibold mb-1">{{ $t(category.title) }}</h2>
          <div class="text-gray-400" v-for="link in category.links" :key="link.link">
            <nuxt-link :to="link.link">{{ $t(link.text) }}</nuxt-link>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      links: [
        {
          title: "footer.category.sakuta",
          links: []
        },
        {
          title: "footer.category.legal",
          links: [
            {
              external: false,
              link: "/imprint",
              text: "footer.link.imprint"
            },
            {
              external: false,
              link: "/privacy",
              text: "footer.link.privacy"
            },
            {
              external: false,
              link: "/terms",
              text: "footer.link.terms"
            }
          ]
        },
        {
          title: "footer.category.social",
          links: [
            {
              external: true,
              link: "https://twitter.com/sakutaapp",
              text: "Twitter"
            },
            {
              external: true,
              link: "https://discord.gg",
              text: "Discord"
            }
          ]
        }
      ]
    }
  }
});
</script>