document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".preview-link");
  const modal = document.getElementById("previewModal");
  const frame = document.getElementById("previewFrame");
  const closeButton = document.querySelector(".close");

  // If the overlay markup isn't present on this page, do nothing.
  // (Prevents: Cannot read properties of null (reading 'addEventListener'))
  if (!modal || !frame || !closeButton) return;

  links.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default navigation
      frame.src = this.href; // Load the target URL in iframe
      modal.style.display = "block"; // Show modal
    });
  });

  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
    frame.src = ""; // Clear iframe to stop loading
  });

  // Close modal when clicking outside content
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      frame.src = "";
    }
  });
});
