(function () {
  // Do nothing inside the iframe to avoid recursion.
  if (window.self !== window.top) return

  const OPEN_DELAY_MS = 600
  const CLOSE_DELAY_MS = 150
  const GAP_PX = 12
  const EDGE_PAD = 12

  let openTimer = null
  let closeTimer = null
  let lastAnchor = null

  function parts() {
    const modal = document.getElementById('previewModal')
    const frame = document.getElementById('previewFrame')
    const closeBtn = document.getElementById('previewClose')
    if (!modal || !frame || !closeBtn) return null
    return { modal, frame, closeBtn }
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n))
  }

  function positionNearAnchor(anchor) {
    const p = parts()
    if (!p) return
    const { modal } = p

    const r = anchor.getBoundingClientRect()
    const panel = modal.querySelector('.sdj-preview__panel')
    const panelW = panel ? panel.offsetWidth : 520
    const panelH = panel ? panel.offsetHeight : 520

    const desiredLeft = r.right + GAP_PX
    const desiredTop = r.top

    const maxLeft = window.innerWidth - panelW - EDGE_PAD
    const maxTop = window.innerHeight - panelH - EDGE_PAD

    modal.style.left = `${clamp(desiredLeft, EDGE_PAD, maxLeft)}px`
    modal.style.top = `${clamp(desiredTop, EDGE_PAD, maxTop)}px`
  }

  function open(anchor) {
    const p = parts()
    if (!p) return
    const { modal, frame } = p

    const url = new URL(anchor.href, window.location.href)
    // (You haven't added preview_mode yet; leaving this harmless for now)
    url.searchParams.set('sdjPreview', '1')

    modal.style.display = 'block'
    modal.setAttribute('aria-hidden', 'false')
    positionNearAnchor(anchor)
    frame.src = url.toString()
  }

  function close() {
    const p = parts()
    if (!p) return
    const { modal, frame } = p
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    frame.src = ''
  }

  function isPreviewLink(target) {
    return target?.closest?.('a.link-preview') || null
  }

  function bindIfNeeded() {
    // Versioned guard: allows upgrades without getting stuck “bound” forever
    const VERSION = 'sdj-preview-v2'
    if (window.__sdjPreviewBound === VERSION) return
    window.__sdjPreviewBound = VERSION

    document.addEventListener('mouseover', (e) => {
      const a = isPreviewLink(e.target)
      if (!a) return

      lastAnchor = a
      clearTimeout(closeTimer)
      clearTimeout(openTimer)

      openTimer = setTimeout(() => {
        if (lastAnchor === a) open(a)
      }, OPEN_DELAY_MS)
    }, true)

    document.addEventListener('mouseout', (e) => {
      const a = isPreviewLink(e.target)
      if (!a) return

      clearTimeout(openTimer)
      clearTimeout(closeTimer)

      closeTimer = setTimeout(() => {
        lastAnchor = null
        close()
      }, CLOSE_DELAY_MS)
    }, true)

    document.addEventListener('click', (e) => {
      const p = parts()
      if (!p) return
      if (e.target === p.closeBtn) {
        e.preventDefault()
        close()
      }
    }, true)

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close()
    })
  }

  document.addEventListener('DOMContentLoaded', bindIfNeeded)
  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(bindIfNeeded)
  }
})();
