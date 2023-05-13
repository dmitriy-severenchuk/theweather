<template>
  <div class="forecast-catalog" v-if="cardsArray">
    <Swiper
      class="main__weather__list"
      :modules="[Pagination, Navigation]"
      :slides-per-view="1"
      :space-between="20"
      :pagination="true"
      :navigation="true"
    >
      <SwiperSlide
        class="main__weather__list-item"
        v-for="(item, index) in cardsArray"
        :key="item.id"
      >
        <div class="main__weather__list-item__card__box">
          <WeatherCard
            :forecastData="item"
            :forecastDataArray="cardsArray"
            :favoritePageValue="favoritePageValue"
            @remove="removeForecastsCard(index)"
            @toggleFavs="toggleFavs"
          />
          <TheChart :forecastData="item" />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper'

import { useWeatherStore } from '../stores/WeatherStore'
import TheChart from './TheChart.vue'
import WeatherCard from './WeatherCard.vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const weatherStore = useWeatherStore()

const emit = defineEmits(['CardIndex'])
const props = defineProps(['getCardsArray', 'favoritePage'])

const favoritePageValue = computed(() => props.favoritePage)
const cardsArray = computed(() => props.getCardsArray)

const toggleFavs = function (id) {
  weatherStore.toggleCardToFavs(id)
}

const removeForecastsCard = function (index) {
  emit('CardIndex', index)
  weatherStore.$state.showPopup = true
  // weatherStore.removeForecastsCard(index)
}
</script>

<style>
</style>