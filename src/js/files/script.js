import { _slideDown, _slideUp, _slideToggle } from './functions.js'
import { modules } from './modules.js'

document.addEventListener('DOMContentLoaded', function (event) {
  window.onload = function () {
    if (document.querySelectorAll('.popular-mainpage__slide')) {
      const popularSlides = document.querySelectorAll(
        '.popular-mainpage__slide'
      )

      // $('.popular-mainpage__slide').each(function (index, item) {
      //   const slideInfo = $(item).find('.slide-popular-mainpage__info')[0]

      //   $(item).on('mouseover', function (event) {
      //     $(slideInfo).animate({ height: 'auto' }, 10)
      //   })
      //   $(item).on('mouseout', function (event) {
      //     $(slideInfo).animate({ height: 0 }, 10)
      //   })
      // })
    }

    window.requestAnimationFrame(function () {
      const setClasses = (arr, activeIndex) => {
        document
          .querySelector('.carousel-hero-mainpage__item._active')
          .classList.remove('_active')
        document
          .querySelector('.carousel-hero-mainpage__item._prev')
          .classList.remove('_prev')
        document
          .querySelector('.carousel-hero-mainpage__item._next')
          .classList.remove('_next')
        arr[activeIndex].classList.add('_active')
        if (activeIndex === arr.length - 1) {
          arr[0].classList.add('_next')
        } else {
          arr[activeIndex + 1].classList.add('_next')
        }
        if (activeIndex === 0) {
          arr[arr.length - 1].classList.add('_prev')
        } else {
          arr[activeIndex - 1].classList.add('_prev')
        }
      }

      // gsap animations
      if (document.getElementById('holder')) {
        gsap.registerPlugin(MotionPathPlugin)

        const outerPath = MotionPathPlugin.convertToPath('#holder', false)[0]
        outerPath.id = 'outerPath'
        document.querySelector('svg').prepend(outerPath)

        let items = gsap.utils.toArray('.carousel-hero-mainpage__item'),
          numItems = items.length,
          itemStep = 1 / numItems,
          wrapProgress = gsap.utils.wrap(0, 1),
          snap = gsap.utils.snap(itemStep),
          wrapTracker = gsap.utils.wrap(0, numItems),
          tracker = { item: 0 }

        gsap.set(items, {
          motionPath: {
            path: outerPath,
            align: outerPath,
            alignOrigin: [0.5, 0.5],
            start: 0.12,
            end: i => gsap.utils.wrap(0, 1, i / items.length - 0.12),
          },
          scale: 0.5,
        })

        const tl = gsap.timeline({ paused: true, reversed: true })

        tl.to('.carousel-hero-mainpage__items', {
          rotation: 360,
          transformOrigin: 'center',
          duration: 1,
          ease: 'none',
        })

        tl.to(
          items,
          {
            rotation: '-=360',
            transformOrigin: 'center center',
            duration: 1,
            ease: 'none',
          },
          0
        )

        tl.to(
          tracker,
          {
            item: numItems,
            duration: 1,
            ease: 'none',
            modifiers: {
              item: value => wrapTracker(numItems - Math.round(value)),
            },
          },
          0
        )

        items.forEach(function (el, i) {
          el.addEventListener('click', function () {
            var current = tracker.item,
              activeItem = i

            if (i === current) {
              return
            }

            //set active item to the item that was clicked and remove active class from all items
            setClasses(items, activeItem)

            var diff = current - i
            if (Math.abs(diff) < numItems / 2) {
              moveWheel(diff * itemStep)
            } else {
              var amt = numItems - Math.abs(diff)

              if (current > i) {
                moveWheel(amt * -itemStep)
              } else {
                moveWheel(amt * itemStep)
              }
            }
          })
        })

        document
          .getElementById('heroNext')
          .addEventListener('click', function () {
            var i = 0

            var theArray = items
            var currentIndex = 0

            if (!document.documentElement.classList.contains('_rotate')) {
              if (i === 0) {
                theArray[currentIndex]
              } else if (i < 0) {
                theArray[(currentIndex + theArray.length + i) % theArray.length]
              } else if (i > 0) {
                theArray[(currentIndex + i) % theArray.length]
              }

              return moveWheel(-itemStep)
            }
          })

        document
          .getElementById('heroPrev')
          .addEventListener('click', function () {
            if (!document.documentElement.classList.contains('_rotate')) {
              return moveWheel(itemStep)
            }
          })

        function moveWheel(amount, i, index) {
          let progress = tl.progress()
          tl.progress(wrapProgress(snap(tl.progress() + amount)))
          let next = tracker.item
          const dots = items[next].querySelector('span')
          const rt = gsap.getProperty(
            '.carousel-hero-mainpage__items',
            'rotation'
          )
          tl.progress(progress)

          document.documentElement.classList.add('_rotate')
          setTimeout(() => {
            document.documentElement.classList.remove('_rotate')
          }, 800)

          setClasses(items, next)

          gsap.to(tl, {
            progress: snap(tl.progress() + amount),
            modifiers: {
              progress: wrapProgress,
            },
          })
          gsap.fromTo(
            dots,
            {
              rotation: rt,
            },
            {
              rotation: rt,
              duration: 1,
            }
          )
        }
      }
      // hero title
      if (document.querySelector('.slide-hero-mainpage__title')) {
        gsap.fromTo(
          '.slide-hero-mainpage__title',
          {
            xPercent: 100,
            delay: 1,
          },
          { xPercent: 0, duration: 2 }
        )
      }

      // hero button
      if (document.querySelector('.slide-hero-mainpage__button')) {
        let heroCircleTl = gsap.timeline()
        heroCircleTl.from('.slide-hero-mainpage__button', {
          xPercent: -100,
          rotation: -11.311,
          duration: 1,
          delay: 1,
        })
        heroCircleTl.to('.slide-hero-mainpage__button', {
          xPercent: 5,
          rotation: 12,
          duration: 0.5,
        })
        heroCircleTl.to('.slide-hero-mainpage__button', {
          xPercent: 0,
          rotation: 11.311,
          duration: 0.5,
        })
      }

      // hero text
      if (document.querySelector('.slide-hero-mainpage__text')) {
        let heroTxtTl = gsap.timeline()
        heroTxtTl.from('.slide-hero-mainpage__text', {
          xPercent: 500,
          duration: 1.5,
          delay: 1,
        })
        heroTxtTl.to('.slide-hero-mainpage__text', {
          xPercent: 1,
          duration: 0.6,
        })
        heroTxtTl.to('.slide-hero-mainpage__text', {
          xPercent: 2,
          duration: 1.5,
        })
      }

      // hero label
      if (document.querySelector('.slide-hero-mainpage .title__label')) {
        gsap.fromTo(
          '.slide-hero-mainpage .title__label',
          {
            yPercent: 46,
            xPercent: 70,
            rotation: -5.43,
          },
          {
            yPercent: 28,
            xPercent: 60,
            rotation: -5.43,
            duration: 1,
            delay: 0.5,
          }
        )
      }

      // hero control
      if (document.querySelector('.hero-mainpage__control')) {
        gsap.fromTo(
          '.hero-mainpage__control',
          {
            yPercent: 25,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.5,
            delay: 1,
          }
        )
      }

      // hero fraction
      if (document.querySelector('.hero-mainpage__fraction')) {
        gsap.fromTo(
          '.hero-mainpage__fraction',
          {
            yPercent: 100,
          },
          {
            yPercent: 0,
            duration: 1.5,
            delay: 1,
          }
        )
      }

      // hero outer wheel
      if (document.querySelector('.carousel-hero-mainpage__wheel_outer')) {
        gsap.fromTo(
          '.carousel-hero-mainpage__wheel_outer',
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1.5,
            delay: 1,
          }
        )
      }

      // hero inner wheel
      if (document.querySelector('.carousel-hero-mainpage__wheel_inner')) {
        gsap.fromTo(
          '.carousel-hero-mainpage__wheel_inner',
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1.5,
            delay: 1,
          }
        )
      }

      // hero images
      if (document.querySelector('.carousel-hero-mainpage__items')) {
        gsap.fromTo(
          '.carousel-hero-mainpage__items',
          {
            xPercent: -100,
            rotation: -18,
          },
          {
            xPercent: 0,
            rotation: 2,
            duration: 1.5,
            delay: 1.5,
          }
        )
      }

      // hero socials
      gsap.fromTo(
        '.hero-mainpage__socials',
        {
          xPercent: 100,
        },
        {
          xPercent: 0,
          duration: 1.3,
          delay: 0.5,
        }
      )

      // header
      gsap.fromTo(
        '.header',
        {
          yPercent: -100,
        },
        {
          yPercent: 0,
          duration: 1.3,
          delay: 0.5,
        }
      )

      // aside
      gsap.fromTo(
        '.fascia',
        {
          xPercent: 100,
        },
        {
          xPercent: 0,
          duration: 1.3,
          delay: 0.5,
        }
      )
    })
  }
})
