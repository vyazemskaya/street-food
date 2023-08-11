import { modules } from './modules.js'

// =============================================================================
// main utilities
// =============================================================================

// webp check
export function isWebp() {
  function testWebP(callback) {
    let webP = new Image()
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2)
    }
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }
  testWebP(function (support) {
    let className = support === true ? 'webp' : 'no-webp'
    document.documentElement.classList.add(className)
  })
}

// is mobile
export let isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i)
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i)
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i)
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i)
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    )
  },
}

// add touch class
export function addTouchClass() {
  if (isMobile.any()) document.documentElement.classList.add('touch')
}

// add loaded class
export function addLoadedClass() {
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.documentElement.classList.add('loaded')
    }, 0)
  })
}

// get hash
export function getHash() {
  if (location.hash) {
    return location.hash.replace('#', '')
  }
}

// set hash
export function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0]
  history.pushState('', '', hash)
}

// floating panel
export function fullVHfix() {
  const fullScreens = document.querySelectorAll('[data-fullscreen]')
  if (fullScreens.length && isMobile.any()) {
    window.addEventListener('resize', fixHeight)
    function fixHeight() {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    fixHeight()
  }
}

// smooth behavior ============================================================
export let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide')
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = `${target.offsetHeight}px`
    target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = showmore ? `${showmore}px` : `0px`
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false
      !showmore ? target.style.removeProperty('height') : null
      target.style.removeProperty('padding-top')
      target.style.removeProperty('padding-bottom')
      target.style.removeProperty('margin-top')
      target.style.removeProperty('margin-bottom')
      !showmore ? target.style.removeProperty('overflow') : null
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      target.classList.remove('_slide')
      // create event
      document.dispatchEvent(
        new CustomEvent('slideUpDone', {
          detail: {
            target: target,
          },
        })
      )
    }, duration)
  }
}
export let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide')
    target.hidden = target.hidden ? false : null
    showmore ? target.style.removeProperty('height') : null
    let height = target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = showmore ? `${showmore}px` : `0px`
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    target.offsetHeight
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = height + 'px'
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
    window.setTimeout(() => {
      target.style.removeProperty('height')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      target.classList.remove('_slide')
      // create event
      document.dispatchEvent(
        new CustomEvent('slideDownDone', {
          detail: {
            target: target,
          },
        })
      )
    }, duration)
  }
}
export let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration)
  } else {
    return _slideUp(target, duration)
  }
}

// scroll block ================================================================
export let bodyLockStatus = true
export let bodyLockToggle = (delay = 500) => {
  if (document.documentElement.classList.contains('lock')) {
    bodyUnlock(delay)
  } else {
    bodyLock(delay)
  }
}
export let bodyUnlock = (delay = 500) => {
  let body = document.querySelector('body')
  if (bodyLockStatus) {
    let lock_padding = document.querySelectorAll('[data-lp]')
    setTimeout(() => {
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index]
        el.style.paddingRight = '0px'
      }
      body.style.paddingRight = '0px'
      document.documentElement.classList.remove('lock')
    }, delay)
    bodyLockStatus = false
    setTimeout(function () {
      bodyLockStatus = true
    }, delay)
  }
}
export let bodyLock = (delay = 500) => {
  let body = document.querySelector('body')
  if (bodyLockStatus) {
    let lock_padding = document.querySelectorAll('[data-lp]')
    for (let index = 0; index < lock_padding.length; index++) {
      const el = lock_padding[index]
      el.style.paddingRight =
        window.innerWidth -
        document.querySelector('.wrapper').offsetWidth +
        'px'
    }
    body.style.paddingRight =
      window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
    document.documentElement.classList.add('lock')

    bodyLockStatus = false
    setTimeout(function () {
      bodyLockStatus = true
    }, delay)
  }
}

