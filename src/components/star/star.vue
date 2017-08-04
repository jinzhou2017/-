<template>
  <div class="star-size" :class="`star-${size}`">
    <span class="star-item" v-for="item in starList" :class="item"></span>
  </div>
</template>
<script>
  export default {
    props: ['size', 'starScore'],
    computed: {
      starList: function () {
        const starScore = this.starScore
        const list = []
        let starOn = Math.floor(starScore)
        for (let i = 0; i < starOn; i++) {
          list.push('star-on')
        }
        if (starScore - starOn >= 0.5) {
          list.push('star-half')
        }
        while (list.length < 5) {
          list.push('star-off')
        }
        return list
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../css/bg-image.styl"
  .star
    width 100%
    height 24px
    margin-bottom 28px
    .star-size
      &.star-48
        .star-item
          display inline-block
          width 30px
          height 28px
          margin-left 20px
          &.star-half
            bg-image('../star/star48_half')
            background-size 30px 28px
          &.star-on
            bg-image('../star/star48_on')
            background-size 30px 28px
          &.star-off
            bg-image('../star/star48_off')
            background-size 30px 28px
      &.star-36
        .star-item
          display inline-block
          width 22px
          height 22px
          &.star-half
            bg-image('../star/star36_half')
            background-size 22px 22px
          &.star-on
            bg-image('../star/star36_on')
            background-size 22px 22px
          &.star-off
            bg-image('../star/star36_off')
            background-size 22px 22px
      &.star-24
        .star-item
          display inline-block
          width 15px
          height 15px
          &.star-half
            bg-image('../star/star36_half')
            background-size 15px 15px
          &.star-on
            bg-image('../star/star36_on')
            background-size 15px 15px
          &.star-off
            bg-image('../star/star36_off')
            background-size 15px 15px
</style>
