document.addEventListener("DOMContentLoaded", () => {
  const upload = document.getElementById("upload");
  const photoCanvas = document.getElementById("photoCanvas");
  const ctx = photoCanvas.getContext("2d");

  const brightness = document.getElementById("brightness");
  const contrast = document.getElementById("contrast");
  const grayscale = document.getElementById("grayscale");
  const saturation = document.getElementById("saturation");
  const sharpness = document.getElementById("sharpness");
  const redeye = document.getElementById("redeye");
  const colorBalance = document.getElementById("colorBalance");

  const rotateOptions = document.querySelectorAll(".rotate button");

  // document
  //   .getElementById("cropCustom")
  //   .addEventListener("click", cropCustomSize);
  // document
  //   .getElementById("cropPassport")
  //   .addEventListener("click", cropToRatio);

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
    image.src = croppedCanvas.toDataURL(); // Update the original image with the cropped one
  }

  // let image = new Image();
  // let rotate = 0,
  //   flipHorizontal = 1,
  //   flipVertical = 1;
  upload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      image.src = e.target.result;
      image.style.display = "block";
      image.onload = () => {
        adjustCanvasSize(image.width, image.height);
        ctx.drawImage(image, 0, 0, photoCanvas.width, photoCanvas.height);
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
      };
    };
    reader.readAsDataURL(file);
  });

  function adjustCanvasSize(imgWidth, imgHeight) {
    const aspectRatio = 3 / 4;
    if (imgWidth / imgHeight > aspectRatio) {
      photoCanvas.width = imgHeight * aspectRatio;
      photoCanvas.height = imgHeight;
    } else {
      photoCanvas.width = imgWidth;
      photoCanvas.height = imgWidth / aspectRatio;
    }
  }

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

 
});

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

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("open");
}

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
  const labels = document.querySelectorAll("#myLabel, #myLabel1, #myLabel2, #myLabel3, #myLabel4, #myLabel5");
  labels.forEach((label) => {
    label.style.display = "none";
  });
}

// ===== ROTATE AND FLIP=====
const photoCanvas = document.getElementById("photoCanvas");
const ctx = photoCanvas.getContext("2d");
const upload = document.getElementById("upload");
const copiesContainer = document.getElementById("copies");
const copyCountInput = document.getElementById("copyCount");
const cropButton = document.getElementById("cropButton");
const image = document.getElementById("image");
const confirmCropButton = document.getElementById("confirmCrop");

const removeBgButton = document.getElementById("removeBgButton");
const bgColorSelector = document.getElementById("backgroundColorSelector");
const bgColorInput = document.getElementById("bgColor");
const applyBgColorButton = document.getElementById("applyBgColor");

let originalImageData;

let cropper;
let currentRotation = 0;
let flippedHorizontal = false;
let flippedVertical = false;

upload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
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
    };
  };
  reader.readAsDataURL(file);
});

removeBgButton.addEventListener("click", async () => {
  if (!upload.files.length) return;

  const file = upload.files[0];
  const formData = new FormData();
  formData.append("image_file", file);
  formData.append("size", "auto");

  const apikey = "ohpRYQcMRh3QMmre5TrR1Vsc";
  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": "ohpRYQcMRh3QMmre5TrR1Vsc",
    },
    body: formData,
  });

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
  };
});

applyBgColorButton.addEventListener("click", () => {
  const bgColor = bgColorInput.value;
  const imageData = ctx.getImageData(
    0,
    0,
    photoCanvas.width,
    photoCanvas.height
  );
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) {
      // Transparent pixel
      data[i] = parseInt(bgColor.slice(1, 3), 16); // R
      data[i + 1] = parseInt(bgColor.slice(3, 5), 16); // G
      data[i + 2] = parseInt(bgColor.slice(5, 7), 16); // B
      data[i + 3] = 255; // A
    }
  }
  ctx.putImageData(imageData, 0, 0);
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
}


document.getElementById("addText").addEventListener("click", () => {
  let name = document.getElementById("nameInput").value;
  let date = document.getElementById("dateInput").value;

  // Draw white strip
  ctx.fillStyle = "white";
  ctx.fillRect(0, photoCanvas.height - 60, photoCanvas.width, 60);

  // Set font style
  ctx.font = "bold 35px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Calculate text position
  const centerX = photoCanvas.width / 2;
  const textY = photoCanvas.height - 45;

  // Draw text centered
  ctx.fillText(name, centerX, textY - 10);
  ctx.fillText(date, centerX, textY + 25);
  hideLabels();
});



