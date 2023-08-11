import LazyLoad from 'vanilla-lazyload'

// launch ======================================================================

const lazyMedia = new LazyLoad({
  elements_selector: '[data-src],[data-srcset]',
  class_loaded: '_lazy-loaded',
  use_native: true,
})

// module update
//lazyMedia.update();
