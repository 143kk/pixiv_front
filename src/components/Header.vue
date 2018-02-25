<template>
  <el-header>
    <el-menu class="el-menu-demo" mode="horizontal" :defaultActive="$route.path" router>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/shuffle">随便一张</el-menu-item>
      <el-menu-item index="/search">Search</el-menu-item>
      <el-menu-item index="/lab">Useless</el-menu-item>
      <el-menu-item index="/about">About</el-menu-item>
    </el-menu>
  </el-header>
</template>
<script>
export default {
  data () {
    return {
      name: 'ojbk'
    }
  },
  methods: {
    hello () {
      console.log('HELLO')
    }
  }
}
</script>
