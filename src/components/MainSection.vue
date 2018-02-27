<template>
  <el-main v-if="Object.keys(imgs).length">
    <router-link :to="'/dayView/' + dates[0]"><el-button type="text" style="font-size:20px;">Latest - {{dates[0]}}</el-button></router-link>
    <el-carousel indicator-position="outside" v-if = "calImgs != 0">
      <el-carousel-item v-for="img in calImgs" :key="img._id.$oid">
        <h3>{{ img.title }} <small>#{{img.rank}}</small></h3>
        <img :src="imgUrl + img.path" height="100%">
      </el-carousel-item>
    </el-carousel>
    <div v-for="date in dates.slice(1)" style="margin-bottom: 3px" :key="date">
      <div :style="{height: '280px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          }" class="coll" v-lazy:background-image="getBgImg(date)">
        <div>
          <router-link :to="'/dayView/' + date"><el-button type="primary" class="button">{{date}}</el-button></router-link>
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
      imgs: {},
      page: 1,
      imgUrl: this.imgUrl,
      apiUrl: this.apiUrl,
      i: 0
    }
  },
  mounted () {
    this.getLatest()
    this.getDatesAndImgs()
  },
  methods: {
    getLatest () {
      let self = this
      this.$http.get(this.apiUrl + 'date/latest').then(function (response) {
        let latest = response.data.date
        self.$http.get(self.apiUrl + 'img/date/' + latest).then(function (res) {
          self.calImgs = res.data
        })
      })
    },
    getBgImg (date) {
      if (this.imgs[date] === undefined) {
        return
      }
      return this.imgUrl + this.imgs[date].path
    },
    getDatesAndImgs (page = 1) {
      let self = this
      this.$http.get(this.apiUrl + 'date/page/' + page).then(function (response) {
        for (let a of response.data) {
          self.dates.push(a.date)
          self.$http.get(self.apiUrl + 'img/first/' + a.date).then(function (response) {
            self.$set(self.imgs, a.date, response.data)
          })
        }
      })
    },
    getImgs () {
      let self = this
      for (let date of this.dates) {
        this.$http.get(this.apiUrl + 'img/first/' + date).then(function (response) {
          self.$set(self.imgs, date, response.data)
        })
      }
    },
    loadMore () {
      this.page += 1
      this.getDatesAndImgs(this.page)
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