// spoilers ====================================================================
export function spoilers() {
  const spoilersArray = document.querySelectorAll('[data-spoilers]')
  if (spoilersArray.length > 0) {
    // get regular spoilers
    const spoilersRegular = Array.from(spoilersArray).filter(function (
      item,
      index,
      self
    ) {
      return !item.dataset.spoilers.split(',')[0]
    })
    // regular spoilers initialization
    if (spoilersRegular.length) {
      initSpoilers(spoilersRegular)
    }
    // get spoilers with media queries
    let mdQueriesArray = dataMediaQueries(spoilersArray, 'spoilers')
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach(mdQueriesItem => {
        // event
        mdQueriesItem.matchMedia.addEventListener('change', function () {
          initSpoilers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
        })
        initSpoilers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
      })
    }
    // initialization
    function initSpoilers(spoilersArray, matchMedia = false) {
      spoilersArray.forEach(spoilersBlock => {
        spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock
        if (matchMedia.matches || !matchMedia) {
          spoilersBlock.classList.add('_spoiler-init')
          initSpoilerBody(spoilersBlock)
          spoilersBlock.addEventListener('click', setSpoilerAction)
        } else {
          spoilersBlock.classList.remove('_spoiler-init')
          initSpoilerBody(spoilersBlock, false)
          spoilersBlock.removeEventListener('click', setSpoilerAction)
        }
      })
    }
    // content
    function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
      let spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]')
      if (spoilerTitles.length) {
        spoilerTitles = Array.from(spoilerTitles).filter(
          item => item.closest('[data-spoilers]') === spoilersBlock
        )
        spoilerTitles.forEach(spoilerTitle => {
          if (hideSpoilerBody) {
            spoilerTitle.removeAttribute('tabindex')
            if (!spoilerTitle.classList.contains('_spoiler-active')) {
              spoilerTitle.nextElementSibling.hidden = true
            }
          } else {
            spoilerTitle.setAttribute('tabindex', '-1')
            spoilerTitle.nextElementSibling.hidden = false
          }
        })
      }
    }
    function setSpoilerAction(e) {
      const el = e.target
      if (el.closest('[data-spoiler]')) {
        const spoilerTitle = el.closest('[data-spoiler]')
        const spoilersBlock = spoilerTitle.closest('[data-spoilers]')
        const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler')
        const spoilerSpeed = spoilersBlock.dataset.spoilersSpeed
          ? parseInt(spoilersBlock.dataset.spoilersSpeed)
          : 500
        if (!spoilersBlock.querySelectorAll('._slide').length) {
          if (
            oneSpoiler &&
            !spoilerTitle.classList.contains('_spoiler-active')
          ) {
            hideSpoilersBody(spoilersBlock)
          }
          spoilerTitle.classList.toggle('_spoiler-active')
          _slideToggle(spoilerTitle.nextElementSibling, spoilerSpeed)
        }
        e.preventDefault()
      }
    }
    function hideSpoilersBody(spoilersBlock) {
      const spoilerActiveTitle = spoilersBlock.querySelector(
        '[data-spoiler]._spoiler-active'
      )
      const spoilerSpeed = spoilersBlock.dataset.spoilersSpeed
        ? parseInt(spoilersBlock.dataset.spoilersSpeed)
        : 500
      if (
        spoilerActiveTitle &&
        !spoilersBlock.querySelectorAll('._slide').length
      ) {
        spoilerActiveTitle.classList.remove('_spoiler-active')
        _slideUp(spoilerActiveTitle.nextElementSibling, spoilerSpeed)
      }
    }
    // closing on click outside the spoiler
    const spoilersClose = document.querySelectorAll('[data-spoiler-close]')
    if (spoilersClose.length) {
      document.addEventListener('click', function (e) {
        const el = e.target
        if (!el.closest('[data-spoilers]')) {
          spoilersClose.forEach(spoilerClose => {
            const spoilersBlock = spoilerClose.closest('[data-spoilers]')
            const spoilerSpeed = spollersBlock.dataset.spoilersSpeed
              ? parseInt(spoilersBlock.dataset.spoilersSpeed)
              : 500
            spoilerClose.classList.remove('_spoiler-active')
            _slideUp(spoilerClose.nextElementSibling, spoilerSpeed)
          })
        }
      })
    }
  }
}

