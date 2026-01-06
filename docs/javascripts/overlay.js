document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("previewModal");
  const frame = document.getElementById("previewFrame");
  const closeButton = document.querySelector(".close");

  // If the overlay markup isn't present on this page, do nothing.
  if (!modal || !frame || !closeButton) return;

  function openPreview(href) {
    if (!href) return;
    frame.src = href;
    modal.style.display = "block";
  }

  function closePreview() {
    modal.style.display = "none";
    frame.src = "";
  }

  // Click-to-preview for explicit preview links
  document.querySelectorAll(".preview-link").forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      openPreview(this.href);
    });
  });

  closeButton.addEventListener("click", closePreview);

  window.addEventListener("click", function (event) {
    if (event.target === modal) closePreview();
  });

  // Hover-to-preview (only links marked data-preview="true")
  let hoverTimer = null;

  document.addEventListener("mouseover", function (event) {
    const a = event.target.closest && event.target.closest('a[data-preview="true"]');
    if (!a) return;

    // Don’t preview in-page anchors
    const href = a.getAttribute("href") || "";
    if (href.startsWith("#")) return;

    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => openPreview(a.href), 300); // small delay reduces accidental triggers
  });

  document.addEventListener("mouseout", function (event) {
    const a = event.target.closest && event.target.closest('a[data-preview="true"]');
    if (!a) return;

    clearTimeout(hoverTimer);
    // Optional: close on mouseout. If you prefer “sticky until closed”, comment this out.
    // closePreview();
  });
});
