<template>
  <div class="zhuanpan">
    <div class="zhuanpan-wrap">
      <div class="panzi" id="panzi" @click="begain"></div>
      <div class="zhizhen">
        <img src="~@/assets/image/demo3/zhizhen.png" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import anime from 'animejs/lib/anime.es.js'
export default {
  name: 'zhuanpan',
  props: {

  },
  data () {
    return {
      jiangpin: [
        {key: 0, title: '一等奖', deg: [0, 45]},
        {key: 1,title: '二等奖', deg: [45, 90]},
        {key: 2,title: '三等奖', deg: [90, 135]},
        {key: 3,title: '四等奖', deg: [135, 180]},
        {key: 4,title: '五等奖', deg: [180, 225]},
        {key: 5,title: '六等奖', deg: [225, 270]},
        {key: 6,title: '七等奖', deg: [270, 315]},
        {key: 7,title: '八等奖', deg: [315, 360]}
      ]
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    begain () {
      let self = this
      let index = Math.floor(Math.random() * 7)
      let degarr = this.jiangpin[index].deg
      let targetDeg = degarr[0] + (10 + Math.floor(Math.random() * 15))       // 避免落在尴尬的位置引起争议
      let count = 10 * 360
      let allTargetDeg = targetDeg + count

      anime({
        targets: '#panzi',
        easing: 'easeInOutCubic',
        duration: 10000,
        rotate: [0, `${allTargetDeg}deg`],
        complete () {
          alert(`恭喜您获得${self.jiangpin[index].title}`)
        }
      })
    }
  }
}

</script>


<style lang="less">
.zhuanpan-wrap{
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 460px;
  margin: auto;
}
.panzi{
  width: 460px;
  height: 460px;
  background-image: url('~@/assets/image/demo3/zhuanpan.jpg');
}
.zhizhen{
  height: 100px;
  position: absolute;
  left: 204px;
  top: 165px;
  img {
    height: 100%;
  }
}

</style>
