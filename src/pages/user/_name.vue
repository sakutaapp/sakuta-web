<template>
    <Container class="mt-5">
        <anilist-gql-response>{{ User }}</anilist-gql-response>
        <UserHeader :user="User" />
        <div class="flex flex-col md:flex-row md:space-x-3 space-y-4 md:space-y-0">
            <div class="w-full md:w-1/5 flex flex-col space-y-3">
                <Section class="flex md:flex-col md:space-y-2 space-x-5 md:space-x-0 overflow-x-scroll md:overflow-hidden">
                    <h2 class="text-lg font-semibold">{{ $t("user.section.statistics") }}</h2>
                    <UserStatistic v-for="stat in statistics" :key="stat.stat" :prop="stat.stat" :value="stat.value" />
                </Section>
            </div>
            <div class="w-full md:w-4/5 flex flex-col space-y-3">
                <UserAbout :about="about" />
                <UserActivities :activities="activities" @fetch="page++" />
            </div>
        </div>
    </Container>
</template>


<script>
import Vue from "vue";
import user from "../../apollo/queries/user";
import userActivity from "../../apollo/queries/userActivity";

export default Vue.extend({
    head() {
        return {
            title: this.User?.name || "User",
        }
    },
    data() {
        return {
            page: 1,
        }
    },
    apollo: {
        User: {
            query: user,
            prefetch: ({ route }) => ({ id: route.params.name }),
            variables () {
                return { name: this.$route.params.name }
            }
        },
        activities: {
            query: userActivity,
            variables () {
                return {
                    page: this.page,
                    id: this.User?.id
                }
            },
            update: (data) => {
                return data.Page.activities;
            }
        }
    },
    computed: {
        about() { return this.User?.about || this.$i18n.t("user.noAbout") },
        statistics() {
            return [
                { stat: "animeCount", value: this.User?.statistics?.anime?.count },
                { stat: "minutesWatched", value: this.User?.statistics?.anime?.minutesWatched },
                { stat: "episodesWatched", value: this.User?.statistics?.anime?.episodesWatched },
                { stat: "mangaCount", value: this.User?.statistics?.manga?.count },
                { stat: "chaptersRead", value: this.User?.statistics?.manga?.chaptersRead },
                { stat: "volumesRead", value: this.User?.statistics?.manga?.volumesRead },
            ]
        }
    }
});
</script>
