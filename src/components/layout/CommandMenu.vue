<template>
  <div
    class="fixed w-full top-30 md:top-50 left-0 z-10 flex items-center justify-center"
    @keydown.arrow-down.prevent="down()"
    @keydown.tab.prevent="down()"
    @keydown.arrow-up.prevent="up()"
    @keydown.enter="enter()"
    @keydown.esc="close()"
    @keydown.backspace="close(true)"
  >
    <div
      class="bg-dark-800 !bg-opacity-70 backdrop-filter backdrop-blur-lg w-9/10 max-w-128 shadow-2xl rounded-lg overflow-hidden relative"
    >
      <div class="px-5 py-3 flex flex-col items-start">
        <div v-if="subpage" class="bg-white !bg-opacity-10 px-1.5 py-1 text-xs rounded mb-3">
          {{ $t(`nav.commandMenu.subPage.${subpage}`) }}
        </div>
        <input
          id="commandMenuSearch"
          ref="commandMenuSearch"
          v-model="input"
          class="w-full bg-transparent text-white"
          type="text"
          autofocus
          :placeholder="$t('nav.commandMenu.placeholder')"
          autocomplete="off"
          @blur="setFocus(true)"
        />
      </div>
      <CommandMenuOptions
        v-model="selectedOption"
        :options="options"
        :page="subpage"
        @enter="enter()"
        @change="$store.commit('commandMenu/selectOption', $event)"
      />
      <div v-if="options.length < 1" class="pb-2 px-5">
        {{ $t("nav.commandMenu.noResults") }}
      </div>
      <div v-if="loading" class="absolute w-32 h-1 bg-primary top-0 command-menu-loading" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import FuzzySearch from "fuzzy-search";
import commandMenu from "../../apollo/queries/commandMenu";

