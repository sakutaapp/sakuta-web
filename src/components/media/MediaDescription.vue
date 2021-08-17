<template>
    <Section>
        <h2 class="text-lg font-semibold">{{ $t("media.section.description") }}</h2>
        <p v-html="description" />
    </Section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        description: String
    }
});
</script>