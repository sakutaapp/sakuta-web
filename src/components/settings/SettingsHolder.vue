<template>
    <div class="flex flex-col space-x-2">
        <h1 class="text-white font-semibold text-xl mb-3">{{ $t(`settings.page.${page}`) }}</h1>
        <ApperanceSettings v-if="page === 'appearance'" />
        <LanguageSettings v-else-if="page === 'language'" />
        <ChangelogsPanel v-else-if="page === 'changelog'" />
        <PrivacySettings v-else-if="page === 'privacy'" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        page: {
            type: String,
            required: true,
        },
    },
});
</script>
