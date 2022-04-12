<template>
    <Section class="flex-col space-y-5 md:space-y-3 md:space-x-0 overflow-x-scroll md:overflow-hidden">
        <MediaProperty v-for="property in properties" :key="property.prop" :prop="property.prop" :value="property.value" :list="listProperties.includes(property.prop)" />
    </Section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            listProperties: ["synonyms", "studios"],
        };
    },
    props: {
        properties: Array,
    },
});
</script>
