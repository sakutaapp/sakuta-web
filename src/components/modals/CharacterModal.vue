<template>
    <Modal :header="true" :headerImage="character.node.image.large" @close="$emit('close')">
        <template v-slot:header>
            <div class="flex h-full text-white space-x-5">
                <img :src="character.node.image.large" height="100%" class="rounded-lg">
                <div class="flex flex-col justify-center">
                    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold">{{ character.node.name.full }}</h1>
                    <h2 class="text-1xl md:text-2xl font-semibold">{{ $t(`character.role.${ character.role }.long`) }}</h2>
                    <p class="hidden md:block">{{ subtext }}</p>
                </div>
            </div>
        </template>
        <p>
            <span><b>{{ $t("character.favorites.heading") }}</b> {{ character.node.favourites }}<br></span>
            <span v-if="dateString"><b>{{ $t("character.birthDate.heading") }}</b> {{ dateString }}<br></span>
            <span v-if="character.node.age"><b>{{ $t("character.age.heading") }}</b> {{ character.node.age }}<br></span>
        </p>
        <div v-html="character.node.description" />
    </Modal>
</template>

<script lang="ts">
function getOrdinalSuffix(i: number) {
    const j = i % 10;
    const k = i % 100;
    if(j == 1 && k != 11) return "st";
    if(j == 2 && k != 12) return "nd";
    if (j == 3 && k != 13) return "rd";
    return "th";
}

import Vue from "vue";

export default Vue.extend({
    props: {
        character: Object
    },
    computed: {
        dateString(): any {
            if(this.character?.node?.dateOfBirth?.day && this.character?.node?.dateOfBirth?.month) {
                if(this.character?.node?.dateOfBirth?.year) {
                    return this.$i18n.t("general.date.full", { day: this.character.node.dateOfBirth.day, month: this.$i18n.t(`general.month.${this.character.node.dateOfBirth.month}.full`), year: this.character.node.dateOfBirth.year, suffix: getOrdinalSuffix(this.character.node.dateOfBirth.day) });
                } else {
                    return this.$i18n.t("general.date.dayMonth", { day: this.character.node.dateOfBirth.day, month: this.$i18n.t(`general.month.${this.character.node.dateOfBirth.month}.full`), suffix: getOrdinalSuffix(this.character.node.dateOfBirth.day)  });
                }
            } else {
                return undefined;
            }
        },
        subtext(): any {
            let strings = [];
            if(this.character.node.favourites) strings.push(this.$i18n.t("character.favorites.text", [this.character.node.favourites]));
            if(this.dateString) strings.push(this.$i18n.t("character.birthDate.text", [this.dateString]));
            if(this.character.node.age) strings.push(this.$i18n.t("character.age.text", [this.character.node.age]));
            return strings.join(" ▪ ")
        }
    }
});
</script>