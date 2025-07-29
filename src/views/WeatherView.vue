<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button @click="searchByCity" class="search-button">
          Search
        </button>
        <br><br>
        Please implement "Search Weather by City".
      </div>
    </div>
    <main>
      <div v-if="weatherData">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

const apikey = "cf05d45650564f80c2a1776aa20f280f";

export default {
  name: "WeatherView",
  data() {
    return {
      city: "",
      weatherData: null,
    };
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.floor(this.weatherData.main.temp - 273) : null;
    },
    iconUrl() {
      return this.weatherData ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png` : null;
    },
  },
  methods: {
    async searchByCity() {
      if (this.city) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
        await this.fetchWeatherData(url);
      }
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.search-bar {
  display: inline-block;
}

.search-input {
  padding: 8px;
  width: 200px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.search-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #0056b3;
}
</style>



