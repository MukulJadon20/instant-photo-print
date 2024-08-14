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

  // // document
  // //   .getElementById("cropCustom")
  // //   .addEventListener("click", cropCustomSize);
  // // document
  // //   .getElementById("cropPassport")
  // //   .addEventListener("click", cropToRatio);

  // // =====CROP RATIO=====

  // function cropToRatio() {
  //   let targetRatio = 3 / 4;
  //   let imgRatio = image.width / image.height;
  //   let cropWidth, cropHeight;

  //   if (imgRatio > targetRatio) {
  //     cropHeight = image.height;
  //     cropWidth = cropHeight * targetRatio;
  //   } else {
  //     cropWidth = image.width;
  //     cropHeight = cropWidth / targetRatio;
  //   }

  //   let cropX = (image.width - cropWidth) / 2;
  //   let cropY = (image.height - cropHeight) / 2;

  //   cropImage(cropWidth, cropHeight, cropX, cropY);
  // }

  // // ====custom Crop====
  // function cropCustomSize() {
  //   let customWidth = parseInt(prompt("Enter custom width in pixels:", "300"));
  //   let customHeight = parseInt(
  //     prompt("Enter custom height in pixels:", "400")
  //   );
  //   let cropX = (image.width - customWidth) / 2;
  //   let cropY = (image.height - customHeight) / 2;
  //   cropImage(customWidth, customHeight, cropX, cropY);
  // }

  // function cropImage(width, height, startX, startY) {
  //   let croppedCanvas = document.createElement("canvas");
  //   let croppedCtx = croppedCanvas.getContext("2d");
  //   croppedCanvas.width = width;
  //   croppedCanvas.height = height;
  //   croppedCtx.drawImage(
  //     image,
  //     startX,
  //     startY,
  //     width,
  //     height,
  //     0,
  //     0,
  //     width,
  //     height
  //   );
  //   photoCanvas.width = width;
  //   photoCanvas.height = height;
  //   ctx.drawImage(croppedCanvas, 0, 0);
  //   image.src = croppedCanvas.toDataURL(); // Update the original image with the cropped one
  // }

  // let image = new Image();
  // let rotate = 0,
  //   flipHorizontal = 1,
  //   flipVertical = 1;

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
    applyFilters();
  };

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

//   // ===Text and Date Add ===

//   document.getElementById("addText").addEventListener("click", () => {
//     let name = document.getElementById("nameInput").value;
//     let date = document.getElementById("dateInput").value;

//     // Draw white strip
//     ctx.fillStyle = "white";
//     ctx.fillRect(0, photoCanvas.height - 60, photoCanvas.width - 50, 100);

//     // Draw text
//     ctx.font = "bold 40px Arial";
//     ctx.fillStyle = "black";
//     ctx.fillText(name, 300, photoCanvas.height - 30);
//     ctx.fillText(date, 300, photoCanvas.height);
//   });
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


function unhideTools(){
  var label = document.getElementById("myLabel6");
  if (label.style.display === "none") {
    label.style.display = "block";
  } else {
    label.style.display = "none";
  }
}

function unhideRotate(){
  var label = document.getElementById("myLabel7");
  if (label.style.display === "none") {
    label.style.display = "block";
  } else {
    label.style.display = "none";
  }
}

function unhideCopy(){
  var label = document.getElementById("myLabel8");
  if (label.style.display === "none") {
    label.style.display = "block";
  } else {
    label.style.display = "none";
  }
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

const removeBgButton = document.getElementById('removeBgButton');
const bgColorSelector = document.getElementById('backgroundColorSelector');
const bgColorInput = document.getElementById('bgColor');
const applyBgColorButton = document.getElementById('applyBgColor');

let originalImageData;

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
      originalImageData = ctx.getImageData(0, 0, photoCanvas.width, photoCanvas.height);
      
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


removeBgButton.addEventListener('click', async () => {
  if (!upload.files.length) return;

  // Disable buttons while processing
  disableButtons(true);

  const file = upload.files[0];
  const formData = new FormData();
  formData.append('image_file', file);
  formData.append('size', 'auto');

  const apikey='ohpRYQcMRh3QMmre5TrR1Vsc';
  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
          'X-Api-Key': 'ohpRYQcMRh3QMmre5TrR1Vsc'
      },
      body: formData
  });

  const resultBlob = await response.blob();
  const resultUrl = URL.createObjectURL(resultBlob);
  const img = new Image();
  img.src = resultUrl;
  img.onload = () => {
      ctx.clearRect(0, 0, photoCanvas.width,photoCanvas.height);
      photoCanvas.width = img.width;
      photoCanvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      bgColorSelector.style.display = 'block';
  };
  // Enable buttons after processing
  disableButtons(false);
});

