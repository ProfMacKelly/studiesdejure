(function () {
  // Prevent infinite recursion: do nothing when running inside an iframe.
  if (window.self !== window.top) return

  function parts() {
    const modal = document.getElementById('previewModal')
    const frame = document.getElementById('previewFrame')
    const closeBtn = document.querySelector('#previewModal .close')
    if (!modal || !frame || !closeBtn) return null
    return { modal, frame, closeBtn }
  }

  function open(url) {
    const p = parts()
    if (!p) return
    p.frame.src = url
    p.modal.style.display = 'block'
  }

  function close() {
    const p = parts()
    if (!p) return
    p.modal.style.display = 'none'
    p.frame.src = ''
  }

  function isPreviewLink(target) {
    const a = target?.closest?.('a.link-preview')
    return a || null
  }

  // Bind once
  if (window.__sdjPreviewBound) return
  window.__sdjPreviewBound = true

  let timer = null

  // Hover opens preview (delegated)
  document.addEventListener('mouseover', (e) => {
    const a = isPreviewLink(e.target)
    if (!a) return
    clearTimeout(timer)
    timer = setTimeout(() => open(a.href), 250)
  }, true)

  // Leaving link cancels pending open
  document.addEventListener('mouseout', (e) => {
    const a = isPreviewLink(e.target)
    if (!a) return
    clearTimeout(timer)
  }, true)

  // IMPORTANT: do not intercept click; allow normal navigation.
  // (No click handler for preview links.)

  // Close actions
  document.addEventListener('click', (e) => {
    const p = parts()
    if (!p) return
    if (e.target === p.closeBtn || e.target === p.modal) {
      e.preventDefault()
      close()
    }
  }, true)

  // Escape closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })
})()
