<template>
  <el-main>
    <router-link :to="'/dayView/' + imgs[0][0].wdate"><el-button type="text" style="font-size:20px;">Latest - {{imgs[0][0].wdate}}</el-button></router-link>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="img in imgs[0]" :key="img._id.$oid">
        <h3>{{ img.title }} <small>#{{img.rank}}</small></h3>
        <img :src="imgUrl + img.path" height="100%">
      </el-carousel-item>
    </el-carousel>
    <div v-for="coll in imgs.slice(1)" style="margin-bottom: 3px" :key="coll[0].wdate">
      <div :style="{height: '280px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          }" class="coll" v-lazy:background-image="imgUrl + coll[0].path">
        <div>
          <router-link :to="'/dayView/' + coll[0].wdate"><el-button type="primary" class="button">{{coll[0].wdate}}</el-button></router-link>
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
      imgs: [],
      page: 1,
      imgUrl: this.imgUrl,
      apiUrl: this.apiUrl
    }
  },
  mounted () {
    this.getDates()
  },
  methods: {
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
        this.$http.get(this.apiUrl + 'img/date/' + date.date).then(function (response) {
          self.imgs.push(response.data)
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
