function map(n) {
  ymaps.ready(init)
  function init() {
    // creating a map

    var myMap = new ymaps.Map(document.getElementById('map'), {
      // map center coordinates. the default order is "latitude, longitude". in order not to determine the coordinates of the center of the map manually, use the coordinate detection tool
      controls: [],
      center: [55.755687818523924, 37.64346625079441],
      // zoom level. valid values: from 0 (worldwide) to 19
      zoom: 11,
    })

    let myPlacemark1 = new ymaps.Placemark(
      [55.67123072767407, 37.50551741758336],
      {},
      {
        // options
        //balloonContentHeader: 'Mistoun',
        //balloonContentBody: 'Москва, Николоямская 40с1',
        //balloonContentFooter: '+ 7(495) 507-54 - 90',
        //hasBalloon: true,
        //hideIconOnBalloonOpen: true,
        // hasBalloon: false,
        // hideIconOnBalloonOpen: false,
        // layout type
        iconLayout: 'default#image',
        // label icon image
        iconImageHref: 'img/icons/map/mark-red.svg',
        // icons size
        iconImageSize: [42, 60],
        // offset of the upper left corner of the icon relative to its 'leg' (anchor point)
        iconImageOffset: [-21, -30],
        // offset of the content layer relative to the image layer
        // iconContentOffset: [0, 0],
      }
    )
    let myPlacemark2 = new ymaps.Placemark(
      [55.69134317354648, 37.48138167827944],
      {},
      {
        // options
        //balloonContentHeader: 'Mistoun',
        //balloonContentBody: 'Москва, Николоямская 40с1',
        //balloonContentFooter: '+ 7(495) 507-54 - 90',
        //hasBalloon: true,
        //hideIconOnBalloonOpen: true,
        // hasBalloon: false,
        // hideIconOnBalloonOpen: false,
        // layout type
        iconLayout: 'default#image',
        // label icon image
        iconImageHref: 'img/icons/map/mark-purple.svg',
        // icons size
        iconImageSize: [42, 60],
        // offset of the upper left corner of the icon relative to its 'leg' (anchor point)
        iconImageOffset: [-21, -30],
        // offset of the content layer relative to the image layer
        // iconContentOffset: [0, 0],
      }
    )
    let myPlacemark3 = new ymaps.Placemark(
      [55.711783186842176, 37.477266469110376],
      {},
      {
        // options
        //balloonContentHeader: 'Mistoun',
        //balloonContentBody: 'Москва, Николоямская 40с1',
        //balloonContentFooter: '+ 7(495) 507-54 - 90',
        //hasBalloon: true,
        //hideIconOnBalloonOpen: true,
        // hasBalloon: false,
        // hideIconOnBalloonOpen: false,
        // layout type
        iconLayout: 'default#image',
        // label icon image
        iconImageHref: 'img/icons/map/mark-orange.svg',
        // icons size
        iconImageSize: [42, 60],
        // offset of the upper left corner of the icon relative to its 'leg' (anchor point)
        iconImageOffset: [-21, -30],
        // offset of the content layer relative to the image layer
        // iconContentOffset: [0, 0],
      }
    )
    myMap.controls.remove('geolocationControl')
    myMap.controls.remove('searchControl')
    myMap.controls.remove('trafficControl')
    myMap.controls.remove('typeSelector')
    myMap.controls.remove('fullscreenControl')
    // myMap.controls.remove('zoomControl')
    myMap.controls.remove('rulerControl')

    myMap.geoObjects.add(myPlacemark1)
    myMap.geoObjects.add(myPlacemark2)
    myMap.geoObjects.add(myPlacemark3)
    // myMap.behaviors.disable('scrollZoom')
    // myMap.behaviors.disable('drag')
  }
}
map()
