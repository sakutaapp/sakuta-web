<template>
    <div class="fixed w-full top-30 md:top-50 left-0 z-10 flex items-center justify-center" @keydown.arrow-down.prevent="down()" @keydown.tab.prevent="down()" @keydown.arrow-up.prevent="up()" @keydown.enter="enter()">
        <div class="bg-gray-800 dark:bg-dark-800 !bg-opacity-70 backdrop-filter backdrop-blur-lg w-9/10 max-w-128 shadow-2xl rounded-lg overflow-hidden relative">
            <div class="px-5 py-3 flex flex-col items-start">
                <div v-if="page !== ''" class="bg-white !bg-opacity-10 px-1.5 py-1 text-xs rounded mb-3">{{ $t(`nav.commandMenu.subPage.${page}`) }}</div>
                <input ref="commandMenuSearch" id="commandMenuSearch" class="w-full bg-transparent text-white" @blur="setFocus(true)" type="text" autofocus v-model="query" :placeholder="$t('nav.commandMenu.placeholder')" autocomplete="off" />
            </div>
            <CommandMenuOptions :options="options" v-model="activeOption" @enter="enter()" :page="page" />
            <div v-if="options.length < 1" class="pb-2 px-5">
                {{ $t("nav.commandMenu.noResults") }}
            </div>
            <div v-if="loading" class="absolute w-32 h-1 bg-primary top-0 command-menu-loading"></div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import FuzzySearch from "fuzzy-search";
import commandMenu from "../../apollo/queries/commandMenu";

const mainOptions = [
    {
        name: "animeSearch",
        icon: '<rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline>',
    },
    {
        name: "mangaSearch",
        icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
    },
    {
        name: "userSearch",
        icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
    },
    {
        name: "explore",
        icon: '<circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>',
    },
    {
        name: "search",
        icon: '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>',
    },
];

export default Vue.extend({
    apollo: {
        results: {
            query: commandMenu,
            variables() {
                return { query: this.queryGraphql, type: this.mediaType };
            },
            update: function (data) {
                switch (this.page) {
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
    data() {
        return {
            query: "",
            queryGraphql: null,
            options: mainOptions,
            activeOption: "animeSearch",
            page: "",
            loading: false,
            mediaType: "ANIME",
        };
    },
    mounted() {
        this.resetMainOptions();
        this.setFocus(true);

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" || e.key === "Backspace") {
                if (e.key === "Backspace" && this.query.length > 0) return;
                if (this.page === "") {
                    this.$emit("close");
                } else {
                    this.page = "";
                    this.loading = false;
                }
            }
        });
    },
    beforeDestroy() {
        this.setFocus(false);
    },
    methods: {
        setFocus(active) {
            if (!this.$refs.commandMenuSearch) return;
            if (active) {
                /// @ts-ignore
                this.$refs.commandMenuSearch.focus();
            } else {
                /// @ts-ignore
                this.$refs.commandMenuSearch.blur();
            }
        },
        resetMainOptions() {
            const homeItemIndex = mainOptions.findIndex((option) => option.name === "home");
            if (localStorage.getItem("homePage") === "landing" && homeItemIndex < 0) {
                mainOptions.push({
                    name: "home",
                    icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
                });
            }
            this.options = mainOptions;
        },
        up() {
            if (this.activeIndex > 0) {
                if (!this.options[this.activeIndex - 1]) return;
                this.activeOption = this.options[this.activeIndex - 1].name;
            } else {
                if (!this.options[this.options.length - 1]) return;
                this.activeOption = this.options[this.options.length - 1].name;
            }
        },
        down() {
            if (this.activeIndex + 1 < this.options.length) {
                if (!this.options[this.activeIndex + 1]) return;
                this.activeOption = this.options[this.activeIndex + 1].name;
            } else {
                if (!this.options[0]) return;
                this.activeOption = this.options[0].name;
            }
        },
        enter() {
            if (this.page === "") {
                if (!this[this.activeOption]) return;
                this[this.activeOption]();
            } else {
                if (!this[`${this.page}Action`]) return;
                this[`${this.page}Action`](this.activeOption);
            }
        },

        animeSearch() {
            this.page = "animeSearch";
        },
        animeSearchAction(id) {
            this.$router.push(`/anime/${id}`);
            this.$emit("close");
        },
        mangaSearch() {
            this.page = "mangaSearch";
        },
        mangaSearchAction(id) {
            this.$router.push(`/manga/${id}`);
            this.$emit("close");
        },
        userSearch() {
            this.page = "userSearch";
        },
        userSearchAction(username) {
            this.$router.push(`/user/${username}`);
            this.$emit("close");
        },
        explore() {
            this.$router.push("/explore");
            this.$emit("close");
        },
        search() {
            this.$router.push("/search");
            this.$emit("close");
        },
        home() {
            this.$router.push("/landing");
            this.$emit("close");
        },
    },
    computed: {
        activeIndex() {
            return this.options.findIndex((option) => option.name === this.activeOption);
        },
    },
    watch: {
        query(newQuery) {
            if (this.page === "") {
                if (newQuery.length === 0) {
                    this.options = mainOptions;
                } else {
                    const mainOptionsTranslated = [];
                    mainOptions.forEach((mainOption) => {
                        mainOptionsTranslated.push({
                            nameTranslated: this.$t(`nav.commandMenu.${mainOption.name}`),
                            ...mainOption,
                        });
                    });
                    const search = new FuzzySearch(mainOptionsTranslated, ["nameTranslated"], {
                        caseSensitive: false,
                        sort: true,
                    });
                    this.options = search.search(newQuery);
                    if (this.options.findIndex((option) => option.name === this.activeOption) < 0 && this.options.length > 0) this.activeOption = this.options[0].name;
                }
            } else {
                if (newQuery.length === 0) {
                    this.queryGraphql = null;
                } else {
                    this.queryGraphql = newQuery;
                }
            }
        },
        page(page) {
            this.query = "";
            if (page === "mangaSearch") {
                this.mediaType = "MANGA";
            } else {
                this.mediaType = "ANIME";
            }
            if (page === "") {
                this.resetMainOptions();
            } else {
                this.options = [];
                this.loading = true;
            }
            this.$apollo.queries.results.refetch();
        },
        results: {
            deep: true,
            handler(newResults) {
                if (this.page === "userSearch") {
                    const options = [];
                    newResults.forEach((user) => {
                        options.push({
                            name: user.name,
                            display: user.name,
                            image: user.avatar.medium,
                        });
                    });
                    this.options = options;
                    this.loading = false;
                    if (this.options.findIndex((option) => option.name === this.activeOption) < 0 && this.options.length > 0) this.activeOption = this.options[0].name;
                } else if (this.page === "animeSearch" || this.page === "mangaSearch") {
                    const options = [];
                    newResults.forEach((media) => {
                        options.push({
                            name: media.id.toString(),
                            display: media.title.english || media.title.romaji || media.title.native,
                            properties: { format: media.format, status: media.status, season: media.season, seasonYear: media.seasonYear },
                            image: media.coverImage.medium,
                        });
                    });
                    this.options = options;
                    this.loading = false;
                    if (this.options.findIndex((option) => option.name === this.activeOption) < 0 && this.options.length > 0) this.activeOption = this.options[0].name;
                }
            },
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
