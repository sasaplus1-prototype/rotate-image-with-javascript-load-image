(function(){

  'use strict';

  var file = document.getElementById('js-file'),
      image = document.getElementById('js-image');

  file.addEventListener('change', function(event) {
    Promise
      .resolve()
      .then(function() {
        return new Promise(function(resolve, reject) {
          loadImage.parseMetaData(event.target.files[0], function(data) {
            resolve(
              (data.exif) ? data.exif.get('Orientation') : null
            );
          });
        });
      })
      .then(function(orientation) {
        return new Promise(function(resolve, reject) {
          loadImage(event.target.files[0], function(result) {
            if (result.type === 'error') {
              reject();
            } else {
              resolve(result);
            }
          }, {
            canvas: true,
            orientation: orientation
          });
        });
      })
      .then(function(result) {
        image.src = result.toDataURL();
      })
      .catch(function(err) {
        console.error(err);
      });
  }, false);

}());
