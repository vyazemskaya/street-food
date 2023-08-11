import { isMobile, FLS } from './functions.js'
import { modules } from './modules.js'
import lightGallery from 'lightgallery'

// plugins =====================================================================
// lgZoom, lgAutoplay, lgComment, lgFullscreen, lgHash, lgPager, lgRotate, lgShare, lgThumbnail, lgVideo, lgMediumZoom
// import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.min.js'
//import lgZoom from 'lightgallery/plugins/zoom/lg-zoom.min.js'

// base styles =================================================================
import '@scss/libs/gallery/lightgallery.scss'

// other styles ================================================================
// import '@scss/libs/gallery/lg-thumbnail.scss';
// import '@scss/libs/gallery/lg-video.scss';
// import '@scss/libs/gallery/lg-autoplay.scss';
// import '@scss/libs/gallery/lg-zoom.scss';
// import '@scss/libs/gallery/lg-pager.scss';
// import '@scss/libs/gallery/lg-fullscreen.scss';
// import '@scss/libs/gallery/lg-share.scss';
// import '@scss/libs/gallery/lg-comments.scss';s
// import '@scss/libs/gallery/lg-rotate.scss';
// import '@scss/libs/gallery/lg-medium-zoom.scss';
// import '@scss/libs/gallery/lg-relative-caption.scss';

// all styles ==================================================================
// import '@scss/libs/gallery/lightgallery-bundle.scss';

// launch ======================================================================
const galleries = document.querySelectorAll('[data-gallery]')
if (galleries.length) {
  let galleryItems = []
  galleries.forEach(gallery => {
    galleryItems.push({
      gallery,
      galleryClass: lightGallery(gallery, {
        // plugins: [lgZoom, lgThumbnail],
        licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
        speed: 500,
      }),
    })
  })
  // adding to the modules object
  modules.gallery = galleryItems
}
