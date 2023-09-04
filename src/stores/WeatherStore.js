import axios from 'axios'
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    showPopup: false,
    forecasts: [],
    cities: [],
    geoCity: 'kyiv'
  }),

  getters: {
    favCities() {
      return this.forecasts.filter((i) => i.isFav === true)
    },
    getForecasts() {
      return this.forecasts
    }
  },

  actions: {
    // Requires a pro subscription

    // async testDataRequest() {
    //   try {
    //     const { data } = await axios.get(
    //       'https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=57&lon=-2.15&appid=29d0f6aafdb057dc3f14b3b6ba42b163&units=metric'
    //     )
    //     console.log(data)
    //   } catch (e) {
    //     console.log(e)
    //   }
    // },
    //
    async getGeolocation() {
      try {
        const { data } = await axios.get(
          'https://api.ipdata.co/?api-key=06546a806739a53288bed9db99007c4d3a0cc71c36c98263b6652aa7'
        )
        if (this.forecasts.length < 6) {
          this.geoCity = data.city
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getWeatherData() {
      try {
        const { data } = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather?q=' +
            this.geoCity +
            '&lang=en&appid=29d0f6aafdb057dc3f14b3b6ba42b163&units=metric'
        )

        let city = data.name
        let id = data.id
        let description = data.weather[0].description
        let temperature = data.main.temp
        let temperatureMin = data.main.temp_min
        let temperatureMax = data.main.temp_max
        let feelsLike = data.main.feels_like
        let weatherIcon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png'
        let isFav = false
        let cardExist = false

        // console.log(response.data)

        const CurrentForecast = function () {
          this.description = description
          this.temperature = temperature
          this.temperatureMin = temperatureMin
          this.temperatureMax = temperatureMax
          this.feelsLike = feelsLike
          this.weatherIcon = weatherIcon
          this.isFav = isFav
          this.city = city
          this.id = id
          this.cardExist = cardExist
        }

        this.forecasts.find((item) => {
          if (item.id === id) {
            cardExist = true
          }
        })
        if (cardExist === false) {
          this.forecasts.unshift(
            new CurrentForecast(
              description,
              temperature,
              temperatureMin,
              temperatureMax,
              feelsLike,
              weatherIcon,
              isFav,
              city,
              id,
              cardExist
            )
          )
        }
      } catch {
        alert('We did not find your city in our data. Try again please')
      }
    },
    async getCities() {
      try {
        const { data } = await axios.get(
          'https://countriesnow.space/api/v0.1/countries/population/cities'
        )

        this.cities = data.data.map((city) => {
          return city.city
        })
      } catch (err) {
        console.log(err)
      }
    },
    removeForecastsCard(index) {
      if (this.forecasts.length > 1) {
        this.forecasts.splice(index, 1)
      } else {
        alert('There is has to be at least one card')
      }
    },

    toggleCardToFavs(id) {
      this.forecasts.map((i) => {
        if (i.id === id && i.isFav === false && this.favCities.length < 6) {
          i.isFav = true
        } else if (i.id === id && i.isFav === true) {
          i.isFav = false
        } else if (this.favCities.length > 6) {
          alert('You have maximum number of cards - 5. Delete any to add another one.')
        }
        return i
      })

      this.saveToLocalStorage()
      this.get()
    },

    get() {
      const storedData = localStorage.getItem('data')
      if (storedData) {
        this.forecasts = JSON.parse(storedData)
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('data', JSON.stringify(this.forecasts))
    }
  }
})
