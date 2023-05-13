<template>
  <div class="popup">
    <h3 class="popup__title">Do you want to delete this card?</h3>
    <div class="popup__box">
      <button class="popup__box__button popup__box__button--yes" @click="$emit('agreeClose', true)">
        Yes
      </button>
      <button class="popup__box__button popup__box__button--no" @click="closePopup()">No</button>
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from '@/stores/WeatherStore.js'

const weatherStore = useWeatherStore()

const closePopup = function () {
  weatherStore.$state.showPopup = false
}
</script>

<style lang="scss" scoped>
</style>