applyBgColorButton.addEventListener('click', () => {
   // Disable buttons while processing
   disableButtons(true);
  const bgColor = bgColorInput.value;
  const imageData = ctx.getImageData(0, 0,photoCanvas.width, photoCanvas.height);
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
}


// ADD TEXT NAME AND DATE
document.getElementById("addText").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value;
  const date = document.getElementById("dateInput").value;
  const fontSize = parseInt(document.getElementById("fontSizeInput").value, 10);

  // Draw white strip
  ctx.fillStyle = "white";
  ctx.fillRect(0, photoCanvas.height - fontSize * 2, photoCanvas.width, fontSize * 2);

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
  hideLabels();
});


// // ADD TEXT NAME AND DATE
// document.getElementById("addText").addEventListener("click", () => {
//   let name = document.getElementById("nameInput").value;
//   let date = document.getElementById("dateInput").value;

//   // Draw white strip
//   ctx.fillStyle = "white";
//   ctx.fillRect(0, photoCanvas.height - 60, photoCanvas.width, 60);

//   // Set font style
//   ctx.font = "bold 30px Arial";
//   ctx.fillStyle = "black";
//   ctx.textAlign = "center";
//   ctx.textBaseline = "middle";

//   // Calculate text position
//   const centerX = photoCanvas.width / 2;
//   const textY = photoCanvas.height - 45;

//   // Draw text centered
//   ctx.fillText(name, centerX, textY - 10);
//   ctx.fillText(date, centerX, textY + 25);
//   hideLabels();
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
  upload.disabled = false; // Re-enable the upload button after cropping
  hideLabels();
});

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






// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }

// :root {
//   /* colors */
//   --body-color: #E4E9F7;
//   --sidebar-color: #FFF;
//   --primary-color: #4333ed;
//   --primary-color-light: #6455f1;
//   --toogle-color-: #DDD;
//   --text-color: #707070;

//   /* Transition */
//   --trans-02: all 0.2s ease;
//   --trans-03: all 0.3s ease;
//   --trans-04: all 0.4s ease;
//   --trans-05: all 0.4s ease;
// }

// body {
//   font-family: Arial, sans-serif;
//   background: var(--body-color);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   margin: 0;
// }

// .container {
//   max-width: 400px;
//   width: 80%;
//   background: #fff;
//   padding: 30px;
//   border-radius: 30px;
//   overflow: hidden;
//   margin-left: 100px;
//   position: relative;
// }


// /* ===resuseablecss=== */
// .text-header-text {
//   font-size: 14px;
//   font-weight: 500;
//   padding: 1px 40px;
//   color: purple;
// }

// .image {
//   min-width: 60px;
//   display: flex;
//   align-items: center;
// }

// /* #image{
//   height:350px;
//   width: 350px;
// } */
// /* ===sidebar=== */
// .sidebar {
//   position: fixed;
//   top: 0;
//   left: 0;
//   height: 100%;
//   width: 250px;
//   padding: 1px 14px;
//   background: var(--sidebar-color);
//   overflow: auto;
//   transition: var(--trans-03);
// }

// li {
//   height: 60px;
//   list-style: none;
//   display: flex;
//   align-items: center;
// }

// .icon {
//   display: flex;
//   align-items: center;
//   font-size: 20px;
 
//   min-width: 60px;
// }

// .sidebar header {
//   position: relative;
// }

// .sidebar .image-text img {
//   width: 100px;
//   border-radius: 6px;
//   padding: 10px;
//   margin-left: 50px;
// }

// .sidebar header .image-text {
//   display: flex;
//   align-items: center;
// }

// .header .image-text .header-text {
//   display: flex;
//   flex-direction: column;
// }

// .sidebar .image-text,
// image {
//   max-width: 10px;
//   width: 50px;
//   height: 90px;
//   border-radius: 6px;
// }

// .photo-editor {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// }

