const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const image = document.getElementById('image');

const cropButton = document.getElementById('cropButton');
const confirmCropButton = document.getElementById('confirmCrop');

let cropper;

upload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        image.src = e.target.result;
        image.style.display = 'block';
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            if (cropper) {
                cropper.destroy();
            }
            image.style.display = 'none';
        };
    };
    reader.readAsDataURL(file);
});

cropButton.addEventListener('click', () => {
    if (cropper) {
        cropper.destroy();
    }
    cropper = new Cropper(canvas, {
        aspectRatio: NaN,
        viewMode: 1,
    });
    confirmCropButton.style.display = 'inline-block';
});

confirmCropButton.addEventListener('click', () => {
    const croppedCanvas = cropper.getCroppedCanvas();
    canvas.width = croppedCanvas.width;
    canvas.height = croppedCanvas.height;
    ctx.drawImage(croppedCanvas, 0, 0);
    cropper.destroy();
    confirmCropButton.style.display = 'none';
});
