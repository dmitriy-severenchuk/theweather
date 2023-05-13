<template>
  <div class="favorites">
    <div class="container">
      <div class="favorites__inner">
        <h2 class="main__title">Favorites</h2>
        <ForecastCatalog :getCardsArray="favCities" :favoritePage="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ForecastCatalog from './ForecastCatalog.vue'
import { useWeatherStore } from '../stores/WeatherStore.js'

import { computed } from 'vue'

const weatherStore = useWeatherStore()

const favCities = computed(() => weatherStore.favCities)
</script>

<style>
</style>