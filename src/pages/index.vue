<template>

</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    mounted() {
        switch(localStorage.getItem("homePage")) {
            case "explore":
                this.$router.push("/explore");
                break;
            default:
                this.$router.push("/landing");
        }
    }
});
</script>