export default Vue.extend({
  apollo: {
    results: {
      query: commandMenu,
      variables() {
        return { query: this.queryGraphql, type: this.mediaType };
      },
      update: function (data) {
        switch (this.subpage) {
          case "animeSearch": {
            return data.media.media;
          }
          case "mangaSearch": {
            return data.media.media;
          }
          case "userSearch": {
            return data.user.users;
          }
          default: {
            return [];
          }
        }
      },
    },
  },
  props: {
    searchOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      allOptions: [
        {
          name: "animeSearch",
          icon: '<rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline>',
          closeAfterAction: false,
          action: () => {
            this.$store.commit("commandMenu/setSubpage", "animeSearch");
          },
        },
        {
          name: "mangaSearch",
          icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
          closeAfterAction: false,
          action: () => {
            this.$store.commit("commandMenu/setSubpage", "mangaSearch");
          },
        },
        {
          name: "userSearch",
          icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
          closeAfterAction: false,
          action: () => {
            this.$store.commit("commandMenu/setSubpage", "userSearch");
          },
        },
        {
          name: "home",
          icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
          action: () => {
            this.$router.push("/");
          },
          condition: () => {
            return !this.searchOnly;
          },
        },
        {
          name: "explore",
          icon: '<circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>',
          action: () => {
            this.$router.push("/explore");
          },
        },
      ],
      input: "",
      queryGraphql: null,
      options: [],
      mediaType: "ANIME",
    };
  },
  computed: {
    selectedIndex() {
      return this.options.findIndex((option) => option.name === this.selectedOption);
    },
    subpage() {
      return this.$store.state.commandMenu.subpage;
    },
    loading() {
      return this.$apollo.queries.results.loading;
    },
    selectedOption() {
      return this.$store.state.commandMenu.selectedOption;
    },
  },
  watch: {
    input(newInput) {
      if (!this.subpage) {
        // Handle main options when no subpage is active
        if (newInput.length === 0) {
          // Set all options when input is empty
          this.options = this.allOptions;
        } else {
          // Set options based on fuzzy search
          const allOptionsTranslated = [];
          this.allOptions.forEach((mainOption) => {
            allOptionsTranslated.push({
              nameTranslated: this.$t(`nav.commandMenu.${mainOption.name}`),
              ...mainOption,
            });
          });
          const fuzzySearch = new FuzzySearch(allOptionsTranslated, ["nameTranslated"], {
            caseSensitive: false,
            sort: true,
          });
          this.options = fuzzySearch.search(newInput);
          if (this.options.findIndex((option) => option.name === this.selectedOption) < 0 && this.options.length > 0) {
            this.$store.commit("commandMenu/selectOption", this.options[0].name);
          }

          switch (newInput) {
            case "u:": {
              this.$store.commit("commandMenu/setSubpage", "userSearch");
              break;
            }
            case "a:": {
              this.$store.commit("commandMenu/setSubpage", "animeSearch");
              break;
            }
            case "m:": {
              this.$store.commit("commandMenu/setSubpage", "mangaSearch");
              break;
            }
          }
        }
      } else if (newInput.length === 0) {
        // Handle subpage searching
        this.queryGraphql = null;
      } else {
        // Handle subpage searching
        this.queryGraphql = newInput;
      }
    },
    subpage(subpage) {
      this.input = "";
      if (subpage === "mangaSearch") {
        this.mediaType = "MANGA";
      } else {
        this.mediaType = "ANIME";
      }
      if (!subpage) {
        this.resetMainOptions();
      } else {
        this.options = [];
        this.$store.commit("commandMenu/startLoading");
      }
      this.$apollo.queries.results.refetch();
    },
    results: {
      deep: true,
      handler(newResults) {
        if (this.subpage === "userSearch") {
          const options = [];
          newResults.forEach((user) => {
            options.push({
              name: user.name,
              display: user.name,
              image: user.avatar.medium,
            });
          });
          this.options = options;
          this.$store.commit("commandMenu/stopLoading");
          if (this.options.findIndex((option) => option.name === this.selectedOption) < 0 && this.options.length > 0) {
            this.$store.commit("commandMenu/selectOption", this.options[0].name);
          }
        } else if (this.subpage === "animeSearch" || this.subpage === "mangaSearch") {
          const options = [];
          newResults.forEach((media) => {
            options.push({
              name: media.id.toString(),
              display: media.title.english || media.title.romaji || media.title.native,
              properties: { format: media.format, status: media.status, season: media.season, seasonYear: media.seasonYear },
              image: media.coverImage.medium,
            });
          });
          this.options = options.slice(0, 10);
          /*
          if (options.length > 10) {
            this.options.push({
              name: "more",
              icon: '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>',
            });
          }
          */
          this.$store.commit("commandMenu/stopLoading");
          if (this.options.findIndex((option) => option.name === this.selectedOption) < 0 && this.options.length > 0) {
            this.$store.commit("commandMenu/selectOption", this.options[0].name);
          }
        }
      },
    },
  },
  mounted() {
    this.resetMainOptions();
    this.setFocus(true);
  },
  beforeDestroy() {
    this.setFocus(false);
    window.removeEventListener("keydown", () => {});
  },
  methods: {
    close(backspace = false) {
      if (backspace && this.input.length > 0) return;
      if (!this.subpage) {
        this.$store.commit("commandMenu/close");
      } else {
        this.$store.commit("commandMenu/setSubpage", null);
        this.$store.commit("commandMenu/selectOption", this.options[0].name);
        this.$store.commit("commandMenu/stopLoading");
      }
    },
    setFocus(active) {
      if (!this.$refs.commandMenuSearch) {
        return;
      }
      if (active) {
        /// @ts-ignore
        this.$refs.commandMenuSearch.focus();
      } else {
        /// @ts-ignore
        this.$refs.commandMenuSearch.blur();
      }
    },
    resetMainOptions() {
      this.options = this.allOptions;
    },
    up() {
      if (this.selectedIndex > 0) {
        if (!this.options[this.selectedIndex - 1]) return;
        this.$store.commit("commandMenu/selectOption", this.options[this.selectedIndex - 1].name);
      } else {
        if (!this.options[this.options.length - 1]) return;
        this.$store.commit("commandMenu/selectOption", this.options[this.options.length - 1].name);
      }
    },
    down() {
      if (this.selectedIndex + 1 < this.options.length) {
        if (!this.options[this.selectedIndex + 1]) return;
        this.$store.commit("commandMenu/selectOption", this.options[this.selectedIndex + 1].name);
      } else {
        if (!this.options[0]) return;
        this.$store.commit("commandMenu/selectOption", this.options[0].name);
      }
    },
    enter() {
      if (!this.subpage) {
        const option = this.options.find((option) => option.name === this.selectedOption);
        if (option && option.action) option.action();
        if (option.closeAfterAction ?? true) this.$store.commit("commandMenu/close");
      } else {
        if (!this[`${this.subpage}Action`]) return;
        this[`${this.subpage}Action`](this.selectedOption);
      }
    },
    animeSearchAction(id) {
      if (id === "more") {
        if (document.location.pathname.startsWith("/search")) {
          document.location.href = `/search?type=ANIME&sort=POPULARITY_DESC&q=${encodeURIComponent(this.input)}`;
        } else {
          this.$router.push(`/search?type=ANIME&sort=POPULARITY_DESC&q=${encodeURIComponent(this.input)}`);
        }
      } else {
        this.$router.push(`/anime/${id}`);
      }
      this.$store.commit("commandMenu/close");
    },
    mangaSearchAction(id) {
      if (id === "more") {
        if (document.location.pathname.startsWith("/search")) {
          document.location.href = `/search?type=MANGA&sort=POPULARITY_DESC&q=${encodeURIComponent(this.input)}`;
        } else {
          this.$router.push(`/search?type=MANGA&sort=POPULARITY_DESC&q=${encodeURIComponent(this.input)}`);
        }
      } else {
        this.$router.push(`/manga/${id}`);
      }
      this.$store.commit("commandMenu/close");
    },
    userSearchAction(username) {
      this.$router.push(`/user/${username}`);
      this.$store.commit("commandMenu/close");
    },
  },
});
</script>

<style>
#commandMenuSearch:focus {
  outline: none;
}
.command-menu-loading {
  animation: command-menu-loading 1s linear infinite;
}
@keyframes command-menu-loading {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
