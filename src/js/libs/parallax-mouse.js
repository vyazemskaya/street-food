import { isMobile, FLS } from '../files/functions.js'
import { modules } from '../files/modules.js'

// launch ======================================================================
class MousePRLX {
  constructor(props, data = null) {
    let defaultConfig = {
      init: true,
      logging: true,
    }
    this.config = Object.assign(defaultConfig, props)
    if (this.config.init) {
      const paralaxMouse = document.querySelectorAll('[data-prlx-mouse]')
      if (paralaxMouse.length) {
        this.paralaxMouseInit(paralaxMouse)
        this.setLogging(`watching for: (${paralaxMouse.length})`)
      } else {
        this.setLogging('there are no objects to watch')
      }
    }
  }
  paralaxMouseInit(paralaxMouse) {
    paralaxMouse.forEach(el => {
      const paralaxMouseWrapper = el.closest('[data-prlx-mouse-wrapper]')

      const paramСoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 100
      const paramСoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 100
      const directionX = el.hasAttribute('data-prlx-dxr') ? -1 : 1
      const directionY = el.hasAttribute('data-prlx-dyr') ? -1 : 1
      const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 50

      let positionX = 0,
        positionY = 0
      let coordXprocent = 0,
        coordYprocent = 0

      setMouseParallaxStyle()

      if (paralaxMouseWrapper) {
        mouseMoveParalax(paralaxMouseWrapper)
      } else {
        mouseMoveParalax()
      }

      function setMouseParallaxStyle() {
        const distX = coordXprocent - positionX
        const distY = coordYprocent - positionY
        positionX = positionX + (distX * paramAnimation) / 1000
        positionY = positionY + (distY * paramAnimation) / 1000
        el.style.cssText = `transform: translate3D(${
          (directionX * positionX) / (paramСoefficientX / 10)
        }%,${(directionY * positionY) / (paramСoefficientY / 10)}%,0);`
        requestAnimationFrame(setMouseParallaxStyle)
      }
      function mouseMoveParalax(wrapper = window) {
        wrapper.addEventListener('mousemove', function (e) {
          const offsetTop = el.getBoundingClientRect().top + window.scrollY
          if (
            offsetTop >= window.scrollY ||
            offsetTop + el.offsetHeight >= window.scrollY
          ) {
            const parallaxWidth = window.innerWidth
            const parallaxHeight = window.innerHeight
            const coordX = e.clientX - parallaxWidth / 2
            const coordY = e.clientY - parallaxHeight / 2
            coordXprocent = (coordX / parallaxWidth) * 100
            coordYprocent = (coordY / parallaxHeight) * 100
          }
        })
      }
    })
  }
  setLogging(message) {
    this.config.logging ? FLS(`[PRLX Mouse]: ${message}`) : null
  }
}
modules.mousePrlx = new MousePRLX({})
