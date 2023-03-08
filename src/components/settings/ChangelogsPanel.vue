<template>
  <div class="flex flex-col space-y-5">
    <div v-for="update in updates" :key="update.number">
      <h2 class="text-white text-lg font-semibold">
        {{ update.title }}
      </h2>
      <ul class="list-disc list-inside">
        <li v-for="item in update.body.split('**Changelog**\r\n- ')[1].split('\r\n- ')" :key="item">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      updates: [],
    };
  },
  mounted() {
    this.$axios
      .$get("https://api.github.com/repos/sakutaapp/sakuta-web/pulls?page=1&state=closed&page=1&q=****/**/**%20Update")
      .then((data) => {
        this.updates = data;
      });
  },
});
</script>
