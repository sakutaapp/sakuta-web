<template>
    <a v-if="!nuxtLink" :href="to" :target="newTab ? '_blank' : ''" :class="classes"><slot /></a>
    <nuxt-link v-else :to="to" :classes="classes"></nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        color: String,
        textColor: String,
        to: String,
        nuxtLink: Boolean,
        newTab: Boolean,
        css: String
    },
    computed: {
        classes() {
            return `${this.css} px-2 py-1 rounded shadow transition duration-100`;
        }
    }
});
</script>