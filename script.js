document.addEventListener("DOMContentLoaded", () => {
  const upload = document.getElementById("upload");
  const photoCanvas = document.getElementById("photoCanvas");
  const ctx = photoCanvas.getContext("2d");


  const brightness = document.getElementById("brightness");
  const contrast = document.getElementById("contrast");
  const grayscale = document.getElementById("grayscale");

  const rotateOptions = document.querySelectorAll(".rotate button");

  document
    .getElementById("cropCustom")
    .addEventListener("click", cropCustomSize);
  document
    .getElementById("cropPassport")
    .addEventListener("click", cropToRatio);

  // =====CROP RATIO=====

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

  // ====custom Crop====

  function cropCustomSize() {
    let customWidth = parseInt(prompt("Enter custom width in pixels:", "300"));
    let customHeight = parseInt(
      prompt("Enter custom height in pixels:", "400")
    );
    let cropX = (image.width - customWidth) / 2;
    let cropY = (image.height - customHeight) / 2;
    cropImage(customWidth, customHeight, cropX, cropY);
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
    photoCanvas.width = width;
    photoCanvas.height = height;
    ctx.drawImage(croppedCanvas, 0, 0);
  }

  let image = new Image();
  let rotate = 0,
    flipHorizontal = 1,
    flipVertical = 1;

  upload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      image.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });

  image.onload = () => {
    photoCanvas.width = image.width;
    photoCanvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  };

  const applyFilters = () => {
    ctx.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
    ctx.filter = `
            brightness(${brightness.value}%)
            contrast(${contrast.value}%)
            grayscale(${grayscale.value}%)
        `;
    ctx.drawImage(image, 0, 0);
  };

  brightness.addEventListener("input", applyFilters);
  contrast.addEventListener("input", applyFilters);
  grayscale.addEventListener("input", applyFilters);

  rotateOptions.forEach((option) => {
    option.addEventListener("click", () => {
      if (option.id === "left") {
        rotate -= 90;
      } else if (option.id === "right") {
        rotate += 90;
      } else if (option.id === "horizontal") {
        flipHorizontal = flipHorizontal === 1 ? -1 : 1;
      } else {
        flipVertical = flipVertical === 1 ? -1 : 1;
      }
      applyFilters();
    });
  });

  // ===Text and Date Add ===

  document.getElementById("addText").addEventListener("click", () => {
    let name = document.getElementById("nameInput").value;
    let date = document.getElementById("dateInput").value;
    ctx.drawImage(image, 0, 0);
    ctx.font = "40px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(name, 10, photoCanvas.height - 30);
    ctx.fillText(date, 10, photoCanvas.height - 10);
  });
});


let toggle = () => {

  let element = document.getElementById("button");
  let hidden = element.getAttribute("hidden");

  if (hidden) {
     element.removeAttribute("hidden");
  } else {
     element.setAttribute("hidden", "hidden");
  }
}


let togglebtn = () => {

  let element = document.getElementById("button1");
  let hidden = element.getAttribute("hidden");

  if (hidden) {
     element.removeAttribute("hidden");
  } else {
     element.setAttribute("hidden", "hidden");
  }
}