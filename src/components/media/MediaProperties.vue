<template>
    <Section class="flex md:flex-col md:space-y-3 space-x-5 md:space-x-0 overflow-x-scroll md:overflow-hidden">
        <MediaProperty v-for="property in properties" :key="property.prop" :prop="property.prop" :value="property.value" />
    </Section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        properties: Array,
    },
});
</script>
