<template>
  <el-table :data="imgs">
    <el-table-column prop="num_tutorial" label="上榜次数" align="center"></el-table-column>
    <el-table-column prop="_id" label="ID" align="center"></el-table-column>
  </el-table>
</template>
<script>
export default {
  data () {
    return {
      imgs: [],
      apiUrl: this.apiUrl
    }
  },
  mounted () {
    let self = this
    this.$http.get(this.apiUrl + 'img/crossone').then(function (response) {
      self.imgs = response.data
    })
  }
}
</script>
