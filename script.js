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
    let croppedCanvas = document.createElement("photoCanvas");
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

// ===== ROTATE AND FLIP=====

const photoCanvas = document.getElementById("photoCanvas");
const ctx = photoCanvas.getContext("2d");
const upload = document.getElementById("upload");
const canvas = document.getElementById('photoCanvas');
const copiesContainer = document.getElementById('copies');
const copyCountInput = document.getElementById('copyCount');


let img = new Image();
let currentRotation = 0;
let flippedHorizontal = false;
let flippedVertical = false;

upload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
      img.onload = () => {
        resetTransformations();
        drawImage();
      };
    };
    reader.readAsDataURL(file);
  }
});

function drawImage() {
  photoCanvas.width = img.width;
  photoCanvas.height = img.height;
  ctx.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
  ctx.save();
  ctx.translate(photoCanvas.width / 2, photoCanvas.height / 2);
  ctx.rotate((currentRotation * Math.PI) / 180);
  ctx.scale(flippedHorizontal ? -1 : 1, flippedVertical ? -1 : 1);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  ctx.restore();
}

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



// ======COPY AND PRINT IMAGES=====


upload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            };
        };
        reader.readAsDataURL(file);
    }
});

function copyImage() {
    const copyCount = parseInt(copyCountInput.value);
    if (img.src && copyCount > 0) {
        copiesContainer.innerHTML = ''; // Clear previous copies
        for (let i = 0; i < copyCount; i++) {
            const copiedImg = new Image();
            copiedImg.src = canvas.toDataURL();
            copiedImg.classList.add('copied-image');
            copiesContainer.appendChild(copiedImg);
        }
    } else {
        alert('Please upload an image and specify a valid number of copies.');
    }
}

function printImages() {
    if (copiesContainer.children.length === 0) {
        alert('No images to print.');
        return;
    }

    const printWindow = window.open('', '', 'height=600,width=800');
    const styles = `
        <style>
            body { margin: 0; padding: 20px; }
            .print-container { display: flex; flex-wrap: wrap; }
            .copied-image { margin: 10px; border: 1px solid #ccc; max-width: 100px; max-height: 100px; }
        </style>
    `;
    const content = `
        <html>
        <head>
            ${styles}
        </head>
        <body>
            <div class="print-container">
                ${Array.from(copiesContainer.children).map(child => `<img src="${child.src}" class="copied-image">`).join('')}
            </div>
        </body>
        </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}
