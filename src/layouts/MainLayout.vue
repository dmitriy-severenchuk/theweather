<template>
  <div class="main-layout" v-if="isReady">
    <TheHeader />
    <router-view />
  </div>
</template>

<script setup>
import TheHeader from '../components/TheHeader.vue'
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { useWeatherStore } from '../stores/weatherStore'

const weatherStore = useWeatherStore()

let isReady = ref(false)

const initData = async function () {
  // await weatherStore.testDataRequest()
  // await weatherStore.getGeolocation()
  await weatherStore.getWeatherData()
  await weatherStore.getCities()
  isReady.value = true
}

onMounted(() => {
  weatherStore.get()
  initData()
})
</script>

<style>
</style>