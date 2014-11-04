# Super simple webcam snapshots #


- ``` Camera.init({ /* options object */ }); ```
     ```
    Example Config
    {
        height: 320,
        width: 240,
        rootEle: #my-camera
        canvas: #my-canvas
    }
```

    ####Options object takes in:####
    	- height: video camera height. also canvas height if you don't provide your own canvas element.
    	- width: video camera width. also canvas width if you don't provide your own canvas element.
    	- rootEle: element selector you want the video element to appear in.
    	- canvas: optional element selector. pass if you want to write to your own user defined canvas element.


- ``` Camera.snapshot( /* optional callback */); ```

    - Takes a snapshot and writes it to the canvas object. Optional callback gets passed the data-uri of the image.
```
Camera.snapshot(function(data_uri_string) {
    ... do something with data_uri ...
});
```

- ``` Camera.getURI() ```

    - Returns the data uri for the currently taken photo.