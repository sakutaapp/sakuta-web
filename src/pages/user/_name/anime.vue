<template>
  <Container class="mt-5">
    <anilist-gql-response>{{ User }}</anilist-gql-response>
    <UserHeader :user="User" />
    <UserTabs :username="User?.name" class="mb-3 hidden md:flex" />
    <div class="flex flex-col md:flex-row md:space-x-3 space-y-4 md:space-y-0">
      <div class="w-full md:w-1/5 flex flex-col space-y-3"></div>
      <div class="w-full md:w-4/5 flex flex-col space-y-3">
        <UserList v-for="list in animeLists" :key="list.name" :list="list" />
      </div>
    </div>
  </Container>
</template>

<script>
import Vue from "vue";
import user from "../../../apollo/queries/user";
import userAnimeList from "../../../apollo/queries/userAnimeList";

function mergeLists(lists1, lists2) {
  const mergedLists = [];

  // Merge lists with the same name
  for (const list1 of lists1) {
    const list2Index = lists2.findIndex((list2) => list2.name === list1.name);
    if (list2Index !== -1) {
      const list2 = lists2.splice(list2Index, 1)[0];
      const mergedList = {
        ...list1,
        entries: [...list1.entries, ...list2.entries],
      };
      mergedLists.push(mergedList);
    } else {
      mergedLists.push(list1);
    }
  }

  // Add remaining lists from lists2
  mergedLists.push(...lists2);

  // Remove duplicate entries
  const dedupedLists = mergedLists.map((list) => {
    const dedupedEntries = [];
    const entryMap = new Map();
    for (const entry of list.entries) {
      const key = entry.media.id;
      if (!entryMap.has(key)) {
        entryMap.set(key, true);
        dedupedEntries.push(entry);
      }
    }
    return { ...list, entries: dedupedEntries };
  });

  return dedupedLists;
}

export default Vue.extend({
  data() {
    return {
      chunk: 1,
      animeLists: [],
      dataLoaded: [],
    };
  },
  head() {
    return {
      title: this.User?.name ? this.User?.name + "'s anime list" : "Anime list",
    };
  },
  apollo: {
    User: {
      query: user,
      prefetch: ({ route }) => ({ id: route.params.name }),
      variables() {
        return { name: this.$route.params.name };
      },
      error: () => {
        $nuxt.$emit("goHome");
      },
    },
    userAnimeList: {
      query: userAnimeList,
      prefetch: ({ route }) => ({ id: route.params.name }),
      variables() {
        return {
          chunk: this.chunk,
          name: this.$route.params.name,
        };
      },
      update: (data) => {
        return data.MediaListCollection;
      },
      error: () => {
        $nuxt.$emit("goHome");
      },
    },
  },
  computed: {
    about() {
      return this.User?.about || this.$i18n.t("user.noAbout");
    },
    statistics() {
      return [
        { stat: "animeCount", value: this.User?.statistics?.anime?.count },
        { stat: "minutesWatched", value: this.User?.statistics?.anime?.minutesWatched },
        { stat: "episodesWatched", value: this.User?.statistics?.anime?.episodesWatched },
        { stat: "mangaCount", value: this.User?.statistics?.manga?.count },
        { stat: "chaptersRead", value: this.User?.statistics?.manga?.chaptersRead },
        { stat: "volumesRead", value: this.User?.statistics?.manga?.volumesRead },
      ];
    },
  },
  watch: {
    User: {
      deep: true,
      handler(_newData, oldData) {
        if (oldData) return;
        if (!this.dataLoaded.includes("user")) this.dataLoaded.push("user");
      },
    },
    userAnimeList: {
      deep: true,
      handler(newData, _oldData) {
        console.log("chunk", this.chunk);
        this.animeLists = mergeLists(this.animeLists, newData?.lists);
        if (newData.hasNextChunk) this.chunk++;
        if (!newData.hasNextChunk && !this.dataLoaded.includes("list")) this.dataLoaded.push("list");
      },
    },
    dataLoaded() {
      if (this.dataLoaded.length < 1) return;
      this.$nuxt.$loading.finish();
    },
  },
  mounted() {
    this.$nextTick(() => {
      console.log("mounted");
      this.$nuxt.$loading.start();
    });
  },
});
</script>
