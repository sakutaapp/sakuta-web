<template>
  <nuxt-link :to="url">
    <div class="bg-dark-900 px-5 py-3 flex rounded shadow hover:pl-6 cursor-pointer transition-all duration-250">
      <img :src="cover" class="h-20 rounded-md" />
      <div class="flex-grow w-full self-center ml-5">
        <h3 class="text-gray-400 text-xs uppercase">
          {{ $tc(`activities.status.${status}`, plural ? 2 : 1, [progress]) }}
        </h3>
        <h2 class="text-lg">
          {{ title }}
        </h2>
      </div>
      <div class="flex flex-col justify-between text-right text-sm text-gray-500 flex-grow w-full">
        <p>
          {{ $moment.unix(date).locale($i18n.locale).fromNow() }}
        </p>
        <div class="flex justify-end items-center space-x-1">
          <p class="flex-grow">
            {{ $tc("general.likes", likeCount, [likeCount]) }}
          </p>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import Vue from "vue";

function toCamelCase(string: string): string {
  return string
    .replace(/\s(.)/g, function (a: string) {
      return a.toUpperCase();
    })
    .replace(/\s/g, "")
    .replace(/^(.)/, function (b: string) {
      return b.toLowerCase();
    });
}
export default Vue.extend({
  props: {
    activity: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cover(): any {
      return this.activity?.media?.coverImage?.medium || "";
    },
    status(): any {
      return toCamelCase(this.activity?.status) || "";
    },
    plural(): any {
      return this.activity?.progress && this.activity.progress.includes(" - ");
    },
    progress(): any {
      return this.activity?.progress || undefined;
    },
    title(): any {
      return this.activity?.media?.title?.english || this.activity?.media?.title?.romaji || this.activity?.media?.title?.native || "";
    },
    date(): any {
      return this.activity?.createdAt || "Unknown";
    },
    likeCount(): any {
      return this.activity?.likeCount || 0;
    },
    url(): any {
      return `/${this.activity?.media?.type?.toLowerCase()}/${this?.activity?.media?.id}` || "";
    },
  },
});
</script>
