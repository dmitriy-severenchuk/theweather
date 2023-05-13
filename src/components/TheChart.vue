<template>
  <div class="chart">
    <canvas :id="cardForChartData.id" class="chart__main"></canvas>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto'
import { onMounted, computed } from 'vue'

const props = defineProps(['forecastData'])

const cardForChartData = computed(() => props.forecastData)

onMounted(() => {
  new Chart(document.getElementById(cardForChartData.value.id), {
    type: 'bar',
    data: {
      labels: [parseInt(cardForChartData.value.temperature)],
      datasets: [
        {
          label: 'Temperature to "Feels like"',
          data: [parseInt(cardForChartData.value.feelsLike)],
          borderWidth: 3
        }
      ]
    }
  })
})
</script>



<style>
</style>