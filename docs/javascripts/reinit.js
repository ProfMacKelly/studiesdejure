(function () {
  function onPageChange(fn) {
    document.addEventListener('DOMContentLoaded', fn)
    if (window.document$ && typeof window.document$.subscribe === 'function') {
      window.document$.subscribe(() => fn())
    }
  }

  function markInternalLinksForPreview() {
    // Only mark links in the main article content, not nav, not TOC, not header/footer.
    const scope = document.querySelector('article.md-content__inner')
    if (!scope) return

    scope.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href') || ''
      if (!href) return
      if (a.dataset.preview === 'false') return

      const lower = href.toLowerCase()
      if (lower.startsWith('mailto:') || lower.startsWith('tel:') || lower.startsWith('javascript:')) return
      if (href.startsWith('#')) return

      let url
      try { url = new URL(href, window.location.href) } catch { return }

      // same-origin only
      if (url.origin !== window.location.origin) return

      // avoid previewing assets
      if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|pdf|zip)$/i)) return

      // avoid previewing the current page (prevents pointless self-preview)
      if (url.pathname === window.location.pathname) return

      a.dataset.preview = 'true'
      a.classList.add('link-preview')
    })
  }

  onPageChange(markInternalLinksForPreview)
})()
