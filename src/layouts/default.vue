<template>
  <div class="relative min-h-screen pb-64 md:pb-45">
      <Navbar />
      <nuxt />
      <Footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    head: {
        bodyAttrs: {
            class: "bg-gray-900 dark:bg-dark-900 text-gray-300"
        },
        htmlAttrs: {
            class: localStorage.getItem("theme") === "dark" ? "dark" : ""
        }
    }
});
</script>

<style>
anilist-gql-response {
    display: none;
}

::-webkit-scrollbar{
    width: 6px;
    height: 6px;
}
::-webkit-scrollbar-thumb{
    background: linear-gradient(0deg, #FF008C 0%,#FF2E82 100%);
    border-radius: 30px;
}
::-webkit-scrollbar-thumb:hover{
    background: #DE0D8A;
}
::-webkit-scrollbar-track{
    background: #1F2937;
    border-radius: 0px;
    box-shadow: inset 0px 0px 0px 0px #F0F0F0;
}
</style>