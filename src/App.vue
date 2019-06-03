<template>
  <div id="app">
    <!--<Home></Home>-->
    <LocationCheck></LocationCheck>
  </div>
</template>

<script>
import LocationCheck from './components/LocationCheck'

export default {
  name: 'app',
  components: {
    LocationCheck
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
