<template>
  <div class="header-e">
    <div class="header-top">
      <div class="h-t-left">
        <img :src="seller.avatar" alt="" width="64px" height="64px">
      </div>
      <div class="h-t-right">
        <div class="h-t-r-top">
          <span class="brand"></span>
          <span>{{seller.name}}</span>
        </div>
        <div class="h-t-r-middle">
          <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
        </div>
        <div class="h-t-r-bottom" v-if="seller.supports">
          <span></span>
          <span>{{seller.supports[0].description}}</span>
        </div>

      </div>
      <div class="h-t-r-btn" v-if="seller.supports">
        <span class="num" @click="isShowMask">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="header-bottom" @click="isShowMask">
      <span></span>
      <p class="text">
        {{seller.bulletin}}
      </p>
      <span class="icon icon-keyboard_arrow_right">

      </span>
    </div>
    <div class="header-foot">
      <div class="header-bg-top"></div>
      <div class="header-bg"></div>
    </div>
    <transition name="fade">
      <div class="mask" v-show="isMask">
        <div class="mask-wrap">
          <div class="mask-main">
            <h2 class="title">{{seller.name}}</h2>
            <div class="star">
              <star :size="48" :starScore="seller.score"></star>
            </div>
            <div class="info">
              <div class="line"></div>
              <span class="text">优惠信息</span>
              <div class="line"></div>
            </div>
            <ul class="msg-list">
              <li class="msg-list-item" v-for="support in seller.supports">
                <span :class="icons[support.type]"></span>
                <span>{{support.description}}</span>
              </li>

            </ul>
            <div class="info">
              <div class="line"></div>
              <span class="text">商家公告</span>
              <div class="line"></div>
            </div>
            <div class="msg-detail">
              {{seller.bulletin}}
            </div>
          </div>
        </div>
        <div class="mask-footer ">
          <span class="icon-close" @click="isShowMask"></span>
        </div>
      </div>
    </transition>

  </div>
</template>
<script>
  import star from '../star/star.vue'
  export default {
    props: ['seller'],
    data () {
      return {
        isMask: false,
        icons: ['decrease', 'discount', 'guarantee', 'special', 'invoice']
      }
    },
    methods: {
      isShowMask () {
        this.isMask = !this.isMask
      }
    },
    components: {
      star
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../css/bg-image.styl"
  .header-e
    overflow hidden
    position relative
    .header-top
      position relative
      margin 24px 12px 18px 24px
      font-size 0
      color white
      .h-t-left
        display inline-block
        margin-right 16px
      .h-t-right
        position relative
        vertical-align top
        display inline-block
        font-size 0
        .h-t-r-top
          font-size 16px
          font-weight bold
          line-height 18px
          span:first-child
            display inline-block
            width 30px
            height 18px
            bg-image(brand)
            background-size 30px 18px
            vertical-align top
            margin-right 6px
        .h-t-r-middle
          font-size 12px
          font-weight 200
          line-height 12px
          margin 8px 0 10px 0
        .h-t-r-bottom
          font-size 10px
          font-weight 200
          line-height 12px
          span:first-child
            display inline-block
            width 12px
            height 12px
            bg-image(decrease_1)
            background-size 12px 12px
            vertical-align top


      .h-t-r-btn
        background-color rgba(0, 0 ,0 ,.5)
        font-size 0
        color rgb(255,255,255)
        font-weight 200
        line-height 12px
        height 17px
        padding 7px 7px
        position absolute
        right 12px
        bottom -13px
        z-index 30
        border-radius 13px
        display flex
        align-items center
        justify-content center
        .icon-keyboard_arrow_right
          margin-top 3px
          margin-left 2px
          font-size 14px
          line-height 14px
          color rgb(255,255,255)
          vertical-align middle
        .num
          font-size 10px
          line-height 10px
          display inline-block

    .header-bottom
      width 100%
      height 28px
      padding 4px 0
      background-color rgba(7,17,27,.2)
      display flex
      flex 1
      position relative
      z-index 30
      span:first-child
        display inline-block
        width 22px
        height 12px
        margin 7px 4px 0 12px
        bg-image(bulletin)
        background-size 22px 12px
        vertical-align top
      .text
        vertical-align middle
        display inline-block
        width 300px
        white-space nowrap
        overflow hidden
        text-overflow: ellipsis;
        font-size 10px
        color white
        font-weight 200
        line-height 28px
      .icon-keyboard_arrow_right
        vertical-align middle
        margin 8px 12px 0 4px
        color white

    .header-foot
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      .header-bg-top
        position absolute
        background-color rgba(7,17,27,.5)
        width 100%
        height 100%
        z-index -2
      .header-bg
        position absolute
        width 100%
        height 100%
        z-index -3
        background url("./avatar.jpg") no-repeat
        background-size 100% 100%
        filter blur 10px
    .mask
      position fixed
      left 0px
      top 0
      height 100%
      width 100%
      z-index 99
      &.fade-enter-active, &.fade-leave-active
        transition: opacity .5s

      &.fade-enter, &.fade-leave-to
        opacity: 0

      .mask-wrap
        background-color rgba(7,17,27,.8)
        filter blur 10px
        width 100%
        min-height 100%
        .mask-main
          overflow hidden
          text-align center
          .title
            font-size 16px
            font-weight 700px
            color rgb(255, 255, 255)
            line-height 16px
            margin 64px auto 16px
          .info
            margin 0 36px
            display flex
            align-items center
            .line
              flex 1
              background-color rgba(255,255,255,.2)
              height 2px
            .text
              margin 0 12px
              color white


          .msg-list
            width 80%
            margin 24px auto 28px
            .msg-list-item
              margin-bottom 12px
              font-size 12px
              font-weight 200
              color white
              text-align left
              span:first-child
               display inline-block
               width 16px
               height 16px
               vertical-align top
               &.decrease
                 bg-image(decrease_1)
                 margin 0 6px 0 12px
                 background-size 16px 16px
               &.discount
                 bg-image(discount_1)
                 margin 0 6px 0 12px
                 background-size 16px 16px
               &.guarantee
                 bg-image(guarantee_1)
                 margin 0 6px 0 12px
                 background-size 16px 16px
               &.special
                 bg-image(special_1)
                 margin 0 6px 0 12px
                 background-size 16px 16px
               &.invoice
                 bg-image(invoice_1)
                 margin 0 6px 0 12px
                 background-size 16px 16px
          .msg-detail
            padding 0 12px
            width 80%
            margin 24px auto 0
            font-weight 200
            font-size 12px
            color white
            line-height 24px
            text-align left
      .mask-footer
        height 64px
        margin-top -64px
        line-height 64px
        text-align center
        .icon-close
          font-size 32px
          color rgba(255, 255, 255, .5)


</style>
