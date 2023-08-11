import { isMobile, menuClose, getHash, FLS } from '../functions.js'
// import SmoothScroll from 'smooth-scroll';

// launch ======================================================================
export let gotoBlock = (
  targetBlock,
  noHeader = false,
  speed = 500,
  offsetTop = 0
) => {
  const targetBlockElement = document.querySelector(targetBlock)
  if (targetBlockElement) {
    let headerItem = ''
    let headerItemHeight = 0
    if (noHeader) {
      headerItem = 'header.header'
      headerItemHeight = document.querySelector(headerItem).offsetHeight
    }
    let options = {
      speedAsDuration: true,
      speed: speed,
      header: headerItem,
      offset: offsetTop,
      easing: 'easeOutQuad',
    }
    // close menu if it's opened
    document.documentElement.classList.contains('menu-open')
      ? menuClose()
      : null

    if (typeof SmoothScroll !== 'undefined') {
      // scroll with plugin
      new SmoothScroll().animateScroll(targetBlockElement, '', options)
    } else {
      // scroll without plugin
      let targetBlockElementPosition =
        targetBlockElement.getBoundingClientRect().top + scrollY
      targetBlockElementPosition = headerItemHeight
        ? targetBlockElementPosition - headerItemHeight
        : targetBlockElementPosition
      targetBlockElementPosition = offsetTop
        ? targetBlockElementPosition - offsetTop
        : targetBlockElementPosition
      window.scrollTo({
        top: targetBlockElementPosition,
        behavior: 'smooth',
      })
    }
  } else {
    FLS(`[gotoBlock]: ${targetBlock} doesn't exist`)
  }
}
