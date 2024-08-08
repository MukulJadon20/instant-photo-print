document.addEventListener("DOMContentLoaded", () => {
    const upload = document.getElementById("upload");
    const photoCanvas = document.getElementById("photoCanvas");
    const ctx = photoCanvas.getContext("2d");
  
    let cropper;
  
    upload.addEventListener("change", (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const imgElement = document.createElement("img");
        imgElement.src = event.target.result;
  
        imgElement.onload = () => {
          if (cropper) cropper.destroy(); // Destroy previous cropper instance
          photoCanvas.width = imgElement.width;
          photoCanvas.height = imgElement.height;
          ctx.drawImage(imgElement, 0, 0);
  
          cropper = new Cropper(imgElement, {
            viewMode: 1,
            aspectRatio: NaN, // Free ratio
            autoCropArea: 1,
          });
  
          document.querySelector(".img-area").appendChild(imgElement);
        };
      };
      reader.readAsDataURL(file);
    });
  
    // Custom crop functionality
    document.getElementById("customCrop").addEventListener("click", () => {
      const croppedImage = cropper.getCroppedCanvas();
      photoCanvas.width = croppedImage.width;
      photoCanvas.height = croppedImage.height;
      ctx.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
      ctx.drawImage(croppedImage, 0, 0);
  
      // Reapply filters if any
      applyFilters();
    });
  
    const brightness = document.getElementById("brightness");
    const contrast = document.getElementById("contrast");
    const grayscale = document.getElementById("grayscale");
  
    const applyFilters = () => {
      ctx.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
      ctx.filter = `
              brightness(${brightness.value}%)
              contrast(${contrast.value}%)
              grayscale(${grayscale.value}%)
          `;
      ctx.drawImage(cropper.getCroppedCanvas(), 0, 0);
    };
  
    brightness.addEventListener("input", applyFilters);
    contrast.addEventListener("input", applyFilters);
    grayscale.addEventListener("input", applyFilters);
  
    // Add text functionality with a white strip
    document.getElementById("addText").addEventListener("click", () => {
      let name = document.getElementById("nameInput").value;
      let date = document.getElementById("dateInput").value;
  
      // Draw white strip
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fillRect(0, photoCanvas.height - 60, photoCanvas.width, 50);
  
      // Draw text
      ctx.font = "bold 40px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(name, 10, photoCanvas.height - 20);
      ctx.fillText(date, photoCanvas.width - 200, photoCanvas.height - 20);
    });
  
    // Rotate, flip, and other functions remain the same...
  });
  
  

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
  