(function () {
  function parts() {
    const modal = document.getElementById('previewModal')
    const frame = document.getElementById('previewFrame')
    const close = document.querySelector('.close')
    if (!modal || !frame || !close) return null
    return { modal, frame, close }
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
    const a = target?.closest?.('a')
    if (!a) return null
    if (a.classList.contains('preview-link')) return a
    if (a.classList.contains('link-preview')) return a
    return null
  }

  // Bind once
  if (window.__sdjPreviewBound) return
  window.__sdjPreviewBound = true

  // Hover preview (optional): comment out if you only want click
  let t = null
  document.addEventListener('mouseover', (e) => {
    const a = isPreviewLink(e.target)
    if (!a) return
    clearTimeout(t)
    t = setTimeout(() => open(a.href), 250)
  }, true)

  document.addEventListener('mouseout', (e) => {
    const a = isPreviewLink(e.target)
    if (!a) return
    clearTimeout(t)
  }, true)

  // Click preview
  document.addEventListener('click', (e) => {
    const a = isPreviewLink(e.target)
    if (!a) return
    e.preventDefault()
    open(a.href)
  }, true)

  // Close handlers
  document.addEventListener('click', (e) => {
    const p = parts()
    if (!p) return
    if (e.target === p.close || e.target === p.modal) {
      e.preventDefault()
      close()
    }
  }, true)
})()
