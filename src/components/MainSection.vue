<template>
  <el-main v-if="this.imgs != 0">
    <router-link :to="'/dayView/' + imgs[0].wdate"><el-button type="text" style="font-size:20px;">Latest - {{imgs[0].wdate}}</el-button></router-link>
    <el-carousel indicator-position="outside" v-if = "calImgs != 0">
      <el-carousel-item v-for="img in calImgs" :key="img._id.$oid">
        <h3>{{ img.title }} <small>#{{img.rank}}</small></h3>
        <img :src="imgUrl + img.path" height="100%">
      </el-carousel-item>
    </el-carousel>
    <div v-for="img in imgs.slice(1)" style="margin-bottom: 3px" :key="img.wdate">
      <div :style="{height: '280px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          }" class="coll" v-lazy:background-image="imgUrl + img.path">
        <div>
          <router-link :to="'/dayView/' + img.wdate"><el-button type="primary" class="button">{{img.wdate}}</el-button></router-link>
        </div>
      </div>
    </div>
    <p><el-button @click="loadMore()"><i class="el-icon-arrow-down"></i> 加载更多</el-button></p>
  </el-main>
</template>
<script>
export default {
  data () {
    return {
      dates: [],
      calImgs: [],
      imgs: [],
      page: 1,
      imgUrl: this.imgUrl,
      apiUrl: this.apiUrl,
      i: 0
    }
  },
  mounted () {
    this.getLatest()
    this.getDates()
  },
  methods: {
    getLatest () {
      let self = this
      this.$http.get(this.apiUrl + 'date/latest').then(function (response) {
        let latest = response.data.date
        self.$http.get(self.apiUrl + 'img/date/' + latest).then(function (response) {
          self.calImgs = response.data
        })
      })
    },
    getDates (page = 1) {
      let self = this
      this.$http.get(this.apiUrl + 'date/page/' + page).then(function (response) {
        self.dates = response.data
        self.getImgs()
      })
    },
    getImgs () {
      let self = this
      for (let date of this.dates) {
        this.$http.get(this.apiUrl + 'img/first/' + date.date).then(function (response) {
          self.$set(self.imgs, self.i++, response.data)
          // self.imgs.push(response.data)
        })
      }
    },
    loadMore () {
      this.page += 1
      this.getDates(this.page)
    }

  }
}
</script>
<style>
  .coll{
    display:flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.5)
  }
  .button{
    background: rgba(64,158,255, 0.5);
  }
</style>
