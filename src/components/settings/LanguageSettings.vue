<template>
    <div class="flex flex-col space-y-2">
        <LanguageOption v-for="language in languages" :key="language.code" :code="language.code" :flag="language.flagCode" :active="$i18n.locale === language.code" @select="lang = language.code" />
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
                },
                {
                    code: "de",
                    flagCode: "de",
                },
                {
                    code: "fr",
                    flagCode: "fr",
                },
                {
                    code: "nl",
                    flagCode: "nl",
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
