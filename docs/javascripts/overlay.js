(function () {
  // Do nothing inside the iframe to avoid recursion.
  if (window.self !== window.top) return

  const OPEN_DELAY_MS = 600
  const CLOSE_DELAY_MS = 250
  const GAP_PX = 12
  const EDGE_PAD = 12

  let openTimer = null
  let closeTimer = null
  let activeAnchor = null
  let hoveringPanel = false

  function parts() {
    const modal = document.getElementById('previewModal')
    const frame = document.getElementById('previewFrame')
    const closeBtn = document.getElementById('previewClose')
    const panel = modal?.querySelector?.('.sdj-preview__panel')
    if (!modal || !frame || !closeBtn || !panel) return null
    return { modal, frame, closeBtn, panel }
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n))
  }

  function positionNearAnchor(anchor) {
    const p = parts()
    if (!p) return
    const { modal, panel } = p

    const r = anchor.getBoundingClientRect()
    const panelW = panel.offsetWidth || 520
    const panelH = panel.offsetHeight || 520

    // Prefer right side; if not enough space, clamp into viewport.
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
    activeAnchor = null
  }

  function scheduleClose() {
    clearTimeout(closeTimer)
    closeTimer = setTimeout(() => {
      if (!hoveringPanel) close()
    }, CLOSE_DELAY_MS)
  }

  function isPreviewLink(target) {
    return target?.closest?.('a.link-preview') || null
  }

  // Versioned guard so updates don’t get stuck “bound”
  const VERSION = 'sdj-preview-v3'
  if (window.__sdjPreviewBound === VERSION) return
  window.__sdjPreviewBound = VERSION

  // Track panel hover so it doesn’t instantly close
  function bindPanelHover() {
    const p = parts()
    if (!p) return
    const { panel } = p
    if (panel.__sdjHoverBound) return
    panel.__sdjHoverBound = true

    panel.addEventListener('mouseenter', () => {
      hoveringPanel = true
      clearTimeout(closeTimer)
    })
    panel.addEventListener('mouseleave', () => {
      hoveringPanel = false
      scheduleClose()
    })
  }

  document.addEventListener('mouseover', (e) => {
    const a = isPreviewLink(e.target)
    if (!a) return

    activeAnchor = a
    clearTimeout(closeTimer)
    clearTimeout(openTimer)

    openTimer = setTimeout(() => {
      if (activeAnchor === a) {
        open(a)
        bindPanelHover()
      }
    }, OPEN_DELAY_MS)
  }, true)

  document.addEventListener('mouseout', (e) => {
    const a = isPreviewLink(e.target)
    if (!a) return
    clearTimeout(openTimer)
    scheduleClose()
  }, true)

  document.addEventListener('click', (e) => {
    const p = parts()
    if (!p) return
    if (e.target === p.closeBtn) {
      e.preventDefault()
      hoveringPanel = false
      close()
    }
  }, true)

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })
})()
