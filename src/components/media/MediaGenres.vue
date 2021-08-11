<template>
    <Section class="overflow-x-scroll md:overflow-hidden">
        <h2 class="text-lg font-semibold mb-1">{{ $t("media.section.genres") }}</h2>
        <div class="flex md:flex-col space-x-1 md:space-x-0 md:space-y-1">
            <Genre v-for="genre in genres" :key="genre" :text="genre" />
        </div>
    </Section>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        genres: Array
    }
});
</script>