//  // ===Text and Date Add ===
//  document.getElementById("addText").addEventListener("click", () => {
//   let name = document.getElementById("nameInput").value;
//   let date = document.getElementById("dateInput").value;

//   // Draw white strip
//   ctx.fillStyle = "white";
//   ctx.fillRect(0, photoCanvas.height - 60, photoCanvas.width - 50, 100);

//   // Draw text
//   ctx.font = "bold 40px Arial";
//   ctx.fillStyle = "black";
//   ctx.fillText(name, 300, photoCanvas.height - 30);
//   ctx.fillText(date, 300, photoCanvas.height);
// });

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
  ctx.drawImage(croppedCanvas, 0, 0);
  cropper.destroy();
  confirmCropButton.style.display = "none";
  hideLabels();
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
            .copied-image { margin: 10px; border: 1px solid #ccc; width: 65px; height: 100px; }
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

// function printImages() {
//   if (copiesContainer.children.length === 0) {
//     alert("No images to print.");
//     return;
//   }

//   const printWindow = window.open("", "", "height=600,width=800");
//   const styles = `
//         <style>
//             body { margin: 0; padding: 20px; }
//             .print-container { display: flex; flex-wrap: wrap; }
//             .copied-image { margin: 10px; border: 1px solid #ccc; max-width: 100px; max-height: 100px; }
//         </style>
//     `;
//   const content = `
//         <html>
//         <head>
//             ${styles}
//         </head>
//         <body>
//             <div class="print-container">
//                 ${Array.from(copiesContainer.children)
//                   .map(
//                     (child) => `<img src="${child.src}" class="copied-image">`
//                   )
//                   .join("")}
//             </div>
//         </body>
//         </html>
//     `;
//   printWindow.document.write(content);
//   printWindow.document.close();
//   printWindow.focus();
//   printWindow.print();
// }



// // Existing code...

// document.addEventListener("DOMContentLoaded", () => {
//   //... your existing code

//   function toggleSectionVisibility() {
//     // Hide all labels and sections
//     document.getElementById("myLabel").style.display = "none";
//     document.getElementById("myLabel1").style.display = "none";
//     document.getElementById("myLabel2").style.display = "none";
//     document.getElementById("myLabel3").style.display = "none";
//     document.getElementById("myLabel4").style.display = "none";
//     document.getElementById("myLabel5").style.display = "none";

//     // Re-show necessary sections for editing tools, custom photo, etc.
//     document.getElementById("rotationSection").style.display = "block";
//     document.getElementById("editingToolsSection").style.display = "block";
//     document.getElementById("customPhotoSection").style.display = "block";
//     document.getElementById("nameDateSection").style.display = "block";
//     document.getElementById("backgroundMinSection").style.display = "block";
//     document.getElementById("copiesSection").style.display = "block";
//   }

//   // Use this function where necessary
//   cropButton.addEventListener("click", () => {
//     //... existing cropper initialization code

//     // Hide other sections once cropping is done
//     cropper.on("cropend", () => {
//       toggleSectionVisibility();
//     });
//   });

//   confirmCropButton.addEventListener("click", () => {
//     //... existing crop confirmation code

//     // Call toggleSectionVisibility to reset UI after cropping
//     toggleSectionVisibility();
//   });

//   // Similarly, you can call toggleSectionVisibility after other actions, like flipping, rotating, etc.
//   rotateLeftButton.addEventListener("click", () => {
//     rotateLeft();
//     toggleSectionVisibility();
//   });

//   rotateRightButton.addEventListener("click", () => {
//     rotateRight();
//     toggleSectionVisibility();
//   });

//   flipHorizontal.addEventListener("click", () => {
//     flipHorizontal();
//     toggleSectionVisibility();
//   });

//   flipVertical.addEventListener("click", () => {
//     flipVertical();
//     toggleSectionVisibility();
//   });

//   //... other event listeners

//   // Finally, call toggleSectionVisibility initially to set the correct visibility on page load
//   toggleSectionVisibility();
// });
