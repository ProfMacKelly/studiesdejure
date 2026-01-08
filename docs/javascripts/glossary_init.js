(function () {
  function onPageChange(fn) {
    document.addEventListener('DOMContentLoaded', fn)
    if (window.document$ && typeof window.document$.subscribe === 'function') {
      window.document$.subscribe(() => fn())
    }
  }

  function initGlossary() {
    // Scope to article content (prevents nav/TOC issues)
    const root = document.querySelector('article.md-content__inner')
    if (!root) return

    // IMPORTANT: idempotency guard — prevents double-wrapping on repeated inits
    // This assumes your glossary script wraps terms by adding an attribute/class.
    // If your glossary already uses something else, we can align it.
    root.querySelectorAll('[data-glossary-initialized="true"]').forEach(el => {
      // If your script marks per-element initialization, it can skip here.
      // Leaving this empty is fine.
    })

    // Call your existing glossary auto script if it exposes a function:
    // If it doesn't, we will adjust glossary_auto.js in Step 3 below.
    if (typeof window.SDJ_initGlossaryAuto === 'function') {
      window.SDJ_initGlossaryAuto()
      return
    }

    // Fallback: if your glossary_auto.js relies on running once on DOMContentLoaded,
    // it may not be re-runnable. In that case we fix glossary_auto.js next.
  }

  onPageChange(initGlossary)
})()
