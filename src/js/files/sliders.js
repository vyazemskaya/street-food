import Swiper, { Navigation, EffectFade, Pagination } from 'swiper'

// styles ======================================================================

// base styles
import '../../scss/base/swiper.scss'

// all styles
// import "../../scss/libs/swiper.scss";

// all styles from node_modules
// import 'swiper/css';

// launch ======================================================================
function initSliders() {
  if (document.querySelector('.hero-mainpage__slider')) {
    new Swiper('.hero-mainpage__slider', {
      modules: [EffectFade, Pagination],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: false,
      speed: 800,
      allowTouchMove: false,
      simulateTouch: false,
      loop: true,

      // effects
      effect: 'fade',

      // pagination
      pagination: {
        el: '.hero-mainpage__fraction',
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          return '0' + current
        },
      },

      // events
      on: {
        init: function () {
          const swiper = this
          const arr = Array.from(
            document.querySelectorAll('.carousel-hero-mainpage__item')
          )

          if (arr.length) {
            let activeIndex = arr.indexOf(
              document.querySelector('.carousel-hero-mainpage__item._active')
            )

            swiper.slideTo(activeIndex)
            arr.forEach(item => {
              item.addEventListener('click', function () {
                activeIndex = arr.indexOf(item)
                swiper.slideTo(activeIndex)
              })
            })
          }
          if (document.querySelector('.hero-mainpage__control')) {
            document
              .getElementById('heroNext')
              .addEventListener('click', function () {
                if (!document.documentElement.classList.contains('_rotate')) {
                  swiper.slideNext()
                }
              })
            document
              .getElementById('heroPrev')
              .addEventListener('click', function () {
                if (!document.documentElement.classList.contains('_rotate')) {
                  swiper.slidePrev()
                }
              })
          }
        },
        onSlideChangeEnd: function () {
          if (
            this.slides.length == this.activeIndex + 1 &&
            !document.documentElement.classList.contains('_rotate')
          ) {
            this.swipeTo(0)
          }
        },
      },
    })
  }
  if (document.querySelector('.popular-mainpage__slider')) {
    new Swiper('.popular-mainpage__slider', {
      modules: [Navigation, Pagination],
      observer: true,
      observeParents: true,
      slidesPerView: 3,
      spaceBetween: 35,
      autoHeight: false,
      speed: 800,
      allowTouchMove: false,
      simulateTouch: false,
      // loop: true,

      // effects
      // effect: 'fade',

      // pagination
      pagination: {
        el: '.control-popular-mainpage__fraction',
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          return '0' + current + '/' + '0' + total
        },
      },

      // navigation
      navigation: {
        nextEl: '.control-popular-mainpage__nav-btn_next',
        prevEl: '.control-popular-mainpage__nav-btn_prev',
      },

      // events
      on: {},
    })
  }
}

// slider scroll ===============================================================
function initSlidersScroll() {
  let sliderScrollItems = document.querySelectorAll('.swiper_scroll')
  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index]
      const sliderScrollBar =
        sliderScrollItem.querySelector('.swiper-scrollbar')
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: {
          enabled: true,
        },
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false,
        },
        mousewheel: {
          releaseOnEdges: true,
        },
      })
      sliderScroll.scrollbar.updateSize()
    }
  }
}

//=================================================================================================================

window.addEventListener('load', function (e) {
  initSliders()
  //initSlidersScroll();
})
