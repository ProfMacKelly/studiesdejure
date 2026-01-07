(function () {
  const params = new URLSearchParams(window.location.search)
  if (params.get('sdjPreview') !== '1') return

  function enablePreviewMode() {
    document.body.classList.add('sdj-preview-mode')
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', enablePreviewMode)
  else
    enablePreviewMode()
})()
