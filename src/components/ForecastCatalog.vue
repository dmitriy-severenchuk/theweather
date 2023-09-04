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
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper'

import { useWeatherStore } from '../stores/weatherStore'
import WeatherCard from './WeatherCard.vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default defineComponent({
  components: {
    WeatherCard,
    Swiper,
    SwiperSlide
  },

  props: {
    getCardsArray: {
      type: Array,
      default: () => []
    },

    favoritePage: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const weatherStore = useWeatherStore()

    const favoritePageValue = computed(() => props.favoritePage)
    const cardsArray = computed(() => props.getCardsArray)

    const toggleFavs = function (id) {
      weatherStore.toggleCardToFavs(id)
    }

    const removeForecastsCard = function (index) {
      emit('CardIndex', index)

      weatherStore.togglePopup(true)
    }

    return {
      favoritePageValue,
      cardsArray,
      toggleFavs,
      removeForecastsCard,
      Pagination,
      Navigation
    }
  }
})
</script>

<style>
</style>