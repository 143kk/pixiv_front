<template>
<el-card :body-style="{padding: '0px'}" v-if="img">
  <el-tooltip placement="left-start">
    <div slot="content">
      <em># {{img.rank}}</em><br>
      作品ID：{{img.illust_id}}<br>
      画师ID：{{img.user_id}}<br>
      {{img.width}} * {{img.height}}<br>
      {{(img.size/1024/1024).toFixed(2)}} MB
    </div>
    <img :src="imgUrl + img.path" width="100%">
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
</template>
<script>
export default {
  data () {
    return {
      img: null,
      apiUrl: this.apiUrl,
      imgUrl: this.imgUrl
    }
  },
  methods: {
    getImg () {
      let self = this
      this.$http.get(this.apiUrl + 'img/shuffle').then(function (response) {
        self.img = response.data
      })
    }
  },
  mounted () {
    this.getImg()
  }
}
</script>
