<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(good, index) in goods"
              :class="{'current': isCurrent === index}"
              @click="selectFood(index)"
          >
          <span class="text border-1px">
            <span class="icon" :class="icons[good.type]" v-if="good.type>0"></span>
            {{good.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list food-list-hook" v-for="good in goods" ref="foodsList">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item" v-for="food in good.foods" @click="selectOneFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src='food.icon'>
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper" ref="cartcontrolWrapper">
                    <cartcontrol :food='food' :add-food="addFood"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopCart :seller="seller"
                :select-foods="selectFoods"
                :add-food="addFood"
      ></shopCart>
      <transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-for="(ball, index) in balls"
        :key="index"
        @after-enter="afterDrop"
        v-bind:css="false"
      >
        <div class="ball-wraper" v-if="ball.isShowBall">
          <div class="ballinner"></div>
        </div>
      </transition>
    </div>
    <transition name="foodDetail">
      <food :select-food2="selectFood2"
            :add-food="addFood"
            :select-one-food="selectOneFood"
            v-if="isShowFood"
      ></food>
    </transition>
  </div>

</template>
<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import shopCart from '../shopCart/shopCart.vue'
  import food from '../food/food.vue'
  export default {
    props: ['seller'],
    data () {
      return {
        goods: [],
        icons: ['decrease', 'discount', 'guarantee', 'special', 'invoice'],
        tops: [],
        isCurrent: 0,
        selectFood2: {},
        isShowFood: false,
        balls: [
          {isShowBall: false},
          {isShowBall: false},
          {isShowBall: false},
          {isShowBall: false},
          {isShowBall: false}
        ],
        droppingBalls: []
      }
    },
    created () {
      axios.get('/api/goods')
        .then(res => {
          const result = res.data
          if (result.code === 0) {
            this.goods = result.data
            this.$nextTick(() => {
              new BScroll(this.$refs.menuWrapper, {
                click: true
              })
              this.scroll = new BScroll(this.$refs.foodsWrapper, {
                probeType: 3,
                click: true
              })
              this.tops = this.$refs.foodsList.map(item => {
                return item.getBoundingClientRect().top - 174
              })
              this.scroll.on('scroll', (pos) => {
                const tops = this.tops
                const length = tops.length
                for (let i = 0; i < length; i++) {
//                  判断食物滚动的距离
                  if ((tops[i] < (-pos.y) && (-pos.y) < tops[i + 1]) || (-pos.y) > tops[length - 1]) {
                    this.isCurrent = i
                  }
                }
              })
            })
          }
        })
    },
    methods: {
      selectFood (index) {
        console.log(index)
        const offsetY = -this.tops[index]
        this.scroll.scrollTo(0, offsetY, 2, 'easing')
        this.isCurrent = index
      },
      addFood (food, isAdd, ev) {
        if (isAdd) {
          if (!food.count) {
            this.$set(food, 'count', 1)

          } else {
            food.count++
          }
          this.getBallXY(ev)
        } else {
          food.count--
        }
      },
      selectOneFood (food) {
        if (this.isShowFood) {
          this.isShowFood = false
          return
        }
        this.selectFood2 = food
        this.isShowFood = true
      },
      getBallXY (ev) {
        const ball = this.balls.find(ball => !ball.isShowBall)
        ball.X = ev.target.getBoundingClientRect().left
        ball.Y = ev.target.getBoundingClientRect().top
        ball.isShowBall = true
        this.droppingBalls.push(ball)
      },
      beforeEnter (el) {
        const ball = this.droppingBalls.shift()
        let offX = 32
        let offY = 23
        el.style.transform = `translate3d(0,${-document.documentElement.clientHeight + ball.Y + offY}px,0)`
        el.children[0].style.transform = `translate3d(${ball.X - offX}px,0,0)`
        el.ball = ball
      },
      enter (el) {
        var temp = el.clientHeight
        this.$nextTick(() => {
          el.style.transform = `translate3d(0,0,0)`
          el.children[0].style.transform = `translate3d(0,0,0)`
        })
      },
      afterDrop (el) {
        // 必须延迟更新状态
        setTimeout(() => {
          el.ball.isShowBall = false
        }, 400)
      },

    },
    components: {
      cartcontrol,
      shopCart,
      food
    },
    computed: {
      selectFoods () {
        const foods = []
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../css/bg-image.styl"
  @import "../css/border-1px.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
    .ball-wraper
      position fixed
      z-index 100
      width 30px
      height 30px
      bottom 23px
      left 32px
      transition all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .ballinner
        height 16px
        width 16px
        border-radius 50%
        position absolute
        background-color deepskyblue
        transition all .4s linear

  .foodDetail-enter-active, .foodDetail-leave-active
    transition All .5s
  .foodDetail-enter, .foodDetail-leave-to
    transform translate3d(100%, 0, 0)
    opacity 0
</style>
