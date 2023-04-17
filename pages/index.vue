<template>
  <div class="container">
    <Main :location="weatherData.location" :currentWeather="weatherData.current" />
    <Forecast :forecast="weatherData.forecast.forecastday"/>
    <Modal :city="weatherData.location.region" />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({route, $axios}) {
    let ip = await $axios.get('https://api.ipify.org/?format=json')
    let location = await $axios.get(`https://api.weatherapi.com/v1/ip.json?key=cf424b291f6e48d5ac9182353220103&q=${ip.data.ip}`);
    let city = location.data.city
    let weatherData = false
    if(route.query.city) city = route.query.city
    console.log(route);
    await $axios.get(`https://api.weatherapi.com/v1/forecast.json?key=cf424b291f6e48d5ac9182353220103&q=${city}&days=3`)
      .then(res => weatherData = res.data)
      .catch(async function() {
        route.query.city = ''
        city = location.data.city
        await $axios.get(`https://api.weatherapi.com/v1/forecast.json?key=cf424b291f6e48d5ac9182353220103&q=${city}&days=3`)
          .then(res => weatherData = res.data)
    })

    return {weatherData}
  }
}
</script>
<style>
  h1 {
    margin-top: 0;
  }
  body {
    position: relative;
  background: linear-gradient(to bottom, rgb(43,50,178) 0%, rgb(20,136,204) 100%);
    background-repeat: no-repeat;
    background-attachment: fixed;
    margin: 0;
    
  }
  .container {
    max-width: 880px;
    overflow: hidden;
    margin: 8px auto;
    padding: 0 10px;
    margin-top: 0;
    font-size: 1.1em;
    color: #fff;
  }
  .error {
    margin: 0;
    font-size: 12px;
    color: red
  }
</style>

