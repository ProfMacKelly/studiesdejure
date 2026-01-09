function toggleText(element) {
    let hiddenText = element.previousElementSibling;
    
    if (hiddenText.style.display === "none" || hiddenText.style.display === "") {
        hiddenText.style.display = "inline";
        element.textContent = " ⬅"; // Change ellipsis to collapse symbol
    } else {
        hiddenText.style.display = "none";
        element.textContent = ". . ."; // Restore ellipsis
    }
}
function toggleAnswer(button) {
    let answer = button.previousElementSibling;

    if (answer.style.display === "none" || answer.style.display === "") {
        answer.style.display = "block";
        button.textContent = "Hide Answer";
    } else {
        answer.style.display = "none";
        button.textContent = "Answer";
    }
}

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  if (params.get("content-only") === "1") {
    const elementsToHide = [
      'header.md-header',
      'nav.md-tabs',
      'nav.md-nav',
      'div.md-sidebar',
      'div.md-footer',
      'nav.md-breadcrumbs',
      'div.md-main__inner > div.md-content__inner > nav.md-nav',
    ];

    elementsToHide.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) {
        el.style.display = 'none';
      }
    });

    // Optional: expand main content to full width
    const main = document.querySelector('main.md-main');
    if (main) {
      main.style.margin = '0';
      main.style.padding = '1em';
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Mark internal links for hover preview.
  // Rules:
  // - same-origin links only
  // - skip mailto/tel/javascript
  // - skip links that already opt out via data-preview="false"
  document.querySelectorAll("a[href]").forEach(a => {
    const href = a.getAttribute("href") || "";
    if (!href) return;

    if (a.dataset.preview === "false") return;

    const lower = href.toLowerCase();
    if (lower.startsWith("mailto:") || lower.startsWith("tel:") || lower.startsWith("javascript:")) return;

    // Build absolute URL for comparison
    let url;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return;
    }

    // Only same-origin pages
    if (url.origin !== window.location.origin) return;

    // Optional: skip obvious asset files
    if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|pdf|zip)$/i)) return;

    a.dataset.preview = "true";
  });
});