// tabs ========================================================================
export function tabs() {
  const tabs = document.querySelectorAll('[data-tabs]')
  let tabsActiveHash = []

  if (tabs.length > 0) {
    const hash = getHash()
    if (hash && hash.startsWith('tab-')) {
      tabsActiveHash = hash.replace('tab-', '').split('-')
    }
    tabs.forEach((tabsBlock, index) => {
      tabsBlock.classList.add('_tab-init')
      tabsBlock.setAttribute('data-tabs-index', index)
      tabsBlock.addEventListener('click', setTabsAction)
      initTabs(tabsBlock)
    })

    // get spoilers with media queries
    let mdQueriesArray = dataMediaQueries(tabs, 'tabs')
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach(mdQueriesItem => {
        // event
        mdQueriesItem.matchMedia.addEventListener('change', function () {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
        })
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
      })
    }
  }
  // setting title positions
  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach(tabsMediaItem => {
      tabsMediaItem = tabsMediaItem.item
      let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]')
      let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]')
      let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]')
      let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]')
      tabsTitleItems = Array.from(tabsTitleItems).filter(
        item => item.closest('[data-tabs]') === tabsMediaItem
      )
      tabsContentItems = Array.from(tabsContentItems).filter(
        item => item.closest('[data-tabs]') === tabsMediaItem
      )
      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          tabsContent.append(tabsTitleItems[index])
          tabsContent.append(tabsContentItem)
          tabsMediaItem.classList.add('_tab-spoller')
        } else {
          tabsTitles.append(tabsTitleItems[index])
          tabsMediaItem.classList.remove('_tab-spoller')
        }
      })
    })
  }
  // content
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*')
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector(
        '[data-tabs-titles]>._tab-active'
      )
      tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null
    }
    if (tabsContent.length) {
      tabsContent = Array.from(tabsContent).filter(
        item => item.closest('[data-tabs]') === tabsBlock
      )
      tabsTitles = Array.from(tabsTitles).filter(
        item => item.closest('[data-tabs]') === tabsBlock
      )
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute('data-tabs-title', '')
        tabsContentItem.setAttribute('data-tabs-item', '')

        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add('_tab-active')
        }
        tabsContentItem.hidden =
          !tabsTitles[index].classList.contains('_tab-active')
      })
    }
  }
  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]')
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]')
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex
    function isTabsAnamate(tabsBlock) {
      if (tabsBlock.hasAttribute('data-tabs-animate')) {
        return tabsBlock.dataset.tabsAnimate > 0
          ? Number(tabsBlock.dataset.tabsAnimate)
          : 500
      }
    }
    const tabsBlockAnimate = isTabsAnamate(tabsBlock)
    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute('data-tabs-hash')
      tabsContent = Array.from(tabsContent).filter(
        item => item.closest('[data-tabs]') === tabsBlock
      )
      tabsTitles = Array.from(tabsTitles).filter(
        item => item.closest('[data-tabs]') === tabsBlock
      )
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains('_tab-active')) {
          if (tabsBlockAnimate) {
            _slideDown(tabsContentItem, tabsBlockAnimate)
          } else {
            tabsContentItem.hidden = false
          }
          if (isHash && !tabsContentItem.closest('.popup')) {
            setHash(`tab-${tabsBlockIndex}-${index}`)
          }
        } else {
          if (tabsBlockAnimate) {
            _slideUp(tabsContentItem, tabsBlockAnimate)
          } else {
            tabsContentItem.hidden = true
          }
        }
      })
    }
  }
  function setTabsAction(e) {
    const el = e.target
    if (el.closest('[data-tabs-title]')) {
      const tabTitle = el.closest('[data-tabs-title]')
      const tabsBlock = tabTitle.closest('[data-tabs]')
      if (
        !tabTitle.classList.contains('_tab-active') &&
        !tabsBlock.querySelector('._slide')
      ) {
        let tabActiveTitle = tabsBlock.querySelectorAll(
          '[data-tabs-title]._tab-active'
        )
        tabActiveTitle.length
          ? (tabActiveTitle = Array.from(tabActiveTitle).filter(
              item => item.closest('[data-tabs]') === tabsBlock
            ))
          : null
        tabActiveTitle.length
          ? tabActiveTitle[0].classList.remove('_tab-active')
          : null
        tabTitle.classList.add('_tab-active')
        setTabsStatus(tabsBlock)
      }
      e.preventDefault()
    }
  }
}

