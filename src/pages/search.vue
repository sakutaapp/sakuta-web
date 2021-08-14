<template>
    <Container class="mt-5">
        <div class="flex flex-col md:flex-row mb-5 md:space-x-3 space-y-2 md:space-y-0">
            <input v-model="filters.query" type="text" class="bg-gray-800 dark:bg-dark-800 px-3 py-1 rounded focus:bg-gray-700 focus:dark:bg-dark-700 focus:outline-none focus:rounded-lg transition duration-250 w-full flex-grow" placeholder="Search...">
            <div class="flex space-x-3 justify-between md:justify-end w-full">
                <div class="flex space-x-3">
                    <select class="bg-gray-800 dark:bg-dark-800 focus:outline-none rounded transition duration-250 focus:bg-gray-700 focus:dark:bg-dark-700 pr-8" v-model="filters.type">
                        <option value="ALL">{{ $t("search.filters.type.ALL") }}</option>
                        <option value="ANIME">{{ $t("media.type.ANIME") }}</option>
                        <option value="MANGA">{{ $t("media.type.MANGA") }}</option>
                    </select>
                    <select class="bg-gray-800 dark:bg-dark-800 focus:outline-none rounded transition duration-250 focus:bg-gray-700 focus:dark:bg-dark-700 pr-8" v-model="filters.sort">
                        <option v-for="sortOption in sortOptions" :key="sortOption" :value="sortOption">{{ $t(`search.sort.${sortOption}`) }}</option>
                    </select>
                </div>
                <a :href="`/search?${filterQuery}`"><div class="bg-gray-800 dark:bg-dark-800 hover:bg-gray-700 dark:hover:bg-dark-700 transition duration-100 h-8 w-8 rounded-full flex justify-center items-center"><svg class="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg></div></a>
            </div>
        </div>
        <MediaGrid :media="previousEntries" />
        <div id="scroll-sensor"></div>
        <MediaGrid :media="data" /> 
        <EndOfPage />
    </Container>
</template>


<script>
import search from "../apollo/queries/search";
import scrollMonitor from "scrollmonitor";

const sortOptions = ["POPULARITY_DESC", "POPULARITY", "TRENDING_DESC", "FAVOURITES_DESC", "FAVOURITES", "SCORE_DESC"];

function validateSortOption(sortOption) {
    if(sortOption && sortOptions.includes(sortOption)) {
        return sortOption;
    } else {
        return sortOptions[0];
    }
}

function validateTypeFilter(typeFilter) {
    switch(typeFilter) {
        case "ANIME":
            return "ANIME";
        case "MANGA":
            return "MANGA";
        default:
            return undefined;
    }
}

function validateQuery(query) {
    if(query === "" || !query) return undefined;
    return query.replace(/[<>]/g, "");
}

export default {
    apollo: {
        search: {
            query: search,
            variables () {
                return { page: this.page, sort: validateSortOption(this.$route?.query?.sort), type: validateTypeFilter(this.$route?.query?.type), search: validateQuery(this.$route?.query?.q) };
            },
            update: (data) => {
                return data.Page.media;
            }
        }
    },
    computed: {
        data() {
            return this.search || []
        },
        filterQuery() {
            let queryParams = [];
            if(this.filters.type !== "ALL") {
                queryParams.push(`type=${this.filters.type}`);
            }
            queryParams.push(`sort=${this.filters.sort}`);
            if(this.filters.query.length > 0) {
                queryParams.push(`q=${this.filters.query}`);
            }
            return queryParams.join("&");
        },
    },
    data() {
        return {
            page: 1,
            previousEntries: [],
            sortOptions,
            filters: {
                type: validateTypeFilter(this.$route?.query?.type) || "ALL",
                sort: validateSortOption(this.$route?.query?.sort),
                query: validateQuery(this.$route?.query?.q) || ""
            }
        }
    },
    methods: {
        fetchMore() {
            this.previousEntries = [...this.previousEntries, ...this.data];
            this.page++;
        }
    },
    watch: {
        search: {
            deep: true,
            handler(newValue, oldValue) {
                if(oldValue === undefined) {
                    this.previousEntries = this.data;
                    this.page++;
                    const element = document.getElementById("scroll-sensor");
                    const elementWatcher = scrollMonitor.create(element);
                    elementWatcher.enterViewport(() => {
                        if(window.scrollY > 0) {
                            console.log(1);
                            this.fetchMore();
                        }
                    });
                }
            }
        }
    }
};
</script>