(function () {
  // Call `fn` on first load and on every MkDocs Material instant-navigation page swap.
  function onPageChange(fn) {
    document.addEventListener('DOMContentLoaded', fn);

    // MkDocs Material exposes `document$` when instant navigation is enabled.
    if (window.document$ && typeof window.document$.subscribe === 'function') {
      window.document$.subscribe(() => fn());
    }
  }

  // Re-run your initializers if they exist.
  function initAll() {
    // 1) Re-apply link preview marking (if your code depends on it)
    try {
      document.querySelectorAll("a[href]").forEach(a => {
        const href = a.getAttribute("href") || "";
        if (!href) return;
        if (a.dataset.preview === "false") return;

        const lower = href.toLowerCase();
        if (lower.startsWith("mailto:") || lower.startsWith("tel:") || lower.startsWith("javascript:")) return;
        if (href.startsWith("#")) return;

        let url;
        try {
          url = new URL(href, window.location.href);
        } catch {
          return;
        }
        if (url.origin !== window.location.origin) return;
        if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|pdf|zip)$/i)) return;

        a.dataset.preview = "true";
      });
    } catch (e) {}

    // 2) If your glossary script exposes an init function, call it.
    // Add the real function name here once we confirm it.
    if (typeof window.initGlossary === "function") {
      try { window.initGlossary(); } catch (e) {}
    }

    // 3) If your overlay script exposes an init function, call it.
    if (typeof window.initOverlayPreview === "function") {
      try { window.initOverlayPreview(); } catch (e) {}
    }
  }

  onPageChange(initAll);
})();
