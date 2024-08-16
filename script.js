const photoCanvas = document.getElementById("photoCanvas");
const ctx = photoCanvas.getContext("2d", { willReadFrequently: true });
const upload = document.getElementById("upload");
const copiesContainer = document.getElementById("copies");
const copyCountInput = document.getElementById("copyCount");
const cropButton = document.getElementById("cropButton");
// const image = document.getElementById("image");
const confirmCropButton = document.getElementById("confirmCrop");

const removeBgButton = document.getElementById("removeBgButton");
const bgColorSelector = document.getElementById("backgroundColorSelector");
const bgColorInput = document.getElementById("bgColor");
const applyBgColorButton = document.getElementById("applyBgColor");

  const brightness = document.getElementById("brightness");
  const contrast = document.getElementById("contrast");
  const grayscale = document.getElementById("grayscale");
  const saturation = document.getElementById("saturation");
  const sharpness = document.getElementById("sharpness");
  const redeye = document.getElementById("redeye");
  const colorBalance = document.getElementById("colorBalance");

  const rotateOptions = document.querySelectorAll(".rotate button");


  const applyFilters = () => {
    ctx.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
    ctx.filter = `
            brightness(${brightness.value}%)
            contrast(${contrast.value}%)
            grayscale(${grayscale.value}%)
             saturate(${saturation.value}%)
      brightness(${100 + parseInt(sharpness.value)}%)
      contrast(${100 + parseInt(colorBalance.value)}%)
        `;
    ctx.drawImage(image, 0, 0);

    // Apply Red-Eye Reduction (simulated by decreasing red channel intensity)
    if (parseInt(redeye.value) > 0) {
      const imageData = ctx.getImageData(
        0,
        0,
        photoCanvas.width,
        photoCanvas.height
      );
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] - parseInt(redeye.value); // Red channel
      }
      ctx.putImageData(imageData, 0, 0);
    }
    
  };

  brightness.addEventListener("input", applyFilters);
  contrast.addEventListener("input", applyFilters);
  grayscale.addEventListener("input", applyFilters);
  saturation.addEventListener("input", applyFilters);
  sharpness.addEventListener("input", applyFilters);
  redeye.addEventListener("input", applyFilters);
  colorBalance.addEventListener("input", applyFilters);

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






let originalImageData;

let image =new Image();
let cropper;
let currentRotation = 0;
let flippedHorizontal = false;
let flippedVertical = false;

upload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  // Disable the upload input while the image is being processed
  upload.disabled = true;

  reader.onload = (e) => {
    image.src = e.target.result;
    image.style.display = "block";
    image.onload = () => {
      photoCanvas.width = image.width;
      photoCanvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      originalImageData = ctx.getImageData(
        0,
        0,
        photoCanvas.width,
        photoCanvas.height
      );

      if (cropper) {
        cropper.destroy();
      }
      image.style.display = "none";
      // Enable the upload input after the image is loaded
      upload.disabled = false;
    };
  };
  reader.readAsDataURL(file);
});

image.onload = () => {
  photoCanvas.width = image.width;
  photoCanvas.height = image.height;
  applyFilters();
};

// Crop functionality
cropButton.addEventListener("click", () => {
  if (cropper) {
    cropper.destroy();
  }
  cropper = new Cropper(photoCanvas, {
    aspectRatio: NaN,
    viewMode: 1,
  });
  confirmCropButton.style.display = "inline-block";
});

confirmCropButton.addEventListener("click", () => {
  const croppedCanvas = cropper.getCroppedCanvas();
  photoCanvas.width = croppedCanvas.width;
  photoCanvas.height = croppedCanvas.height;
  ctx.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
  ctx.drawImage(croppedCanvas, 0, 0);
  cropper.destroy();
  confirmCropButton.style.display = "none";
  upload.disabled = false; // Re-enable the upload button after cropping

   // Update the image source with the current canvas content
   updateImage();

  hideLabels();
});

// Remove background functionality
removeBgButton.addEventListener("click", async () => {
    if (!image.src) return;

  // Disable buttons while processing
  disableButtons(true);

  // Display a loading text or spinner on the canvas
  ctx.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Loading...", photoCanvas.width / 2, photoCanvas.height / 2);

  // // Convert canvas to file-like object (Blob) if needed
  // let file;
  // if ( image.src) {
  //   file = upload.files[0];
  // } else {
  //   file = await fetch(photoCanvas.toDataURL()).then(res => res.blob());
  // }
   // Convert the current canvas content to a file-like object (Blob)
   const file = await fetch(photoCanvas.toDataURL()).then((res) => res.blob());

  const formData = new FormData();
  formData.append("image_file", file);
  formData.append("size", "auto");

  const apikey = "ohpRYQcMRh3QMmre5TrR1Vsc";
  try {
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apikey,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to remove background");
    }

    const resultBlob = await response.blob();
    const resultUrl = URL.createObjectURL(resultBlob);
    const img = new Image();
    img.src = resultUrl;
    img.onload = () => {
      ctx.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
      photoCanvas.width = img.width;
      photoCanvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      bgColorSelector.style.display = "block";

     // Update the image source with the current canvas content
        updateImage();
    };
  } catch (error) {
    console.error(error);
    ctx.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
    ctx.fillText(
      "Error loading image",
      photoCanvas.width / 2,
      photoCanvas.height / 2
    );
  } finally {
    // Enable buttons after processing
    disableButtons(false);
  }
});

