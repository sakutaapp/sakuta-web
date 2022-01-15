<template>
    <Section class="flex md:flex-col md:space-y-3 space-x-5 md:space-x-0 overflow-x-scroll md:overflow-hidden">
        <h2 class="text-lg font-semibold">{{ $t("user.section.statistics") }}</h2>
        <UserStatistic v-for="stat in statistics" :key="stat.stat" :prop="stat.stat" :value="stat.value" />
    </Section>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        statistics: Array,
    },
});
</script>
