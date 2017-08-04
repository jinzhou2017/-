<template>
  <div class="shop-cart">
    <div class="left" @click="showList" >
      <div class="cart-wrapper" :class="{active:isActive}">
        <div class="icon-shopping_cart"></div>
        <div class="shop-num" v-if="selectFoods.length>0">{{selectFoods.length}}</div>
      </div>
    </div>
    <div class="middle">
      <div class="moneny">
        ￥0
      </div>
      <div class="line"></div>
      <div class="other-moneny">
        另需配送费4￥
      </div>
    </div>
    <div class="right">
      <h2>￥{{seller.minPrice}}元起送</h2>
    </div>
    <div class="shopList" v-if="isActive">
      <div class="title">
        <div class="t-left">购物车</div>
        <div class="t-right">清空</div>
      </div>
      <ul class="shop-item-wrap">
        <li class="shop-item" v-for="food in selectFoods">
          <div class="text">
            {{food.name}}
          </div>
          <div class="shop-item-money">
            <p>￥{{food.price}}</p>
          </div>
          <div class="shop-item-cart">
            <cartcontrol :food="food" :add-food="addFood"></cartcontrol>
          </div>


        </li>
      </ul>
    </div>

  </div>

</template>
<script>
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  export default {
    props: ['addFood', 'seller', 'selectFoods'],
    data () {
      return {
        isActive: false
      }
    },
    components: {
      cartcontrol
    },
    methods: {
      showList () {
        this.isActive = !this.isActive
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../css/border-1px.styl"
.shop-cart
  position fixed
  bottom 0
  background-color #141d27
  z-index 99
  width 100%
  height 50px
  .left
    display inline-block
    margin-left 18px
    width 58px
    height 58px
    border-radius 50%
    margin-top  -16px
    background-color #141d27
    overflow hidden
    .cart-wrapper
      position relative
      width 44px
      height 44px
      border-radius 50%
      background-color rgba(255,255,255,0.4)
      margin 6px auto 8px
      display flex
      align-items center
      justify-content center
      &.active
        background-color deepskyblue !important
      .icon-shopping_cart
        font-size 24px
        text-align center
        color white
      .shop-num
        display inline-block
        width 20px
        height 20px
        position absolute
        left 20px
        top 0px
        border-radius 50%
        background-color red
        color black
        text-align center
        line-height 20px
  .middle
    display inline-block
    position absolute
    margin-left 18px
    margin-bottom 12px
    padding-top 15px
    height 100%
    .moneny
      height 24px
      font-size 16px
      font-weight 700
      line-height 24px
      color rgba(255,255,255,0.4)
      display inline-block
      vertical-align top
    .line
      display inline-block
      width 1px
      height 24px
      bottom 0
      background rgba(255,255,255,0.1)
      transform scaleX(.5)
    .other-moneny
      display inline-block
      vertical-align top
      font-weight 700
      font-size 16px
      color rgba(255,255,255,0.4)
      height 24px
      line-height 24px

  .right
    float right
    width 121px
    height 50px
    display flex
    align-items center
    h2
      margin 0 auto
      font-size 12px
      color rgba(255,255,255,0.4)
      font-weight 700
      line-height 24px
      text-align center
  .shopList
    position: absolute
    left: 0
    right 0
    top: 0
    z-index: -1
    transform translate3d(0,-100%,-10px)
    .title
      position relative
      height 40px
      background-color #f4f76f
      padding-right 0
      border-1px(rgba(7,17,27,.1))
      .t-left
        float left
        margin-left 18px
        font-weight 200
        font-size 14px
        height 100%
        color rgb(7,17,27)
        line-height 40px
      .t-right
        position absolute
        right 20px
        font-size 12px
        line-height 40px
        height 100%
        color rgb(0,160,220)
    .shop-item-wrap
      background-color white
      .shop-item
        height 48px
        line-height 48px
        display flex
        align-items center
        .text
          text-align right
          flex-grow 1
          height 48px
          line-height 48px
          font-size 14px
          color rgb(7,17,27)
        .shop-item-cart
          flex-grow 1
          text-align right
          padding-top 24px
        .shop-item-money
          flex-grow 7
          text-align right







</style>
