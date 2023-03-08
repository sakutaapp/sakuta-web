<template>
  <div
    class="bg-dark-900 bg-opacity-50 hover:bg-opacity-100 rounded-full flex justify-between px-3 py-1.5 cursor-pointer transition duration-250"
    @click="$emit('select')"
  >
    <div class="flex space-x-3">
      <div class="h-6 w-6 center rounded-full border-3 border-white border-opacity-50">
        <div v-if="active" class="h-3.5 w-3.5 center rounded-full bg-white bg-opacity-50" />
      </div>
      <span>
        {{ $i18n.messages[code][`languages.${code}`] }}<span v-if="progress && progress <= 95"> ({{ progress }}%)</span>
      </span>
    </div>
    <div class="flex space-x-2">
      <span>{{ $t(`languages.${code}`) }}</span>
      <div
        :style="{
          height: '24px',
          width: '36px',
          backgroundImage: `url('https://flags.blazing.works/webp/1/${flag}.webp')`,
          backgroundSize: 'contain',
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    code: {
      type: String,
      required: true,
    },
    flag: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Number,
      default: 100,
    },
  },
});
</script>
