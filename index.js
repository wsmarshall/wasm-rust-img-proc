import * as wasmImage from "wasm-image-processing";

function setup(event) {
      const fileInput = document.getElementById('image-upload')
      
      fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0]
        const imageUrl = window.URL.createObjectURL(file)
        const image = new Image()
        image.src = imageUrl
        image.addEventListener('load', (loadEvent) => {
          const canvas = document.getElementById('preview')
          canvas.width = image.naturalWidth
          canvas.height = image.naturalHeight
          canvas.getContext('2d').drawImage(
            image,
            0,
            0,
            canvas.width,
            canvas.height
          )
        })
      })

        const shrink_button = document.getElementById('shrink')
        shrink_button.addEventListener('click', function(event) {
            const canvas = document.getElementById('preview')
            const canvas_context = canvas.getContext('2d')
            const img_buffer = canvas_context.getImageData(0, 0, canvas.width, canvas.height).data 

            const output_buffer = wasmImage.shrink_by_half(img_buffer, canvas.width, canvas.height)

            const u8OutputBuffer = new ImageData(
                new Uint8ClampedArray(outputBuffer), canvas.width / 2)
                
                //clear the canvas 
                canvasContext.clearRect(
                0, 0, canvas.width, canvas.height);

                //set canvas size to new smaller dimension
                canvas.width = canvas.width / 2
                canvas.height = canvas.height / 2

                //display new image
                canvasContext.putImageData(u8OutputBuffer, 0, 0)
        })
    }

    if (document.readState !== 'loading') {
      setup()
    } else {
      window.addEventListener('DOMContentLoaded', setup);
    }
