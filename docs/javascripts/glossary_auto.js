// docs/javascripts/glossary_auto.js
(function () {
  // ---------- Helpers ----------
  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  function buildTermRegex(termData) {
    const raw = (termData.matchPattern || termData.title || '').trim()
    if (!raw) return null

    // If matchPattern is provided, treat it as a regex fragment.
    // If not, escape the title as literal text.
    const pattern = termData.matchPattern ? raw : escapeRegExp(raw)

    // Word-boundaries help for single words but hurt multi-word phrases.
    const isSingleWord = /^[A-Za-z0-9_]+$/.test(raw)
    const finalPattern = isSingleWord ? `\\b${pattern}\\b` : pattern

    try {
      return new RegExp(finalPattern, 'gi')
    } catch (e) {
      // If any pattern is invalid, skip it rather than breaking the entire glossary.
      return null
    }
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n))
  }

  // Cache compiled regexes for performance
  let compiled = null
  function getCompiledTerms() {
    if (compiled) return compiled
    if (typeof window.glossaryTerms !== 'object' || !window.glossaryTerms) return []

    compiled = Object.keys(window.glossaryTerms).map((termId) => {
      const data = window.glossaryTerms[termId]
      const regex = buildTermRegex(data)
      return regex ? { termId, data, regex } : null
    }).filter(Boolean)

    return compiled
  }

  // ---------- Popup ----------
  function ensurePopup() {
    let popup = document.getElementById('glossary-popup')
    if (popup) return popup

    popup = document.createElement('div')
    popup.id = 'glossary-popup'
    popup.style.display = 'none'
    document.body.appendChild(popup)
    return popup
  }

  function showPopup(termEl, termData) {
    const popup = ensurePopup()

    // Populate
    popup.innerHTML = `
      <div class="glossary-popup-header">${termData.title}</div>
      <div class="glossary-popup-content">${termData.definition}</div>
    `

    // Position near the term, but keep inside viewport
    const rect = termEl.getBoundingClientRect()
    const margin = 10

    // Temporarily show to measure
    popup.style.display = 'block'
    popup.style.position = 'absolute'

    const popupW = popup.offsetWidth || 260
    const popupH = popup.offsetHeight || 140

    const desiredLeft = rect.left + window.scrollX
    const desiredTop = rect.bottom + window.scrollY + 6

    const maxLeft = window.scrollX + document.documentElement.clientWidth - popupW - margin
    const maxTop = window.scrollY + document.documentElement.clientHeight - popupH - margin

    popup.style.left = `${clamp(desiredLeft, window.scrollX + margin, maxLeft)}px`
    popup.style.top = `${clamp(desiredTop, window.scrollY + margin, maxTop)}px`
  }

  function hidePopup() {
    const popup = document.getElementById('glossary-popup')
    if (popup) popup.style.display = 'none'
  }

  // ---------- DOM processing ----------
  function shouldSkipElement(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return false

    // Skip areas where we do not want replacements
    const tag = el.tagName
    if (['SCRIPT', 'STYLE', 'A', 'CODE', 'PRE', 'TEXTAREA', 'INPUT', 'BUTTON', 'SELECT', 'SVG'].includes(tag))
      return true

    // Skip within the popup itself
    if (el.id === 'glossary-popup' || el.closest?.('#glossary-popup'))
      return true

    // Skip already-created glossary terms
    if (el.classList?.contains('glossary-term'))
      return true

    return false
  }

  function processTextNode(node, terms) {
    if (!node || node.nodeType !== Node.TEXT_NODE) return
    const text = node.textContent
    if (!text || !text.trim()) return

    // If parent is already a glossary term span, do nothing
    const parent = node.parentNode
    if (parent && parent.nodeType === Node.ELEMENT_NODE && parent.classList?.contains('glossary-term')) return

    let newHTML = text
    let changed = false

    // Replace all glossary terms
    for (const { termId, data, regex } of terms) {
      // Reset regex state (safety for some browsers)
      regex.lastIndex = 0

      if (regex.test(newHTML)) {
        // Re-run replace on original regex
        regex.lastIndex = 0
        newHTML = newHTML.replace(regex, (match) => {
          // Avoid wrapping if match is already inside a glossary span created earlier in this pass.
          // This is a simple heuristic; idempotency is enforced by scanning only text nodes.
          return `<span class="glossary-term" data-term="${termId}">${match}</span>`
        })
        changed = true
      }
    }

    if (!changed) return

    const wrapper = document.createElement('span')
    wrapper.innerHTML = newHTML
    parent.replaceChild(wrapper, node)
  }

  function walk(node, terms) {
    if (!node) return

    if (node.nodeType === Node.TEXT_NODE) {
      processTextNode(node, terms)
      return
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return

    const el = node
    if (shouldSkipElement(el)) return

    // Walk children (copy first because we may replace nodes)
    const kids = Array.from(el.childNodes)
    for (const child of kids) walk(child, terms)
  }

  // ---------- Main init ----------
  function runGlossary() {
    // Ensure data exists
    const terms = getCompiledTerms()
    if (!terms.length) return

    // Scope to the article content only (prevents nav/TOC issues)
    const root = document.querySelector('article.md-content__inner')
    if (!root) return

    // Idempotency per-page: mark the root so we don’t rewrap the same DOM repeatedly
    // (Material swaps the article DOM on navigation, so this won’t block new pages.)
    if (root.dataset.glossaryProcessed === 'true') return
    root.dataset.glossaryProcessed = 'true'

    ensurePopup()
    walk(root, terms)
  }

  // Expose for debugging if you ever want to call it manually
  window.SDJ_runGlossary = runGlossary

  // ---------- Event delegation (bind once) ----------
  const BIND_VERSION = 'sdj-glossary-v1'
  if (window.__sdjGlossaryBound !== BIND_VERSION) {
    window.__sdjGlossaryBound = BIND_VERSION

    document.addEventListener('click', function (e) {
      const popup = document.getElementById('glossary-popup')

      // Click on a term: show popup
      const termEl = e.target?.closest?.('.glossary-term')
      if (termEl) {
        e.stopPropagation()
        const termId = termEl.dataset.term
        const termData = window.glossaryTerms?.[termId]
        if (termData) showPopup(termEl, termData)
        return
      }

      // Click elsewhere: hide (but allow clicks inside popup)
      if (popup && (e.target === popup || popup.contains(e.target))) return
      hidePopup()
    }, true)

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hidePopup()
    })
  }

  // ---------- Run on initial load and on Material instant navigation ----------
  function onPageChange(fn) {
    document.addEventListener('DOMContentLoaded', fn)
    if (window.document$ && typeof window.document$.subscribe === 'function') {
      window.document$.subscribe(() => fn())
    }
  }

  // IMPORTANT: On instant navigation, a *new* article is injected.
  // Reset per-page marker by clearing it on each page change before running.
  onPageChange(() => {
    const root = document.querySelector('article.md-content__inner')
    if (root) delete root.dataset.glossaryProcessed
    runGlossary()
  })
})();
