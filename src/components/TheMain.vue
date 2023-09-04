<template>
  <PopupWrapper v-if="weatherStore.$state.isPopupShow" @agreeClose="agreeClose" />
  <div class="main">
    <div class="container">
      <div class="main__inner">
        <h2 class="main__title">Home</h2>
        <div class="main__head">
          <SelectCityInput />
        </div>
        <p class="main__subtitle" v-if="weatherArray.length === 0">
          Find your city forecast using input above.
        </p>
        <ForecastCatalog :getCardsArray="weatherArray" @CardIndex="removeForecastsCard" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SelectCityInput from './SelectCityInput.vue'
import ForecastCatalog from './ForecastCatalog.vue'
import { useWeatherStore } from '../stores/weatherStore.js'
import PopupWrapper from './Popup/PopupWrapper.vue'

import { computed, ref } from 'vue'

const weatherStore = useWeatherStore()
const weatherArray = computed(() => weatherStore.getForecasts)

const currentIndex = ref('')

const agreeClose = () => {
  weatherStore.removeForecastsCard(currentIndex.value)
  weatherStore.togglePopup(false)
}

const removeForecastsCard = function (index) {
  // weatherStore.togglePopup(true)
  currentIndex.value = index
}
</script>

<style>
</style>