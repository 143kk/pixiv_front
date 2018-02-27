<template>
  <el-main>
    <el-row>
      <el-col :span="18">
        <el-input v-model="param" placeholder="不会用看About"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button @click="getImgs()" :loading="loading" style="width:98%">查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="imgs.data">
      <el-table-column label="Date" align="center" sortable sort-by="wdate">
        <template slot-scope="scope">
          <router-link :to="'/dayView/' + scope.row.wdate" target="_blank"><el-button type="text">{{scope.row.wdate}}</el-button></router-link>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Title" align="center"></el-table-column>
      <el-table-column prop="rank" label="Rank(Today/Yesterday)" align="center" sortable :sort-by="sortBy">
        <template slot-scope="scope">
          #{{scope.row.rank}} ({{scope.row.yes_rank ? '#' + scope.row.yes_rank : '未上榜'}})
        </template>
      </el-table-column>
    </el-table>
    <p><el-button type="primary" @click="loadMore()" v-show="imgs.next_page_url" :loading="loading2">加载更多</el-button></p>
  </el-main>
</template>
<script>
export default {
  data () {
    return {
      imgs: [],
      param: '',
      loading: false,
      loading2: false,
      apiUrl: this.apiUrl,
      sortBy: ['rank', 'yes_rank']
    }
  },
  methods: {
    getImgs () {
      let a = this.param.split(':')
      if (a.length <= 1 || !a[1]) {
        this.errorMe()
        return
      }
      let b = this.param.slice(a[0].length + 1)
      let u = 'img/id/'
      if (a[0] === 'tag') {
        u = 'img/search/tag/'
      } else if (a[0] === 'illust_id') {
        u = 'img/search/id/'
      } else if (a[0] === 'user_id') {
        u = 'img/search/userid/'
      } else {
        this.errorMe()
        return
      }
      this.loading = true
      let self = this
      this.$http.get(this.apiUrl + u + b).then(function (response) {
        self.imgs = response.data
        self.loading = false
      })
    },
    loadMore () {
      if (this.imgs.next_page_url) {
        this.loading2 = true
        let self = this
        this.$http.get(this.imgs.next_page_url).then(function (response) {
          for (let temp of response.data.data) {
            self.imgs.data.push(temp)
          }
          self.$set(self.imgs, 'next_page_url', response.data.next_page_url)
          self.loading2 = false
        })
      }
    },
    errorMe () {
      this.$message({
        message: '搜索格式错误',
        type: 'warning'
      })
    }
  }
}
</script>
