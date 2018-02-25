<template>
  <div>
    <div style="position: fixed; top: 50%; right:0%; padding:20px;" v-show="next">
      <router-link :to="'/dayView/' + next" @click.native="getImgs()"><el-button type="text" style="font-size: 20px;"><i class="el-icon-d-arrow-right"></i></el-button></router-link>
    </div>
    <div style="position: fixed; top: 50%; left:0%; padding:20px;" v-show="pre">
      <router-link :to="'/dayView/' + pre" @click.native="getImgs()"><el-button type="text" style="font-size: 20px;"><i class="el-icon-d-arrow-left"></i></el-button></router-link>
    </div>
    <el-card :body-style="{ padding: '0px' }" v-for="img in imgs" :key="img._id.$oid" class="card">
      <el-tooltip placement="left-start">
        <div slot="content">
          <em># {{img.rank}}</em><br>
          作品ID：{{img.illust_id}}<br>
          画师ID：{{img.user_id}}<br>
          {{img.width}} * {{img.height}}<br>
          {{(img.size/1024/1024).toFixed(2)}} MB
        </div>
        <img v-lazy="imgUrl + img.path" width="100%">
      </el-tooltip>
      <div style="padding: 14px;">
        <span>{{img.title}}<br><small>(By <em>{{img.user_name}}</em>)</small></span>
        <div>
          <el-tag class="tag" v-for="tag in img.tags" :key="tag">{{tag}}</el-tag>
        </div>
        <div style="margin-top: 8px;">
          <el-button plain type="success" class="button" @click="to(img.illust_id)">作品地址</el-button>
          <el-button plain type="success" class="button" @click="toForArtist(img.user_id)">画师主页</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgs: [],
      pre: '',
      next: '',
      imgUrl: this.imgUrl,
      apiUrl: this.apiUrl
    }
  },
  methods: {
    getPreAndNext () {
      let self = this
      this.$http.get(this.apiUrl + 'date/next/' + this.imgs[0].wdate).then(function (response) {
        self.next = response.data.date
      })
      this.$http.get(this.apiUrl + 'date/pre/' + this.imgs[0].wdate).then(function (response) {
        self.pre = response.data.date
      })
    },
    getImgs () {
      let self = this
      this.$http.get(this.apiUrl + 'img/date/' + self.$route.params.date).then(function (response) {
        self.imgs = response.data
        self.getPreAndNext()
      })
    },
    to (id) {
      window.open('https://www.pixiv.net/member_illust.php?mode=medium&illust_id=' + id)
    },
    toForArtist (id) {
      window.open('https://www.pixiv.net/member.php?id=' + id)
    }
  },
  mounted () {
    this.getImgs()
    console.log('Hello1!')
  }
}
</script>
<style>
  .card{
    margin-bottom: 5px;
  }
  .tag{
    margin-left: 3px;
  }
</style>
