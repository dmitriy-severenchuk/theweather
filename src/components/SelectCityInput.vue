<template>
  <div class="select__input__box" ref="targetInputBox">
    <div class="select__input-wrapper">
      <input
        type="text"
        class="select__input"
        placeholder="Select your city..."
        v-model="cityInput"
        @input="filterCities()"
        @focus="showDropdown = true"
      />
      <ul class="select__input__dropdown" v-if="filteredCities.length && showDropdown">
        <li
          class="select__input__dropdown-item"
          v-for="city of filteredCities"
          :key="city.index"
          @click="setCity(city)"
        >
          <button class="select__input__dropdown-item__button">{{ city }}</button>
        </li>
      </ul>
    </div>
    <button class="select__input-button" @click.prevent="getCityForecastFunc()">+</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWeatherStore } from '../stores/weatherStore'
import { onClickOutside } from '@vueuse/core'

const weatherStore = useWeatherStore()
const showDropdown = ref(false)
const cityInput = ref('')
const targetInputBox = ref(null)
const filteredCities = ref([])

const filterCities = function () {
  if (cityInput.value.length >= 2) {
    filteredCities.value = weatherStore.$state.cities.filter((city) => {
      return city.toLowerCase().startsWith(cityInput.value.toLowerCase())
    })
  } else {
    filteredCities.value = []
  }
}

const getCityForecastFunc = () => {
  weatherStore.getCityForecast(cityInput.value)
  showDropdown.value = false
}

const setCity = function (city) {
  cityInput.value = city
  showDropdown.value = false
}

onClickOutside(targetInputBox, () => (showDropdown.value = false))
</script>

<style>
</style>