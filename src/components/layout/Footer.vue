<template>
  <div :class="`bg-dark-800 shadow-sm py-8 absolute bottom-0 w-full ${alwaysShowBottom ? 'pb-25' : 'pb-25 md:pb-8'}`">
    <Container>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="text-left">
          <nuxt-link to="/">
            <img src="/assets/svg/logo.svg" class="w-2/3 lg:w-1/2" />
          </nuxt-link>
          <p class="mt-2 text-gray-400" v-html="license($t('footer.license'))" />
        </div>
        <div v-for="category in links" :key="category.title" class="text-left flex flex-col">
          <h2 class="font-semibold mb-1">
            {{ $t(category.title) }}
          </h2>
          <div v-for="link in category.links" :key="link.link" class="text-gray-400">
            <nuxt-link v-if="!link.external" :to="link.link">
              {{ $t(link.text) }}
            </nuxt-link>
            <a v-else :href="link.link" target="_blank">{{ $t(link.text) }}</a>
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
      alwaysShowBottom: localStorage.getItem("navigation") === "bottom",
      links: [
        {
          title: "footer.category.sakuta",
          links: [
            {
              link: "/explore",
              text: "nav.link.explore",
            },
            {
              link: "/search",
              text: "nav.link.search",
            },
          ],
        },
        {
          title: "footer.category.legal",
          links: [
            {
              link: "/imprint",
              text: "footer.link.imprint",
            },
            {
              link: "/privacy",
              text: "footer.link.privacy",
            },
          ],
        },
        {
          title: "footer.category.social",
          links: [
            {
              external: true,
              link: "https://twitter.com/trysakuta",
              text: "Twitter",
            },
            {
              external: true,
              link: "https://github.com/sakutaapp",
              text: "GitHub",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.$nuxt.$on("navigationTypeChange", (type: string) => {
      this.alwaysShowBottom = type === "bottom";
    });
  },
  methods: {
    license(string: string): any {
      const match = string.match(/\[.*?\]/g);
      if (!match) {
        return string;
      }
      const currentYear = new Date().getFullYear();
      return `© 2021-${currentYear} Sakuta | ${string.replace(
        match[0],
        `<a href="https://github.com/sakutaapp/sakuta-web/blob/master/LICENSE.md" target="_blank" class="underline hover:text-primary transition duration-100">${match[0].slice(
          1,
          match[0].length - 1,
        )}</a>`,
      )}`;
    },
  },
});
</script>
