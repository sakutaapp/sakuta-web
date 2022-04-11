<template>
    <div class="flex flex-col space-y-2">
        <LanguageOption v-for="language in languages.filter((lang) => lang.progress > 95).sort((a, b) => b.progress - a.progress)" :key="language.code" :code="language.code" :flag="language.flagCode" :active="$i18n.locale === language.code" @select="lang = language.code" />
        <h3 class="text-lg font-medium pt-2">Unfinished languages</h3>
        <LanguageOption v-for="language in languages.filter((lang) => lang.progress <= 95).sort((a, b) => b.progress - a.progress)" :key="language.code" :code="language.code" :flag="language.flagCode" :progress="language.progress" :active="$i18n.locale === language.code" @select="lang = language.code" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            lang: localStorage.getItem("lang") || "en",
            languages: [
                {
                    code: "en",
                    flagCode: "us",
                    progress: 100,
                },
                {
                    code: "de",
                    flagCode: "de",
                    progress: 100,
                },
                {
                    code: "fr",
                    flagCode: "fr",
                    progress: 77,
                },
                {
                    code: "nl",
                    flagCode: "nl",
                    progress: 100,
                },
                {
                    code: "zh-CN",
                    flagCode: "cn",
                    progress: 29,
                },
            ],
        };
    },
    watch: {
        lang(lang) {
            localStorage.setItem("lang", lang);
            this.$i18n.locale = lang;
            this.$nuxt.$emit("languageSwitch", lang);
        },
    },
});
</script>
