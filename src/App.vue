<template>
  <div id="app">
    <el-container style="width:100%; max-width:1000px; margin:0 auto;">
      <h1>Pixiv Daily Top 10</h1>
      <Header></Header>
      <router-view></router-view>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  .image{
    width: 100%;
    overflow:hidden;
  }
</style>
