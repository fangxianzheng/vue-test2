<template>
  <div class="lunbo">
    <div class="page-wrapper" id="coidea">
      <div class="slider">
        <ul class="slider-list">
          <li class="slider-list__item">
            <span class="back__element">
              <img src="~@/assets/image/demo1/back_grapes_001.png" />
            </span>
            <span class="main__element">
              <img src="~@/assets/image/demo1/bottle_grapes_001.png" />
            </span>
          </li>
          <li class="slider-list__item">
            <span class="back__element">
              <img src="~@/assets/image/demo1/back_apple_002.png" />
            </span>
            <span class="main__element">
              <img src="~@/assets/image/demo1/bottle_apple_002.png" />
            </span>
          </li>
          <li class="slider-list__item">
            <span class="back__element">
              <img src="~@/assets/image/demo1/back_strawberry_003.png" />
            </span>
            <span class="main__element">
              <img src="~@/assets/image/demo1/bottle_strawberry_003.png" />
            </span>
          </li>

        </ul>
        <div class="slider__nav-bar" @click="_navClickHandler">
          <a class="nav-control"></a>
          <a class="nav-control nav-control_active"></a>
          <a class="nav-control"></a>
        </div>
        <div class="slider__controls">
          <a class="slider__arrow slider__arrow_prev" @click="goPrev"></a>
          <a class="slider__arrow slider__arrow_next" @click="goNext"></a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import anime from 'animejs/lib/anime.es.js'
export default {
  name: 'lunBo',
  props: {

  },
  data () {
    return {
      current: 0,
      rootElement: '',
      slides: '',
      slidesLength: '',
      isAnimating: false,
      direction: 1, // -1
      baseAnimeSettings: {
        rotation: 45,
        duration: 750,
        easing: 'easeInOutCirc'
      },
      baseAnimeSettingsBack: {
        rotation: 45,
        duration: 1850,
        elasticity: function(el, i, l) {
          return (200 + i * 200);
        }
      }
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {
    this.rootElement = document.querySelector(".slider")
    this.slides = Array.from(this.rootElement.querySelectorAll(".slider-list__item"))
    this.slidesLength = this.slides.length;
    this.navBar = this.rootElement.querySelector(".slider__nav-bar");
    this.thumbs = Array.from(this.rootElement.querySelectorAll(".nav-control"));
    this.prevButton = this.rootElement.querySelector(".slider__arrow_prev");
    this.nextButton = this.rootElement.querySelector(".slider__arrow_next");
    this.slides[this.current].classList.add("slider-list__item_active");
    this.thumbs[this.current].classList.add("nav-control_active");
  },
  methods: {
    goTo(index, dir) {
      if (this.isAnimating) return;
      var self = this;
      let prevSlide = this.slides[this.current];
      let nextSlide = this.slides[index];
      console.log('prevSlide', prevSlide)
      console.log('nextSlide', nextSlide)
    

      self.isAnimating = true;
      self.current = index;
      nextSlide.classList.add("slider-list__item_active");

      anime(Object.assign({}, self.baseAnimeSettings, {
        targets: nextSlide,
        rotate: [90 * dir + 'deg', 0],
        translateX: [90 * dir + '%', 0]
      }));

      anime(Object.assign({}, self.baseAnimeSettingsBack, {
        targets: nextSlide.querySelectorAll('.back__element'),
        rotate: [90 * dir + 'deg', 0],
        translateX: [90 * dir + '%', 0]
      }));

      anime(Object.assign({}, self.baseAnimeSettings, {
        targets: prevSlide,
        rotate: [0, -90 * dir + 'deg'],
        translateX: [0, -100 * dir + '%'],
        complete: function(anim) {
          self.isAnimating = false;
          prevSlide.classList.remove("slider-list__item_active");
          self.thumbs.forEach((item, index) => {
            var action = index === self.current ? "add" : "remove";
            item.classList[action]("nav-control_active");
          });
        }
      }))

      anime(Object.assign({}, self.baseAnimeSettingsBack, {
        targets: prevSlide.querySelectorAll('.back__element'),
        rotate: [0, -90 * dir + 'deg'],
        translateX: [0, -100 * dir + '%']
      }));

      
    },
    _navClickHandler(e) {
      var self = this;
      if (self.isAnimating) return;
      let target = e.target.closest(".nav-control");
      if (!target) return;
      let index = self.thumbs.indexOf(target);
      if (index === self.current) return;
      let direction = index > self.current ? 1 : -1;
      self.goTo(index, direction);
    },
    goStep(dir) {
      let index = this.current + dir;
      let len = this.slidesLength;
      let currentIndex = (index + len) % len;

      this.goTo(currentIndex, dir);

    },
    goPrev() {
      this.goStep(-1);
    },
    goNext() {
      this.goStep(1);
    }
  }
}

</script>


<style lang="less">
  .lunbo{
    box-sizing: border-box;
    *{
      box-sizing: inherit;
    }
  }
  .slider{
    position: relative;
    display: block;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .slider-list{
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    list-style-type:none;
  }
  .slider-list__item{
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(100%);
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16vw;
    color: #000;
    will-change: transform;
    z-index: 1;
  }
  .back__element{
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    img {
      position: relative;
      display: block;
      width: 100%;
      max-width: 640px;
      height: auto;
      top: 50%;
      left: 50%;
      transform: translate( -50%, -50% );
    }
  }
  .main__element{
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    img{
      position: relative;
      display: block;
      width: 100%;
      max-width: 320px;
      height: auto;
      top: 50%;
      left: 50%;
      transform: translate( -50%, -50% );
    }
  }
  .slider__arrow{
    position: absolute;
    top: 50%;
    transform: translateY( -50% );
    width: 64px;
    height: 64px;
    transition: 0.2s;
    cursor: pointer;
    z-index: 100;
    opacity: 0.8;
  }
  .slider__arrow_prev{
    left: 16px;
    width: 64px;
    height: 64px;
    background-image: url(~@/assets/image/demo1/arrow__left-white.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 64px;
  }
  .slider__arrow_next{
    right: 16px;
    width: 64px;
    height: 64px;
    background-image: url(~@/assets/image/demo1/arrow__right-white.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 64px;
  }
  .slider__nav-bar {
    position: absolute;
    width: 180px;
    height: 180px;
    bottom: -90px;
    left: 50%;
    transform: translateX( -50% );
    border-radius: 90px;
    text-align: center;
    background: #dde3e6;
    z-index: 100;
  }
  .nav-control {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    opacity: 0.5;
    width: 32px;
    height: 32px;
    transition: 0.2s;
    cursor: pointer;
    background-image: url(~@/assets/image/demo1/dot-black.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 26px 26px;
    margin-top: 32px;
    z-index: 3;
  }
  .nav-control_active {
    opacity: 1;
  }
  .slider-list__item_active {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    z-index: 2;
  }  
</style>
