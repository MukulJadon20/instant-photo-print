document.addEventListener("DOMContentLoaded", () => {
  const upload = document.getElementById("upload");
  const photoCanvas = document.getElementById("photoCanvas");
  const ctx = photoCanvas.getContext("2d");

  const brightness = document.getElementById("brightness");
  const contrast = document.getElementById("contrast");
  const grayscale = document.getElementById("grayscale");

  let image = new Image();

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

  document.getElementById("crop").addEventListener("click", () => {
    // Implement cropping logic
    console.send("hello crop");
  });

  document.getElementById("addText").addEventListener("click", () => {
    const text = prompt("Enter name and date:");
    if (text) {
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(text, 10, photoCanvas.height - 10);
    }
  });

  document.getElementById("removeBackground").addEventListener("click", () => {
    // Implement background removal logic
  });

  document.getElementById("printLayout").addEventListener("click", () => {
    // Implement print layout optimization
  });
});
