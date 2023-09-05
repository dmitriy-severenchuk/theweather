import axios from 'axios'
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    isPopupShow: false,
    forecasts: [],
    cities: [],
    geoCity: ''
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

        const responseData = {
          city: data.name,
          id: data.id,
          description: data.weather[0].description,
          temperature: data.main.temp,
          temperatureMin: data.main.temp_min,
          temperatureMax: data.main.temp_max,
          feelsLike: data.main.feels_like,
          weatherIcon: 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png',
          isFav: false,
          cardExist: false
        }

        this.forecasts.find((item) => {
          if (item.id === responseData.id) {
            responseData.cardExist = true
          }
        })
        if (responseData.cardExist === false) {
          this.forecasts = [responseData, ...this.forecasts]
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

    togglePopup(value) {
      this.isPopupShow = value
    },
    getCityForecast(inputValue) {
      if (this.forecasts.length < 5) {
        this.geoCity = inputValue
        if (inputValue.length > 2) {
          this.getWeatherData()
        }
      } else {
        alert('You have maximum number of cards - 5. Delete any to add another one.')
      }
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