// Apply background color functionality
applyBgColorButton.addEventListener("click", () => {
  // Disable buttons while processing
  disableButtons(true);

  const bgColor = bgColorInput.value;
  const imageData = ctx.getImageData(
    0,
    0,
    photoCanvas.width,
    photoCanvas.height
  );
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) { // Transparent pixel
      data[i] = parseInt(bgColor.slice(1, 3), 16);     // R
      data[i + 1] = parseInt(bgColor.slice(3, 5), 16); // G
      data[i + 2] = parseInt(bgColor.slice(5, 7), 16); // B
      data[i + 3] = 255;                               // A
    }
  }
  ctx.putImageData(imageData, 0, 0);

   // Update the image source with the current canvas content
   updateImage();

  // Enable buttons after processing
  disableButtons(false);
  hideLabels();
});

function drawImage() {
  photoCanvas.width = image.width;
  photoCanvas.height = image.height;
  ctx.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
  ctx.save();
  ctx.translate(photoCanvas.width / 2, photoCanvas.height / 2);
  ctx.rotate((currentRotation * Math.PI) / 180);
  ctx.scale(flippedHorizontal ? -1 : 1, flippedVertical ? -1 : 1);
  ctx.drawImage(image, -image.width / 2, -image.height / 2);
  ctx.restore();
  photoCanvas.style.display = "block";

   // Update the image source with the current canvas content
   updateImage();
}

function updateImage() {
  image.src = photoCanvas.toDataURL();
}

// ADD TEXT NAME AND DATE
document.getElementById("addText").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value;
  const date = document.getElementById("dateInput").value;
  const fontSize = parseInt(document.getElementById("fontSizeInput").value, 10);

  // Clear the area where the name and date will be drawn
  const textAreaHeight = fontSize * 2 + 20; // Height of the text area with some padding
  ctx.clearRect(0, photoCanvas.height - textAreaHeight, photoCanvas.width, textAreaHeight);

  // Draw white strip (background for the text)
  ctx.fillStyle = "white";
  ctx.fillRect(0, photoCanvas.height - textAreaHeight, photoCanvas.width, textAreaHeight);

  // Set font style
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Calculate text position
  const centerX = photoCanvas.width / 2;
  const textY = photoCanvas.height - fontSize - 10;

  // Draw text centered
  ctx.fillText(name, centerX, textY);
  ctx.fillText(date, centerX, textY + fontSize);

    // Update the image source with the current canvas content
    updateImage();

  hideLabels();
});




function resetTransformations() {
  currentRotation = 0;
  flippedHorizontal = false;
  flippedVertical = false;
}

function rotateLeft() {
  currentRotation -= 90;
  drawImage();
}

function rotateRight() {
  currentRotation += 90;
  drawImage();
}

function flipHorizontal() {
  flippedHorizontal = !flippedHorizontal;
  drawImage();
}

function flipVertical() {
  flippedVertical = !flippedVertical;
  drawImage();
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = "edited-photo.png";
  link.href = photoCanvas.toDataURL();
  link.click();
}


// Function to disable or enable buttons
function disableButtons(disable) {
  const buttons = [removeBgButton, applyBgColorButton, confirmCropButton];
  buttons.forEach((btn) => {
    btn.disabled = disable;
  });
}
// Enable cropper and disable upload while cropping
document.getElementById("cropButton").addEventListener("click", () => {
  if (cropper) {
    cropper.destroy();
  }
  cropper = new Cropper(photoCanvas, {
    aspectRatio: NaN,
    viewMode: 1,
  });
  confirmCropButton.style.display = "inline-block";
  upload.disabled = true; // Disable the upload button during cropping
});

function copyImage() {
  const copyCount = parseInt(copyCountInput.value);
  if (image.src && copyCount > 0) {
    copiesContainer.innerHTML = ""; // Clear previous copies
    for (let i = 0; i < copyCount; i++) {
      const copiedImg = new Image();
      copiedImg.src = photoCanvas.toDataURL();
      copiedImg.classList.add("copied-image");
      copiesContainer.appendChild(copiedImg);
    }
  } else {
    alert("Please upload an image and specify a valid number of copies.");
  }
  hideLabels();
}

