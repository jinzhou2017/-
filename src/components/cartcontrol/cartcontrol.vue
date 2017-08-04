<template>
  <div>
    <transition name="remove_circle">
      <div class="icon-remove_circle_outline cart" v-show="food.count" @click.stop="addFood(food,false,$event)">

      </div>

    </transition>
    <div class="cart foodNum" v-show="food.count">
      {{food.count}}
    </div>

    <div class="icon-add_circle cart" @click.stop="addFood(food,true,$event)">

    </div>


  </div>


</template>
<script>
  export default {
    props: ['addFood', 'food'],
    data () {
      return {
        isShow: false
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
 .icon-add_circle
    color rgb(0,160,220)
    font-size 24px
    line-height 24px
 .icon-remove_circle_outline
   color rgb(0,160,220)
   font-size 24px
   line-height 24px
 .remove_circle-enter-active, .remove_circle-leave-active
    transition all .3s
 .remove_circle-enter, .remove_circle-leave-to
    transform translateX(20px) rotate(180deg)
 .cart
    vertical-align top
    display inline-block
    margin-right 5px
 .foodNum
    color rgb(147,153,159)
    font-size 16px
    line-height 24px
    text-align center
    width 24px
    height 24px
</style>