// #photoCanvas {
//   border: 1px solid #ccc;
//   margin-top: 20px;
//   max-width: 100%;
// }

// .controls {
//   margin-top: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// }

// .controls label {
//   margin-top: 10px;
// }

// .controls input[type="range"] {
//   width: 200px;
// }

// .controls button {
//   margin-top: 10px;
//   padding: 10px 20px;
//   border: none;
//   background: #007bff;
//   color: #fff;
//   cursor: pointer;
//   border-radius: 5px;
// }

// .controls button:hover {
//   background: #0056b3;
// }

// .display-image {
//   width: 40vw;
//   height: 40vh;
//   margin: 50px;
//   border: 2px solid black;
// }

// /* ===input area=== */
// .icon1 {
//   font-size: 100px;
//   margin-left: 80px;
// }

// .img-area h3 {
//   font-size: 20px;
//   font-weight: 500;
//   margin-bottom: 6px;
//   margin-left: 70px;
// }

// .select-image {
//   display: block;
//   width: 100%;
//   padding: 16px;
//   border-radius: 15px;
//   background: var(--primary-color);
//   color: #fff;
//   font-weight: 500;
//   font-size: 16px;
//   border: none;
//   cursor: pointer;
//   transition: all .3s ease;
// }

// .select-image:hover {
//   background: var(--primary-color-light);
// }

// .label-textName {
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: center;
// }

// #nameInput {
//   font-size: 12px;
//   border-radius: 12px;
// }

// #addText {
//   font-size: 15px;
//   border-radius: 5px;
// }

// #dateInput {
//   margin: 10px;
//   font-size: 12px;
//   border-radius: 12px;
// }

// .collapsible {
//   max-width: 450px;
//   overflow: hidden;
//   font-weight: 500;
// }

// .collapsible label {
//   position: relative;
//   font-weight: 600;
//   background: #fff;
//   display: block;
// }

// #tooglebtn,
// #tooglebtn1,
// #tooglebtn2,
// #tooglebtn3,
// #tooglebtn4,
// #tooglebtn5 {
//   background: #fff;
//   font-size: large;
//   color: grey;
//   border: none;
//   text-decoration: none;
// }

// .custom-label,
// .addtext-label {
//   display: flex;
// }

// .hide-btn {
//   padding: 10px;
//   margin-left: 120px;
//   box-sizing: border-box;
//   border: 2px solid rgb(128, 0, 128);
//   box-shadow: 5px 5px 5px purple;
//   transition: all;
//   margin-top: 20px;

// }

// .hide-btn1 {
//   padding: 20px;
//   margin-left: 120px;
//   background-color: var(--body-color);
// }

// #cropPassport #cropCustom {
//   font-size: 200px;
//   background: var(--body-color);
// }

// .btn1 {
//   position: relative;
//   background-color: rgb(128, 0, 128);
//   font-size: 20px;
//   color: #FFF;
//   display: flex;
//   margin-top: 4px;
//   border-radius: 0.5rem;
//   margin-left: 35px;
// }

// .btn2 {
//   position: relative;
//   background-color: rgb(128, 0, 128);
//   font-size: 20px;
//   color: #FFF;
//   display: flex;
//   margin-top: 4px;
//   border-radius: 0.5rem;
// }

// #myLabel3 {
//   margin-left: 50px;
// }

// #copyCount {
//   margin-left: 8px;
//   border-radius: 5px;
//   font-size: 15px;
// }

// .copy-btn {
//   background-color: rgb(128, 0, 128);
//   border-radius: 0.5rem;
//   font-size: 15px;
//   display: flex;
//   margin-top: 10px;
// }

// #removeBgButton,#applyBgColor{
//   background-color: rgb(128, 0, 128);
//   border-radius: 0.5rem;
//   font-size: 15px;
//   display: flex;
// }

// #removeBgButton:hover,#applyBgColor:hover{
//   background: rgb(128, 0, 128, 0.8);
// }


// .btn1:hover {
//   background: rgb(128, 0, 128, 0.8);
// }

// .btn2:hover {
//   background: rgb(128, 0, 128, 0.8);
// }


// #addText {
//   background: rgb(128, 0, 128);
//   color: #FFF;
//   font-size: 1.2rem;
// }

// #addText:hover {
//   background: rgb(128, 0, 128, 0.8);
// }

// #menu {
//   color: var(--body-color);
// }



