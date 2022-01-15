<template>
    <div class="flex flex-wrap">
        <p v-for="option in options" :key="option" :class="`cursor-pointer transition duration-100 px-2.5 py-1 mr-2 rounded ${option === value ? 'bg-white bg-opacity-10 hover:bg-opacity-15 text-white' : 'bg-white bg-opacity-0 hover:bg-opacity-5'}`" @click="$emit('input', option)">{{ lang ? $i18n.messages[option]["meta.lang"] : $t(`settings.option.${option}`) }}</p>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        value: String,
        options: Array,
        lang: Boolean,
    },
});
</script>