// menu ========================================================================
export function menuInit() {
  if (document.querySelector('.hamburger')) {
    document.addEventListener('click', function (e) {
      if (bodyLockStatus && e.target.closest('.hamburger')) {
        bodyLockToggle()
        document.documentElement.classList.toggle('menu-open')
      }
    })
  }
}
export function menuOpen() {
  bodyLock()
  document.documentElement.classList.add('menu-open')
}
export function menuClose() {
  bodyUnlock()
  document.documentElement.classList.remove('menu-open')
}

// menu ========================================================================
export function showMore() {
  window.addEventListener('load', function (e) {
    const showMoreBlocks = document.querySelectorAll('[data-showmore]')
    let showMoreBlocksRegular
    let mdQueriesArray
    if (showMoreBlocks.length) {
      // get regular objects
      showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (
        item,
        index,
        self
      ) {
        return !item.dataset.showmoreMedia
      })
      // regular objects initialization
      showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null

      document.addEventListener('click', showMoreActions)
      window.addEventListener('resize', showMoreActions)

      // get objects with media queries
      mdQueriesArray = dataMediaQueries(showMoreBlocks, 'showmoreMedia')
      if (mdQueriesArray && mdQueriesArray.length) {
        mdQueriesArray.forEach(mdQueriesItem => {
          // event
          mdQueriesItem.matchMedia.addEventListener('change', function () {
            initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
          })
        })
        initItemsMedia(mdQueriesArray)
      }
    }
    function initItemsMedia(mdQueriesArray) {
      mdQueriesArray.forEach(mdQueriesItem => {
        initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
      })
    }
    function initItems(showMoreBlocks, matchMedia) {
      showMoreBlocks.forEach(showMoreBlock => {
        initItem(showMoreBlock, matchMedia)
      })
    }
    function initItem(showMoreBlock, matchMedia = false) {
      showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock
      let showMoreContent = showMoreBlock.querySelectorAll(
        '[data-showmore-content]'
      )
      let showMoreButton = showMoreBlock.querySelectorAll(
        '[data-showmore-button]'
      )
      showMoreContent = Array.from(showMoreContent).filter(
        item => item.closest('[data-showmore]') === showMoreBlock
      )[0]
      showMoreButton = Array.from(showMoreButton).filter(
        item => item.closest('[data-showmore]') === showMoreBlock
      )[0]
      const hiddenHeight = getHeight(showMoreBlock, showMoreContent)
      if (matchMedia.matches || !matchMedia) {
        if (hiddenHeight < getOriginalHeight(showMoreContent)) {
          _slideUp(showMoreContent, 0, hiddenHeight)
          showMoreButton.hidden = false
        } else {
          _slideDown(showMoreContent, 0, hiddenHeight)
          showMoreButton.hidden = true
        }
      } else {
        _slideDown(showMoreContent, 0, hiddenHeight)
        showMoreButton.hidden = true
      }
    }
    function getHeight(showMoreBlock, showMoreContent) {
      let hiddenHeight = 0
      const showMoreType = showMoreBlock.dataset.showmore
        ? showMoreBlock.dataset.showmore
        : 'size'
      if (showMoreType === 'items') {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent
          ? showMoreContent.dataset.showmoreContent
          : 3
        const showMoreItems = showMoreContent.children
        for (let index = 1; index < showMoreItems.length; index++) {
          const showMoreItem = showMoreItems[index - 1]
          hiddenHeight += showMoreItem.offsetHeight
          if (index == showMoreTypeValue) break
        }
      } else {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent
          ? showMoreContent.dataset.showmoreContent
          : 150
        hiddenHeight = showMoreTypeValue
      }
      return hiddenHeight
    }
    function getOriginalHeight(showMoreContent) {
      let parentHidden
      let hiddenHeight = showMoreContent.offsetHeight
      showMoreContent.style.removeProperty('height')
      if (showMoreContent.closest(`[hidden]`)) {
        parentHidden = showMoreContent.closest(`[hidden]`)
        parentHidden.hidden = false
      }
      let originalHeight = showMoreContent.offsetHeight
      parentHidden ? (parentHidden.hidden = true) : null
      showMoreContent.style.height = `${hiddenHeight}px`
      return originalHeight
    }
    function showMoreActions(e) {
      const targetEvent = e.target
      const targetType = e.type
      if (targetType === 'click') {
        if (targetEvent.closest('[data-showmore-button]')) {
          const showMoreButton = targetEvent.closest('[data-showmore-button]')
          const showMoreBlock = showMoreButton.closest('[data-showmore]')
          const showMoreContent = showMoreBlock.querySelector(
            '[data-showmore-content]'
          )
          const showMoreSpeed = showMoreBlock.dataset.showmoreButton
            ? showMoreBlock.dataset.showmoreButton
            : '500'
          const hiddenHeight = getHeight(showMoreBlock, showMoreContent)
          if (!showMoreContent.classList.contains('_slide')) {
            showMoreBlock.classList.contains('_showmore-active')
              ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight)
              : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight)
            showMoreBlock.classList.toggle('_showmore-active')
          }
        }
      } else if (targetType === 'resize') {
        showMoreBlocksRegular && showMoreBlocksRegular.length
          ? initItems(showMoreBlocksRegular)
          : null
        mdQueriesArray && mdQueriesArray.length
          ? initItemsMedia(mdQueriesArray)
          : null
      }
    }
  })
}