// .options {
//   margin-left: 10px;
//   font-size: 1rem;
// }

// .btn3 {
//   font-size: 2rem;
//   background: purple;
// }


// /* General responsiveness */
// @media (max-width: 768px) {
//   .sidebar {
//       display: none; /* Hide sidebar on small screens */
//   }

//   /* Top navigation bar for small screens */
//   .top-nav {
//       display: flex;
//       justify-content: space-around;
//       position: fixed;
//       top: 0;
//       width: 100%;
//       background-color: var(--sidebar-color);
//       padding: 10px 0;
//       z-index: 1000;
//   }

//   .top-nav .nav-link {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//   }

//   .top-nav .nav-link i {
//       font-size: 24px;
//       /* color: var(--primary-color); */
//   }

//   .top-nav .nav-link span {
//       font-size: 12px;
//       color: var(--text-color);
//   }

//   .container {
//       margin-top: 60px; /* Adjust container to make space for the top-nav */
//   }
// }

// @media (max-width:480){
//   .top-nav .open {
//       display: block;
//   }
//   .i{
//       display: block;
//   }
//   span{
//       display: block;
//   }

// }
// /* @media (max-width: 768px) {
//   .container {
//       width: 90%;
//       margin-left: auto;
//       margin-right: auto;
//   }

//   .sidebar {
//       display:none;
//   }

//   .sidebar.open {
//       display: block;

//   }

//   .menu-btn {
//       display: block;
//       position: fixed;
//       top: 10px;
//       left: 10px;
//       background: purple;
//       color: #fff;
//       padding: 10px;
//       border-radius: 5px;
//       cursor: pointer;
//       z-index: 1000;
//   }
// } */



// /* Show sidebar when menu button is clicked */
// /* .sidebar.open {
//   display: block;
//   width: 250px;
//   position: fixed;
//   top: 0;
//   left: 0;
//   height: 100%;
//   background: var(--sidebar-color);
//   z-index: 1000;
// }


// #myLabel {
//   font-size: 16px;
//   color: black;
// } */







// #copies {
//   display: flex;
//   flex-wrap: wrap;
//   margin-top: 20px;
//   overflow: scroll;
//   background: var(--body-color);
// }

// .copied-image {
//   margin: 10px;
//   max-width: 100px;
//   max-height: 100px;
//   background: var(--body-color);
// }





// .button2,
// .button3,
// .button4,
// .button5,
// .button6,
// .button7,
// .button8 {
//   cursor: pointer;
// }

// #brightness,
// #contrast,
// #grayscale,
// #saturation,
// #sharpness,
// #redeye,
// #colorBalance {
//   accent-color: purple;
// }


// ::-webkit-scrollbar {
//   width: 15px;

// }

// ::-webkit-scrollbar-track {
//   background: #d1e5ff;

// }

// ::-webkit-scrollbar-thumb {
//   background: linear-gradient(#642bff, #ff22e6);
//   border-radius: 10px;
// }

// h3 {
//   color: purple;
// }

// #image{
//   height: 0;
//   width: 0;
// }

// /* 
// .canvas-container {
//   position: relative;
//   display: inline-block;

// }

// #canvas {
//   display: none;
//   border: 1px solid #ccc;
//   margin-top: 20px;
// } */




// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Instant Photo Print</title>
//     <link rel="stylesheet" href="style.css" />

//     <link
//       rel="stylesheet"
//       href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css"
//     />

//     <!-- Boxicons CSS -->
//     <link
//       href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
//       rel="stylesheet"
//     />
//   </head>
//   <body>
//     <!-- <div class="container"> -->

//       <!-- <div class="menu-btn"  id="menuBtn" onclick="toggleSidebar()"><i id="menu" class='bx bx-menu'></i></div>
//       <div class="sidebar" id="sidebar"> -->

//           <!-- Sidebar content -->
//           <header class="image-text">
//           <nav class="sidebar close">
           
//               <div class="image-text">
//                 <span class="image">
//                   <img src="images/logo.jpeg" alt="logo" />
//                 </span>
//               </div>
      
//               <div class="text-header-text">
//                 <span class="name">Instant Photo Print</span>
//               </div>
      
             
//             <!-- ===MenuBar=== -->
      
//       <div class="menu-bar">
//         <div class="menu">
//           <ul class="menu-links">


