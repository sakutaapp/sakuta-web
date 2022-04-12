<template>
    <div class="border-t-1 border-white !border-opacity-5 max-h-132 overflow-y-scroll" ref="commandMenuScroll">
        <div v-for="option in options" :key="option.name" :ref="option.name" :class="`${option.name === value ? 'bg-white bg-opacity-5' : ''} px-4 py-2 cursor-pointer relative`" @mouseover="$emit('input', option.name)" @click="$emit('enter')">
            <div class="bg-primary absolute left-0 top-0 h-full w-0.8" v-if="option.name === value" />
            <div class="flex items-center space-x-3">
                <svg v-if="option.icon" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="option.icon" />
                <div v-else class="bg-gray-900 bg-dark-900 rounded w-8 overflow-hidden"><img :src="option.image" class="w-full h-full" /></div>
                <div class="flex flex-col">
                    <p>{{ option.display ? option.display : $t(`nav.commandMenu.${option.name}`) }}</p>
                    <p class="text-sm text-white opacity-60" v-if="option.properties">{{ propertiesString(option.properties) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        value: String,
        options: Array,
        page: String,
    },
    methods: {
        propertiesString(properties: any) {
            let propertyArray = [];
            if (properties.format) {
                propertyArray.push(this.$t(`media.format.${properties.format}`));
            }
            if (properties.status) {
                propertyArray.push(this.$t(`media.status.${properties.status}`));
            }
            if (properties.season && properties.seasonYear) {
                propertyArray.push(this.$t("media.season", { season: this.$t(`media.season.${properties.season}`), year: properties.seasonYear }));
            }
            return propertyArray.join(" • ");
        },
    },
    watch: {
        value(newValue) {
            if (!this.$refs[newValue]) return;
            /// @ts-ignore
            if (!this.$refs[newValue][0]) return;
            if (!this.$refs.commandMenuScroll) return;
            /// @ts-ignore
            if (this.$refs[newValue][0].offsetTop - 85 + this.$refs[newValue][0].offsetHeight > this.$refs.commandMenuScroll.scrollTop + this.$refs.commandMenuScroll.offsetHeight) {
                /// @ts-ignore
                this.$refs.commandMenuScroll.scrollTop = this.$refs[newValue][0].offsetTop - 85;
            }
            /// @ts-ignore
            if (this.$refs[newValue][0].offsetTop - 85 < this.$refs.commandMenuScroll.scrollTop) {
                /// @ts-ignore
                this.$refs.commandMenuScroll.scrollTop = this.$refs[newValue][0].offsetTop - 85;
            }
        },
    },
});
</script>
