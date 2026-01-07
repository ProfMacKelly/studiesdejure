(function () {
  function onPageChange(fn) {
    document.addEventListener('DOMContentLoaded', fn)
    if (window.document$ && typeof window.document$.subscribe === 'function') {
      window.document$.subscribe(() => fn())
    }
  }

  function markInternalLinksForPreview() {
    // Scope to main content so we don't decorate nav/sidebar unnecessarily
    const root = document.querySelector('main') || document

    root.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href') || ''
      if (!href) return
      if (a.dataset.preview === 'false') return

      const lower = href.toLowerCase()
      if (lower.startsWith('mailto:') || lower.startsWith('tel:') || lower.startsWith('javascript:')) return
      if (href.startsWith('#')) return

      let url
      try { url = new URL(href, window.location.href) } catch { return }

      if (url.origin !== window.location.origin) return
      if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|pdf|zip)$/i)) return

      // Both: attribute + class (matches your RTD mental model and CSS possibilities)
      a.dataset.preview = 'true'
      a.classList.add('link-preview')
    })
  }

  onPageChange(() => {
    markInternalLinksForPreview()
  })
})()