//             <li class="nav-link">
//               <div class="rotate-label">
//                 <i class='bx bx-analyse '></i>
//                 <button class="button5" id="tooglebtn2" onclick="unhideLabel2()"> Rotate and Flip</button>
//               </div>
//             </li>


//             <label class="hide-btn2" id="myLabel2" style="display: none;">
//               <div  class="options">
//                 <button class="btn3" onclick="rotateLeft()"><i class="bx bx-rotate-left"></i></button>
//                 <button class="btn3" onclick="rotateRight()"><i class='bx bx-rotate-right'></i></button>
//                 <button class="btn3" onclick="flipHorizontal()"><i class='bx bx-reflect-vertical'></i></button>
//                 <button class="btn3" onclick="flipVertical()"><i class='bx bx-reflect-horizontal' ></i></button>
//                </div>
//             </label> 


//             <li class="nav-link">
//               <div class="rotate-label">
//                 <i class='bx bxs-image-alt'></i>
//                 <button class="button2" id="tooglebtn4" onclick="unhideLabel4()">Editing Tools</button>
//               </div>
//             </li>

//             <label class="hide-btn4" id="myLabel4" style="display: none;">
//               <li class="nav-link">
//                   <i class="bx bx-brightness-half ">
//                     <span class="text nav-text"> Brightness</span>
//                   </i>
//               </li>
        
//               <div class="label-brightness">
//                 <label   for="brightness"></label>
//                 <input
//                   type="range"
//                   id="brightness"
//                   min="0"
//                   max="200"
//                   value="100"
//                 />
//               </div>
        
//               <li class="nav-link">
//                   <i class="bx bxs-circle-half ">
//                     <span class="text nav-text"> Contrast</span>
//                   </i>
//               </li>
        
//               <div class="label-contrast">
//                   <label for="contrast"></label>
//                   <input type="range" id="contrast" min="0" max="200" value="100" />
//               </div>
        
//               <li class="nav-link">
//                   <i class="bx bxs-tone ">
//                     <span class="text nav-text">Grayscale</span>
//                   </i>
//               </li>
        
//               <div class="label-grayscale">
//                 <label for="grayscale"></label>
//                <input type="range" id="grayscale" min="0" max="100" value="0" />
//               </div>

//               <li class="nav-link">
//                 <i class='bx bx-checkbox-square'>
//                   <span class="text nav-text">Saturation</span>
//                 </i>
//                </li>
      
//             <div class="label-saturation">
//                 <label for="saturation"></label>
//                 <input type="range" id="saturation" min="0" max="200" value="100">
//             </div>


//             <li class="nav-link">
//               <i class='bx bx-shape-triangle'>
//                 <span class="text nav-text">Sharpness</span>
//               </i>
//           </li>
    
//           <div class="label-sharpness">
//               <label for="sharpness"></label>
//               <input type="range" id="sharpness" min="0" max="100" value="0">
//           </div>

          
//           <li class="nav-link">
//             <i class="bx bxs-tone icon">
//               <span class="text nav-text">Red-Eye Reduction</span>
//             </i>
//         </li>
  
//         <div class="label-redeye">
//             <label for="redeye"></label>
//             <input type="range" id="redeye" min="0" max="100" value="0">
//         </div>

        
//         <li class="nav-link">
//           <i class='bx bxs-palette'>
//             <span class="text nav-text">Color Balance</span>
//           </i>
//       </li>

//       <div class="label-colorBalance">
//           <label for="saturation"></label>
//           <input type="range" id="colorBalance" min="-100" max="100" value="0">
//       </div>

        
//             </label>


//             <li class="nav-link">
//              <div class="custom-label">
//                 <i class="bx bx-crop"></i>
//                 <button class="button3" id="tooglebtn" onclick="unhideLabel()"> Custom Photo</button>
//              </div>
//             </li>
      
//             <li class="nav-link">
//               <div class="addtext-label">
//                 <i class='bx bx-comment ' ></i>
//                 <button class="button4" id="tooglebtn1" onclick="unhideLabel1()">Add Name/Date</button>
//               </div>
//             </li>


//             <li class="nav-link">
//               <div class="copies-label">
//                 <i class="bx bx-minus-back icon">
//                   <button class="button8" id="tooglebtn5" onclick="unhideLabel5()">Min Background</button>
//                 </i>
               
//               </div>
//             </li>





