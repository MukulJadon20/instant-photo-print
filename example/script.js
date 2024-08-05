document
  .getElementById("photoUpload")
  .addEventListener("change", handlePhotoUpload);
document
  .getElementById("brightness")
  .addEventListener("input", adjustBrightness);
document.getElementById("contrast").addEventListener("input", adjustContrast);
document.getElementById("grayscale").addEventListener("click", applyGrayscale);
document.getElementById("addText").addEventListener("click", addTextToPhoto);
document.getElementById("cropPassport").addEventListener("click", cropToRatio);
document.getElementById("cropCustom").addEventListener("click", cropCustomSize);
document
  .getElementById("optimizePrint")
  .addEventListener("click", optimizeForPrint);
document.getElementById("download").addEventListener("click", downloadPhoto);

let canvas = document.getElementById("photoCanvas");
let ctx = canvas.getContext("2d");
let image = new Image();

function handlePhotoUpload(event) {
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.onload = function (e) {
    image.src = e.target.result;
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
    };
  };
  reader.readAsDataURL(file);
}

function adjustBrightness() {
  let brightness = document.getElementById("brightness").value;
  ctx.filter = `brightness(${brightness}%)`;
  ctx.drawImage(image, 0, 0);
}

function adjustContrast() {
  let contrast = document.getElementById("contrast").value;
  ctx.filter = `contrast(${contrast}%)`;
  ctx.drawImage(image, 0, 0);
}

function applyGrayscale() {
  ctx.filter = "grayscale(100%)";
  ctx.drawImage(image, 0, 0);
}

function addTextToPhoto() {
  let name = document.getElementById("nameInput").value;
  let date = document.getElementById("dateInput").value;
  ctx.drawImage(image, 0, 0);
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(name, 10, canvas.height - 30);
  ctx.fillText(date, 10, canvas.height - 10);
}

function cropToRatio() {
  let targetRatio = 3 / 4;
  let imgRatio = image.width / image.height;
  let cropWidth, cropHeight;

  if (imgRatio > targetRatio) {
    cropHeight = image.height;
    cropWidth = cropHeight * targetRatio;
  } else {
    cropWidth = image.width;
    cropHeight = cropWidth / targetRatio;
  }

  let cropX = (image.width - cropWidth) / 2;
  let cropY = (image.height - cropHeight) / 2;

  cropImage(cropWidth, cropHeight, cropX, cropY);
}

function cropCustomSize() {
  let customWidth = prompt("Enter custom width in pixels:", "300");
  let customHeight = prompt("Enter custom height in pixels:", "400");
  cropImage(customWidth, customHeight, 0, 0);
}

function cropImage(width, height, startX, startY) {
  let croppedCanvas = document.createElement("canvas");
  let croppedCtx = croppedCanvas.getContext("2d");
  croppedCanvas.width = width;
  croppedCanvas.height = height;
  croppedCtx.drawImage(
    image,
    startX,
    startY,
    width,
    height,
    0,
    0,
    width,
    height
  );
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(croppedCanvas, 0, 0);
}

function optimizeForPrint() {
  let printCanvas = document.createElement("canvas");
  let printCtx = printCanvas.getContext("2d");
  let a4Width = 210; // A4 width in mm
  let a4Height = 297; // A4 height in mm
  let dpi = 300; // dots per inch for high-quality print
  let widthInPx = (a4Width / 25.4) * dpi;
  let heightInPx = (a4Height / 25.4) * dpi;

  printCanvas.width = widthInPx;
  printCanvas.height = heightInPx;
  let photosPerRow = Math.floor(widthInPx / canvas.width);
  let photosPerColumn = Math.floor(heightInPx / canvas.height);
  let photoWidth = widthInPx / photosPerRow;
  let photoHeight = canvas.height * (photoWidth / canvas.width);

  for (let row = 0; row < photosPerColumn; row++) {
    for (let col = 0; col < photosPerRow; col++) {
      printCtx.drawImage(
        canvas,
        col * photoWidth,
        row * photoHeight,
        photoWidth,
        photoHeight
      );
    }
  }

  let link = document.createElement("a");
  link.download = "photos.pdf";
  link.href = printCanvas.toDataURL("application/pdf");
  link.click();
}

function downloadPhoto() {
  let link = document.createElement("a");
  link.download = "edited_photo.png";
  link.href = canvas.toDataURL();
  link.click();
}
