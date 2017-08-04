<template>
<div>
  <ele-header :seller="seller"></ele-header>
  <div class="tabs border-1px">
    <div class="tab-item">
      <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/ratings">评价</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/seller">商店</router-link>
    </div>
  </div>
  <router-view :seller="seller"></router-view>
</div>
</template>
<script>
  import axios from 'axios'
  import header from './components/header/header.vue'
  export default {
    data () {
      return {
        seller: {}
      }
    },
    components: {
      'ele-header': header
    },
    created () {
      axios.get('/api/seller')
        .then(res => {
          this.seller = res.data.data
        })
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./components/css/border-1px.styl"
  .tabs
    display flex
    border-1px(deepskyblue)
    .tab-item
      width 0px
      flex 1
      text-align center
      a
        height 40px
        line-height 40px
        font-size 14px
        display block
      .active
        color red



</style>
