(function () {
  let hoverTimer = null

  function getModalParts() {
    const modal = document.getElementById("previewModal")
    const frame = document.getElementById("previewFrame")
    const closeButton = document.querySelector(".close")
    if (!modal || !frame || !closeButton) return null
    return { modal, frame, closeButton }
  }

  function openPreview(url) {
    const parts = getModalParts()
    if (!parts) return
    const { modal, frame } = parts
    frame.src = url
    modal.style.display = "block"
  }

  function closePreview() {
    const parts = getModalParts()
    if (!parts) return
    const { modal, frame } = parts
    modal.style.display = "none"
    frame.src = ""
  }

  function isPreviewableAnchor(el) {
    if (!el) return null
    const a = el.closest && el.closest("a")
    if (!a) return null

    // Backward-compatible: explicit preview links
    if (a.classList.contains("preview-link")) return a

    // New behavior: any link marked data-preview="true"
    if (a.dataset && a.dataset.preview === "true") return a

    return null
  }

  function bindGlobalHandlersOnce() {
    if (window.__sdjOverlayBound) return
    window.__sdjOverlayBound = true

    // Click-to-preview (delegated)
    document.addEventListener("click", (event) => {
      const a = isPreviewableAnchor(event.target)
      if (!a) return

      event.preventDefault()
      openPreview(a.href)
    })

    // Hover-to-preview (delegated)
    document.addEventListener("mouseover", (event) => {
      const a = isPreviewableAnchor(event.target)
      if (!a) return

      // Don’t preview in-page anchors
      const href = a.getAttribute("href") || ""
      if (href.startsWith("#")) return

      clearTimeout(hoverTimer)
      hoverTimer = setTimeout(() => openPreview(a.href), 300)
    })

    document.addEventListener("mouseout", (event) => {
      const a = isPreviewableAnchor(event.target)
      if (!a) return
      clearTimeout(hoverTimer)
    })

    // Close button (needs to be rebound per page if the modal is in page content,
    // but if the modal is global in overrides, this will work consistently.)
    document.addEventListener("click", (event) => {
      const parts = getModalParts()
      if (!parts) return
      const { closeButton, modal } = parts

      if (event.target === closeButton) {
        event.preventDefault()
        closePreview()
      } else if (event.target === modal) {
        // Click outside content closes
        closePreview()
      }
    })
  }

  // Bind once on first load
  document.addEventListener("DOMContentLoaded", bindGlobalHandlersOnce)

  // Also bind once when Material uses instant navigation (safe no-op if already bound)
  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(bindGlobalHandlersOnce)
  }
})()
