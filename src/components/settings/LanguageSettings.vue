<template>
    <div class="flex flex-col space-y-2">
        <div class="bg-primary bg-opacity-15 rounded-lg flex space-x-3 p-3 items-center mb-1" v-if="!languages.find((language) => language.code === lang).verified">
            <div class="flex-grow">
                <AttentionIcon :filled="true" size="50" />
            </div>
            <div class="flex flex-col items-start">
                <h2 class="text-white font-semibold text-lg">{{ $t("settings.language.unverified.header") }}</h2>
                <p>{{ $t("settings.language.unverified.text") }}</p>
            </div>
        </div>
        <LanguageOption v-for="language in languages.filter((lang) => lang.progress > 90).sort((a, b) => b.progress - a.progress)" :key="language.code" :code="language.code" :flag="language.flagCode" :active="$i18n.locale === language.code" @select="lang = language.code" />
        <h3 class="text-lg font-medium pt-2">Unfinished languages</h3>
        <LanguageOption v-for="language in languages.filter((lang) => lang.progress <= 90).sort((a, b) => b.progress - a.progress)" :key="language.code" :code="language.code" :flag="language.flagCode" :progress="language.progress" :active="$i18n.locale === language.code" @select="lang = language.code" />
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
                    verified: true,
                },
                {
                    code: "de",
                    flagCode: "de",
                    progress: 100,
                    verified: true,
                },
                {
                    code: "fr",
                    flagCode: "fr",
                    progress: 73,
                    verified: true,
                },
                {
                    code: "nl",
                    flagCode: "nl",
                    progress: 100,
                    verified: true,
                },
                {
                    code: "zh-CN",
                    flagCode: "cn",
                    progress: 100,
                    verified: false,
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