function printImages() {
  if (copiesContainer.children.length === 0) {
    alert("No images to print.");
    return;
  }

  const printWindow = window.open("", "", "height=600,width=800");
  const styles = `
        <style>
            body { margin: 0; padding: 0; }
            .print-container { display: flex; flex-wrap: wrap; }
            .copied-image { margin: 10px; border: 1px solid #ccc; width: 150px; height: 150px; }
        </style>
    `;
  const content = `
        <html>
        <head>
            ${styles}
        </head>
        <body>
            <div class="print-container">
                ${Array.from(copiesContainer.children)
                  .map(
                    (child) => `<img src="${child.src}" class="copied-image">`
                  )
                  .join("")}
            </div>
        </body>
        </html>
    `;
  printWindow.document.write(content);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}


let toggle = () => {
  let element = document.getElementById("button");
  let hidden = element.getAttribute("hidden");

  if (hidden) {
    element.removeAttribute("hidden");
  } else {
    element.setAttribute("hidden", "hidden");
  }
};

let togglebtn = () => {
  let element = document.getElementById("button1");
  let hidden = element.getAttribute("hidden");

  if (hidden) {
    element.removeAttribute("hidden");
  } else {
    element.setAttribute("hidden", "hidden");
  }
};

// function toggleSidebar() {
//   const sidebar = document.querySelector(".sidebar");
//   sidebar.classList.toggle("open");
// }

function unhideLabel() {
  var label = document.getElementById("myLabel");
  if (label.style.display === "none") {
    label.style.display = "block";
  } else {
    label.style.display = "none";
  }
}

function unhideLabel1() {
  var label = document.getElementById("myLabel1");
  if (label.style.display === "none") {
    label.style.display = "block";
  } else {
    label.style.display = "none";
  }
}

function unhideLabel2() {
  var label = document.getElementById("myLabel2");
  if (label.style.display === "none") {
    label.style.display = "block";
  } else {
    label.style.display = "none";
  }
}

function unhideLabel3() {
  var label = document.getElementById("myLabel3");
  if (label.style.display === "none") {
    label.style.display = "block";
  } else {
    label.style.display = "none";
  }
}

function unhideLabel4() {
  var label = document.getElementById("myLabel4");
  if (label.style.display === "none") {
    label.style.display = "block";
  } else {
    label.style.display = "none";
  }
}

function unhideLabel5() {
  var label = document.getElementById("myLabel5");
  if (label.style.display === "none") {
    label.style.display = "block";
  } else {
    label.style.display = "none";
  }
}

function hideLabels() {
  const labels = document.querySelectorAll(
    "#myLabel, #myLabel1, #myLabel2, #myLabel3, #myLabel4, #myLabel5"
  );
  labels.forEach((label) => {
    label.style.display = "none";
  });
}

function unhideTools() {
  var label = document.getElementById("myLabel6");
  if (label.style.display === "none") {
    label.style.display = "block";
  } else {
    label.style.display = "none";
  }
}

function unhideRotate() {
  var label = document.getElementById("myLabel7");
  if (label.style.display === "none") {
    label.style.display = "block";
  } else {
    label.style.display = "none";
  }
}

function  unhideCrop() {
  var label = document.getElementById("myLabel8");
  if (label.style.display === "none") {
    label.style.display = "block";
  } else {
    label.style.display = "none";
  }
}

function unhideMin() {
  var label = document.getElementById("myLabel10");
  if (label.style.display === "none") {
    label.style.display = "block";
  } else {
    label.style.display = "none";
  }
}

function unhideCopy() {
  var label = document.getElementById("myLabel11");
  if (label.style.display === "none") {
    label.style.display = "block";
  } else {
    label.style.display = "none";
  }
}

function unhideText()  {
  var label = document.getElementById("myLabel9");
  if (label.style.display === "none") {
    label.style.display = "block";
  } else {
    label.style.display = "none";
  }
}

document.getElementById("rotateFlipBtn").addEventListener("click", () => {
  document.getElementById("myLabel2").style.display = "block";
});

document.getElementById("editingToolsBtn").addEventListener("click", () => {
  document.getElementById("myLabel4").style.display = "block";
});

// document.getElementById("customPhotoBtn").addEventListener("click", () => {
//   document.getElementById("myLabel").style.display = "block";
// });





document.getElementById("copiesBtn").addEventListener("click", () => {
  document.getElementById("myLabel3").style.display = "block";
});

document.getElementById("printLayoutBtn").addEventListener("click", () => {
  printImages();
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  downloadImage();
});