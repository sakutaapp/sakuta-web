<template>
    <Section>
        <h2 class="text-lg font-semibold mb-1">{{ $t("user.section.activity") }}</h2>
        <div class="flex flex-col space-y-2">
            <UserActivity v-for="activity in previousActivities" :key="activity.id" :activity="activity" />
            <div id="scroll-sensor"></div>
            <UserActivity v-for="activity in activities" :key="activity.id" :activity="activity" />
        </div>
    </Section>
</template>

<script lang="ts">
import Vue from "vue";
/// @ts-ignore
import scrollMonitor from "scrollmonitor";

export default Vue.extend({
    props: {
        activities: Array,
    },
    data() {
        return {
            previousActivities: [],
        };
    },
    methods: {
        fetchMore(): any {
            /// @ts-ignore
            this.previousActivities = [...this.previousActivities, ...this.activities];
            this.$emit("fetch");
        },
    },
    watch: {
        activities: {
            deep: true,
            handler(newValue, oldValue) {
                if (oldValue === undefined) {
                    /// @ts-ignore
                    this.previousActivities = this.activities;
                    this.$emit("fetch");
                    const elementWatcher = scrollMonitor.create(document.getElementById("scroll-sensor"));
                    elementWatcher.enterViewport(() => {
                        if (window.scrollY > 0) {
                            this.fetchMore();
                            console.log(1);
                        }
                    });
                }
            },
        },
    },
});
</script>