// =============================================================================
// other utilities
// =============================================================================

// full logging system
export function FLS(message) {
  setTimeout(() => {
    if (window.FLS) {
      console.log(message)
    }
  }, 0)
}

// get digits from string
export function getDigFromString(item) {
  return parseInt(item.replace(/[^\d]/g, ''))
}

// format digits like 100,000,000
export function getDigFormat(item) {
  return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

// remove class from all array elements
export function removeClasses(array, className) {
  for (var i = 0; i < array.length; i++) {
    array[i].classList.remove(className)
  }
}

// array uniqueization
export function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index
  })
}

// get an index within the parent
export function indexInParent(parent, element) {
  const array = Array.prototype.slice.call(parent.children)
  return Array.prototype.indexOf.call(array, element)
}

// processing media requests from attributes
export function dataMediaQueries(array, dataSetValue) {
  // get objects with media queries
  const media = Array.from(array).filter(function (item, index, self) {
    if (item.dataset[dataSetValue]) {
      return item.dataset[dataSetValue].split(',')[0]
    }
  })
  // objects with media queries initialization
  if (media.length) {
    const breakpointsArray = []
    media.forEach(item => {
      const params = item.dataset[dataSetValue]
      const breakpoint = {}
      const paramsArray = params.split(',')
      breakpoint.value = paramsArray[0]
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max'
      breakpoint.item = item
      breakpointsArray.push(breakpoint)
    })
    // get unique breakpoints
    let mdQueries = breakpointsArray.map(function (item) {
      return (
        '(' +
        item.type +
        '-width: ' +
        item.value +
        'px),' +
        item.value +
        ',' +
        item.type
      )
    })
    mdQueries = uniqArray(mdQueries)
    const mdQueriesArray = []

    if (mdQueries.length) {
      // work with every breakpoint
      mdQueries.forEach(breakpoint => {
        const paramsArray = breakpoint.split(',')
        const mediaBreakpoint = paramsArray[1]
        const mediaType = paramsArray[2]
        const matchMedia = window.matchMedia(paramsArray[0])
        // objects with conditions
        const itemsArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true
          }
        })
        mdQueriesArray.push({
          itemsArray,
          matchMedia,
        })
      })
      return mdQueriesArray
    }
  }
}
