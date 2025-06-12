function previewUserImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('userImagePreview').src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function applyTryOn() {
    document.getElementById('resultImage').src = "result_sample.jpg";
    alert("Applying try-on function...");
}

function addToCart() {
    alert("Product added to cart!");
}