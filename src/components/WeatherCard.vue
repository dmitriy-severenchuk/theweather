<template>
  <div class="weather-card">
    <div class="weather-card__head">
      <h3 class="weather-card__head__title">{{ cardData.city }}</h3>
      <div class="weather-card__head__box">
        <button
          class="weather-card__head__box__button-favorites"
          @click="$emit('toggleFavs', cardData.id)"
          :class="{ 'weather-card__head__box__button-favorites--active': cardData.isFav }"
        ></button>

        <button
          class="weather-card__head__box__button-close"
          @click="$emit('remove')"
          :disabled="cardDataArray.length <= 1"
          :class="{ '--hide': favoritePageValue }"
        ></button>
      </div>
    </div>

    <div class="weather-card__content">
      <h3 class="weather-card__content__title">
        Feels like
        <span class="weather-card__content__title--number"
          >{{ currentFeelsLike }}<span>&#176;</span></span
        >
      </h3>
      <div class="weather-card__content__circle">
        <img
          :src="cardData.weatherIcon"
          :alt="currentDescription"
          class="weather-card__content__image"
        />
        <p class="weather-card__content__circle__text">
          {{ currentTemperature }}<span>&#176;</span>
        </p>
      </div>
      <div class="weather-card__content__box">
        <div class="weather-card__content__box__text weather-card__content__box__text--first">
          min
          <span class="weather-card__content__box__text--number"
            >{{ currentTemperatureMin }}<span>&#176;</span></span
          >
        </div>
        <div class="weather-card__content__box__text">
          max
          <span class="weather-card__content__box__text--number"
            >{{ currentTemperatureMax }}<span>&#176;</span></span
          >
        </div>
      </div>
      <p class="weather-card__content__description">{{ currentDescription }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['forecastData', 'forecastDataArray', 'favoritePageValue'])

const favoritePageValue = computed(() => props.favoritePageValue)
const cardDataArray = computed(() => props.forecastDataArray)
const cardData = computed(() => props.forecastData)

const tointeger = function (data) {
  return parseInt(data)
}
const currentDescription = computed(
  () => cardData.value.description.charAt(0).toUpperCase() + cardData.value.description.slice(1)
)
let currentTemperature = computed(() => tointeger(cardData.value.temperature))
let currentTemperatureMin = computed(() => tointeger(cardData.value.temperatureMin))
let currentTemperatureMax = computed(() => tointeger(cardData.value.temperatureMax))
let currentFeelsLike = computed(() => tointeger(cardData.value.feelsLike))
</script>

<style>
</style>