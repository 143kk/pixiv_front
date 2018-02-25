<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-input v-model="illust_id" placeholder="illust_id"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button @click="getImgs()" style="width: 98%" :loading="loading">查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="imgs">
      <el-table-column label="Date" align="center">
        <template slot-scope="scope">
          <router-link :to="'/dayView/' + scope.row.wdate"><el-button type="text">{{scope.row.wdate}}</el-button></router-link>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Title" align="center"></el-table-column>
      <el-table-column prop="rank" label="Rank(Today/Yesterday)" align="center">
        <template slot-scope="scope">
          #{{scope.row.rank}} ({{scope.row.yes_rank ? '#' + scope.row.yes_rank : '未上榜'}})
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgs: [],
      illust_id: '',
      loading: false
    }
  },
  methods: {
    getImgs () {
      this.loading = true
      if (this.illust_id) {
        let self = this
        this.$http.get('http://localhost:8000/img/id/' + this.illust_id).then(function (response) {
          self.imgs = response.data
          self.loading = false
        })
      }
    }
  }
}
</script>
