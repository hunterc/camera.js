;(function(window, console) {
	'use strict';

	var Camera = (function() {
		var config = {
			width: 640,
			height: 480,
			rootEle: null,
			canvas: null
		};

		var canvas,
			context,
			video,
			canvasHeight,
			canvasWidth;

		var createDom = function(rootEle) {
			if (rootEle) {
				// see if they gave us a canvas to write to
				canvas = document.querySelector(config.canvas);
				if (canvas) {
					canvasHeight = canvas.height;
					canvasWidth = canvas.width;
				} else {
					canvas = document.createElement('canvas');
					canvasHeight = canvas.height = config.height;
					canvasWidth = canvas.width = config.width;
				}
				
				var fragment = document.createDocumentFragment();
				context = canvas.getContext('2d'),
				video = document.createElement('video');

				video.height = config.height;
				video.width = config.width;

				fragment.appendChild(video);

				document.querySelector(rootEle).appendChild(fragment);
			} else {
				console.error('Invalid DOM ID passed to Camera config...');
			}
		};

		var getDataURI = function(canvas) {
			return canvas.toDataURL('image/jpeg');
		};

		var _extend = function(base, options) {
			options = options || function() {};
			var opts = Object.keys(options);
			opts.forEach(function(op) {
				base[op] = options[op];
			});
			return base;
		};

		return {
			init: function(options) {
				// merge options and config
				_extend(config, options);

				navigator.getUserMedia = ( navigator.getUserMedia ||
                   navigator.webkitGetUserMedia ||
                   navigator.mozGetUserMedia ||
                   navigator.msGetUserMedia);

				if (navigator.getUserMedia) {
					createDom(config.rootEle);

					navigator.getUserMedia (

						// constraints
						{ video: true },

						// successCallback
						function(localMediaStream) {
							// video set in createDom call
							video.src = window.URL.createObjectURL(localMediaStream);
							video.play();
						},

						// errorCallback
						function(err) {
							console.error('The following error occured: ' + err);
						}
					);
				} else {
				   console.error('getUserMedia not supported');
				}
			},

			// writes to canvas
			snapshot: function(callback) {
				callback = callback || function() {};
				context.drawImage(video, 0, 0, canvasWidth, canvasHeight);
				callback(getDataURI(canvas));
			},

			resume: function() {
				video.play();
			},

			pause: function() {
				video.pause();
			},

			// converts canvas to data-uri -> uri string
			getURI: getDataURI
		};
	});

	window.Camera = new Camera();
	
})(window, window.console);