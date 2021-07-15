<template>
  <div class="lunbo2">
    <div class="wrap" id="wrap">
      <ul>
        <li class="li activate"><img src="~@/assets/image/demo2/1.jpg" /></li>
        <li class="li"><img src="~@/assets/image/demo2/2.jpg" /></li>
        <li class="li"><img src="~@/assets/image/demo2/3.jpg" /></li>
        <li class="li"><img src="~@/assets/image/demo2/4.jpg" /></li>
      </ul>
      <div class="button-wrap">
        <div class="button left" @click="goPrev"></div>
        <div class="button right" @click="goNext"></div>
      </div>

    </div>
  </div>
</template>

<script>
/* eslint-disable */
import anime from 'animejs/lib/anime.es.js'
export default {
  name: 'lunBo2',
  props: {

  },
  data () {
    return {
      current: 0,
      slides: ''
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {
    this.slides = Array.from(document.querySelectorAll('.li'))
  },
  methods: {
    goPrev() {
      this.goStep(-1)
    },
    goNext() {
      this.goStep(1)
    },
    goStep (dir) {
      let index = dir + this.current
      let len = 4           // 暂时写死
      let currentIndex = (index + len) % len;
      this.goTo(currentIndex, dir)
    },
    goTo (index, dir) {
      let prevSlide = this.slides[this.current];
      let nextSlide = this.slides[index];

      this.current = index

      anime({
        targets: prevSlide,
        easing: 'easeOutQuint',
        duration: 500,
        translateX: [0, `${-dir * 100}%`]
      })

      anime({
        targets: nextSlide,
        easing: 'easeOutQuint',
        duration: 500,
        translateX: [`${dir * 100}%`, 0]
      })

      console.log(prevSlide, nextSlide)
    }
  }
}

</script>


<style lang="less">
.wrap{
  position: relative;
}
ul{
  width: 800px;
  height: 500px;
  margin: auto;
  padding: 0;
  overflow: hidden;
  position: relative;
  li{
    list-style-type: none;
    position: absolute;
    top: 0; left: 0;
    transform: translateX(100%);
    img {
      display: block;
    }
  }
}
.button-wrap{
  width: 800px;
  height: 0;
  position: relative;
  margin: auto;
}
.button{
  width: 40px;
  height: 40px;
  background-color: red;
  position: absolute;
}
.left{
  top: -250px;
  left: -50px;
}
.right{
  top: -250px;
  right: -50px;
}
.activate{
  transform: translateX(0);
}

</style>
