<template>
  <div class="popup-wrapper">
    <ThePopup @agreeClose="agreeClose" />
  </div>
</template>

<script setup>
import ThePopup from './ThePopup.vue'

const emit = defineEmits(['agreeClose'])

const agreeClose = function (a) {
  emit('agreeClose', a)
}
</script>



<style>
</style>