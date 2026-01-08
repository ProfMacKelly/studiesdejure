// docs/javascripts/glossary_auto.js
(function () {
  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  function buildRegex(termData) {
    const raw = (termData.matchPattern || termData.title || '').trim()
    if (!raw) return null

    // If matchPattern is present, treat as regex fragment; otherwise literal title.
    const pattern = termData.matchPattern ? raw : escapeRegExp(raw)

    // Add word boundaries only for simple single words (not phrases / regex groups).
    const isSimpleWord = /^[A-Za-z0-9_]+$/.test(raw)
    const finalPattern = isSimpleWord ? `\\b${pattern}\\b` : pattern

    try { return new RegExp(finalPattern, 'gi') } catch { return null }
  }

  function getTerms() {
    const termsObj = window.glossaryTerms
    if (!termsObj || typeof termsObj !== 'object') return []

    return Object.keys(termsObj).map((termId) => {
      const data = termsObj[termId]
      const regex = buildRegex(data)
      return regex ? { termId, data, regex } : null
    }).filter(Boolean)
  }

  function ensurePopup() {
    let popup = document.getElementById('glossary-popup')
    if (popup) return popup
    popup = document.createElement('div')
    popup.id = 'glossary-popup'
    popup.style.display = 'none'
    document.body.appendChild(popup)
    return popup
  }

  function hidePopup() {
    const popup = document.getElementById('glossary-popup')
    if (popup) popup.style.display = 'none'
  }

  function showPopup(termEl, termData) {
    const popup = ensurePopup()
    popup.innerHTML = `
      <div class="glossary-popup-header">${termData.title}</div>
      <div class="glossary-popup-content">${termData.definition}</div>
    `
    const rect = termEl.getBoundingClientRect()
    popup.style.position = 'absolute'
    popup.style.left = `${rect.left + window.scrollX}px`
    popup.style.top = `${rect.bottom + window.scrollY + 6}px`
    popup.style.display = 'block'
  }

  function shouldSkip(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return false
    const tag = el.tagName
    if (['SCRIPT', 'STYLE', 'A', 'CODE', 'PRE', 'TEXTAREA', 'INPUT', 'BUTTON', 'SELECT'].includes(tag)) return true
    if (el.classList?.contains('glossary-term')) return true
    if (el.id === 'glossary-popup' || el.closest?.('#glossary-popup')) return true
    return false
  }

  function processTextNode(node, terms) {
    const text = node.textContent
    if (!text || !text.trim()) return

    // Avoid wrapping inside an existing glossary term
    const parentEl = node.parentNode
    if (parentEl?.classList?.contains?.('glossary-term')) return

    let html = text
    let changed = false

    for (const { termId, regex } of terms) {
      regex.lastIndex = 0
      if (regex.test(html)) {
        regex.lastIndex = 0
        html = html.replace(regex, (m) => `<span class="glossary-term" data-term="${termId}">${m}</span>`)
        changed = true
      }
    }

    if (!changed) return
    const wrap = document.createElement('span')
    wrap.innerHTML = html
    parentEl.replaceChild(wrap, node)
  }

  function walk(node, terms) {
    if (!node) return
    if (node.nodeType === Node.TEXT_NODE) {
      processTextNode(node, terms)
      return
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return
    if (shouldSkip(node)) return
    Array.from(node.childNodes).forEach(child => walk(child, terms))
  }

  function runGlossary() {
    const terms = getTerms()
    if (!terms.length) return

    // Only process the article area (not nav / TOC)
    const root = document.querySelector('article.md-content__inner') || document.querySelector('.md-content')
    if (!root) return

    // Idempotent per page swap: prevent double-wrapping on the same injected content
    if (root.dataset.glossaryProcessed === 'true') return
    root.dataset.glossaryProcessed = 'true'

    ensurePopup()
    walk(root, terms)
  }

  // Bind click handling once (works even after content swaps)
  const BIND = 'sdj-glossary-v2'
  if (window.__sdjGlossaryBound !== BIND) {
    window.__sdjGlossaryBound = BIND

    document.addEventListener('click', (e) => {
      const popup = document.getElementById('glossary-popup')
      const termEl = e.target?.closest?.('.glossary-term')

      if (termEl) {
        e.stopPropagation()
        const termId = termEl.dataset.term
        const termData = window.glossaryTerms?.[termId]
        if (termData) showPopup(termEl, termData)
        return
      }

      if (popup && (e.target === popup || popup.contains(e.target))) return
      hidePopup()
    }, true)

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hidePopup()
    })
  }

  function onPageChange(fn) {
    document.addEventListener('DOMContentLoaded', fn)
    if (window.document$ && typeof window.document$.subscribe === 'function') {
      window.document$.subscribe(() => fn())
    }
  }

  onPageChange(() => {
    // Clear the per-root marker on each injected page, then run
    const root = document.querySelector('article.md-content__inner') || document.querySelector('.md-content')
    if (root) delete root.dataset.glossaryProcessed
    runGlossary()
  })

  // Optional manual hook for debugging
  window.SDJ_runGlossary = runGlossary
})();
