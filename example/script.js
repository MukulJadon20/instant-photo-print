const canvas = document.getElementById('photoCanvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');
const copiesContainer = document.getElementById('copies');
const copyCountInput = document.getElementById('copyCount');
let img = new Image();

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
