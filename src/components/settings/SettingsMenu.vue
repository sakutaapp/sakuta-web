<template>
    <div class="fixed h-screen w-screen bg-dark-800 left-0 top-0 z-200">
        <div class="h-full w-full hidden md:flex">
            <div class="md:w-1/20 lg:w-1/8 bg-dark-900"></div>
            <div class="md:w-19/20 lg:w-7/8 bg-dark-800 flex">
                <div class="bg-dark-900 pr-5 pt-10 flex flex-col space-y-2 max-w-2/8">
                    <SettingsTabCategory @pageswitch="activePage = $event" category="app" :pages="pages.filter((page) => page.category === 'app')" :activePage="activePage" />
                    <SettingsTabCategory @pageswitch="activePage = $event" category="misc" :pages="pages.filter((page) => page.category === 'misc')" :activePage="activePage" />
                </div>
                <div class="w-full overflow-auto">
                    <div class="flex w-full max-w-6/8">
                        <div class="w-full flex-grow pt-10 px-10">
                            <SettingsHolder :page="activePage" />
                        </div>
                        <div class="pt-10 flex flex-col items-center">
                            <div class="w-12 h-12 rounded-full cursor-pointer transition duration-250 bg-dark-800 hover:bg-dark-900 hover:text-white center" @click="$emit('close')">
                                <CloseIcon :size="20" />
                            </div>
                            <!--<span class="text-xs opacity-50 mt-1">ESC</span>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col bg-dark-900 h-full w-full pt-20 md:hidden">
            <div class="flex flex-col fixed w-full z-102 top-0 h-full pointer-events-none">
                <div class="p-2 bg-dark-800 flex items-center pr-5 pointer-events-auto">
                    <div class="p-3" @click="pageFocus ? (pageFocus = false) : $emit('close')">
                        <BackIcon size="30" />
                    </div>
                    <h1 class="font-semibold text-xl w-full">{{ pageFocus ? $t(`settings.title.${activePage}`) : $t("settings.title.settings") }}</h1>
                </div>
                <div :class="`flex-grow h-full bg-dark-900 ${pageFocus ? 'slideover-on pointer-events-auto' : 'slideover-off pointer-events-none'} transition duration-250 p-5`">
                    <SettingsHolder :page="activePage" />
                </div>
            </div>
            <SettingsTabCategory
                @pageswitch="
                    activePage = $event;
                    pageFocus = true;
                "
                category="app"
                :pages="pages.filter((page) => page.category === 'app')"
                :activePage="activePage"
            />
            <SettingsTabCategory
                @pageswitch="
                    activePage = $event;
                    pageFocus = true;
                "
                category="misc"
                :pages="pages.filter((page) => page.category === 'misc')"
                :activePage="activePage"
            />
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.slideover-on {
    transform: translateX(0);
}
.slideover-off {
    transform: translateX(100%);
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            navigation: localStorage.getItem("navigation") === "bottom" ? "bottom" : "top",
            lang: localStorage.getItem("lang") || "en",
            pages: [
                {
                    name: "appearance",
                    icon: "BrushIcon",
                    category: "app",
                },
                {
                    name: "language",
                    icon: "GlobeIcon",
                    category: "app",
                },
                {
                    name: "changelog",
                    icon: "ListIcon",
                    category: "misc",
                },
                {
                    name: "privacy",
                    icon: "BookIcon",
                    category: "misc",
                },
            ],
            activePage: "appearance",
            pageFocus: false,
        };
    },
    watch: {
        navigation(navigation) {
            localStorage.setItem("navigation", navigation);
            this.$nuxt.$emit("navigationTypeChange", navigation);
        },
        lang(lang) {
            localStorage.setItem("lang", lang);
            this.$i18n.locale = lang;
        },
    },
});
</script>