//             <li class="nav-link">
//               <div class="copies-label">
//                 <i class='bx bxs-copy'></i>
//                 <button class="button6" id="tooglebtn3" onclick="unhideLabel3()">Number of Copies</button>
//               </div>
//             </li>
           


//             <label class="hide-btn3" id="myLabel3" style="display: none;">

//               <input type="number" id="copyCount" min="1" max="50" value="1">
            
//             <button class="copy-btn" onclick="copyImage()">Copy Image</button>
//             </label>
            

//             <!-- <li class="nav-link">
//               <a href="">
//                 <i class="bx bx-minus-back icon">
//                   <span class="text nav-text">Min Background</span>
//                 </i>
//               </a>
//             </li> -->

      
//             <li class="nav-link">
//               <a href="">
//                 <i class="bx bx-printer icon">
//                   <span class="button7"  onclick="printImages()" class="text nav-text">Print Layout</span>
//                 </i>
//                   <!-- <span onclick="downloadImage()" class="text nav-text">Print Layout</span>
//                 </i> -->
//               </a>
//             </li>


//             <li class="nav-link">
//               <a href="">
//                 <i class='bx bxs-download icon '>
//                   <span   onclick="downloadImage()" class="text nav-text">Download</span>
//                 </i>
                 
                
//               </a>
//             </li>

//           </ul>
//         </div>
//       </div>
            
//      </nav>
//   </header>
//     <!-- <div class="container"> -->

//       <!-- <div class="menu-btn"  id="menuBtn" onclick="toggleSidebar()"><i id="menu" class='bx bx-menu'></i></div> -->
//         <!-- Sidebar content -->
        
//         <div class="top-nav" id="topNav close" >
//           <div class="nav-link" onclick="unhideRotate()" >
//               <i style="color:#E4E9F7 ;"class='bx bx-analyse'></i>
//               <span style="color:#E4E9F7 ;">Rotate</span>
//           </div>
//           <div class="nav-link" onclick="unhideTools()">
//               <i class='bx bxs-image-alt'></i>
//               <span>Tools</span>
//           </div>
//           <div class="nav-link" onclick="unhideLabel()">
//               <i class="bx bx-crop"></i>
//               <span>Crop</span>
//           </div>
//           <div class="nav-link" onclick="unhideLabel1()">
//               <i class='bx bx-comment'></i>
//               <span>Add Text</span>
//           </div>
//           <div class="nav-link" onclick="unhideLabel5()">
//               <i class='bx bx-minus-back'></i>
//               <span>Bg</span>
//           </div>
//           <div class="nav-link" onclick="unhideCopy()">
//               <i class='bx bxs-copy'></i>
//               <span>Copies</span>
//           </div>
//           <div class="nav-link" onclick="printImages()">
//             <i class="bx bx-printer icon"></i>
//             <span>Print</span>
//           </div>
           
//             <div class="nav-link" onclick="downloadImage()">
//               <i class='bx bxs-download icon '></i>
//               <span>Download</span>
//           </div>
           
//         </div>
      

//         </ul>
//       </div>
//     </div>


//     <!-- More sidebar items here -->
// </ul>
// </div>


  
    
//     <label class="photo-editor">

        
//         <!-- input page -->
//         <div class="container">
//           <i class='bx bxs-file-image icon'>
//               <input type="file" id="upload" accept="image/*">
//           </i>
//           <div class="img-area">
//               <i class='bx bx-cloud-upload icon1'></i> 
//                <h3>Upload Image</h3> 
//                <div class="canvas-container">
//                 <img id="image" style="display:none;">
//                 <canvas id="photoCanvas" width="0" height="0"></canvas>
//             </div>
//           </div>
//           <br>
//           <!-- <button class="select-image">Select Image</button> -->
//       </div>


      
     




//         <!-- <div  class="display-image"> -->
    
          
//         <!-- </div> -->

    

    
  
  



//     <label class="hide-btn" id="myLabel1" style="display: none;">
//       <div  class="label-textName">
//         <label for="nameInput"></label>
//         <input type="text" id="nameInput" />
//         <label for="dateInput"></label>
//         <input type="date" id="dateInput" />
//         <input type="submit" value="Add" id="addText">
//         <label for="fontSizeInput">Font Size:</label>
// <input type="number" id="fontSizeInput" value="30" min="10" max="100"> px

