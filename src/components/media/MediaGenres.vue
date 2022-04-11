<template>
    <Section>
        <h2 class="text-lg font-semibold mb-1">{{ $t("media.section.genres") }}</h2>
        <div class="flex flex-col space-y-1">
            <Genre v-for="genre in genres" :key="genre" :text="genre" />
        </div>
    </Section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        genres: Array,
    },
});
</script>