//         <!-- <button id="addText">Add </button> -->

//       </div>
     
//     </label>
    
     


//     <label class="hide-btn1" id="myLabel"  style="display: none;">
//       <button class="btn1" id="cropButton">Crop Image</button>
//       <button class="btn1" id="confirmCrop" style="display:none;">Confirm Crop</button>
//     </label>
    
     
//         <div class="controls">  

        
//         <label class="hide-btn5" id="myLabel5" style="display: none;">

//           <button  id="removeBgButton">Remove Background</button>
//           <div id="backgroundColorSelector" style="display:none;">
//               <label class="label" for="bgColor">Select Background Color:</label>
//               <input   type="color" id="bgColor" value="#ffffff">
//               <button  id="applyBgColor">Apply Background Color</button>
//           </div>
//         </label>
        
      
//         <label class="hide-btn2" id="myLabel7" style="display: none;"onclick="unhideRotate()">

//            <div  class="options">
//             <button class="btn3" onclick="rotateLeft()"><i class="bx bx-rotate-left"></i></button>
//             <button class="btn3" onclick="rotateRight()"><i class='bx bx-rotate-right'></i></button>
//             <button class="btn3" onclick="flipHorizontal()"><i class='bx bx-reflect-vertical'></i></button>
//             <button class="btn3" onclick="flipVertical()"><i class='bx bx-reflect-horizontal' ></i></button>
//            </div>
//         </label> 


//         <label class="hide-btn3" id="myLabel8" style="display: none;" onclick="unhideCopy">

//           <input type="number" id="copyCount" min="1" max="50" value="1">
        
//         <button class="copy-btn" onclick="copyImage()">Copy Image</button>
//         </label>

//         <label class="hide-btn4" id="myLabel6" style="display: none;"onclick="unhideTools()">
//           <li class="nav-link">
//               <i class="bx bx-brightness-half ">
//                 <span class="text nav-text"> Brightness</span>
//               </i>
//           </li>
    
//           <div class="label-brightness">
//             <label   for="brightness"></label>
//             <input
//               type="range"
//               id="brightness"
//               min="0"
//               max="200"
//               value="100"
//             />
//           </div>
    
//           <li class="nav-link">
//               <i class="bx bxs-circle-half ">
//                 <span class="text nav-text"> Contrast</span>
//               </i>
//           </li>
    
//           <div class="label-contrast">
//               <label for="contrast"></label>
//               <input type="range" id="contrast" min="0" max="200" value="100" />
//           </div>
    
//           <li class="nav-link">
//               <i class="bx bxs-tone ">
//                 <span class="text nav-text">Grayscale</span>
//               </i>
//           </li>
    
//           <div class="label-grayscale">
//             <label for="grayscale"></label>
//            <input type="range" id="grayscale" min="0" max="100" value="0" />
//           </div>

//           <li class="nav-link">
//             <i class='bx bx-checkbox-square'>
//               <span class="text nav-text">Saturation</span>
//             </i>
//            </li>
  
//         <div class="label-saturation">
//             <label for="saturation"></label>
//             <input type="range" id="saturation" min="0" max="200" value="100">
//         </div>


//         <li class="nav-link">
//           <i class='bx bx-shape-triangle'>
//             <span class="text nav-text">Sharpness</span>
//           </i>
//       </li>

//       <div class="label-sharpness">
//           <label for="sharpness"></label>
//           <input type="range" id="sharpness" min="0" max="100" value="0">
//       </div>

      
//       <li class="nav-link">
//         <i class="bx bxs-tone icon">
//           <span class="text nav-text">Red-Eye Reduction</span>
//         </i>
//     </li>

//     <div class="label-redeye">
//         <label for="redeye"></label>
//         <input type="range" id="redeye" min="0" max="100" value="0">
//     </div>

    
//     <li class="nav-link">
//       <i class='bx bxs-palette'>
//         <span class="text nav-text">Color Balance</span>
//       </i>
//   </li>

//   <div class="label-colorBalance">
//       <label for="saturation"></label>
//       <input type="range" id="colorBalance" min="-100" max="100" value="0">
//   </div>

       
       
//         <div id="copies" class="copies-container"></div>
//       </div>
//     </div>
//     <!-- </div> -->
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"></script>
//     <script src="script.js"></script>
//   </body>
// </html>

