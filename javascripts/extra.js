// Toggle hidden inline text with ellipsis
function toggleText(element) {
    let hiddenText = element.previousElementSibling;

    if (hiddenText.style.display === "none" || hiddenText.style.display === "") {
        hiddenText.style.display = "inline";
        element.textContent = " ⬅"; // Collapse symbol
    } else {
        hiddenText.style.display = "none";
        element.textContent = ". . ."; // Restore ellipsis
    }
}

// Toggle answer visibility
function toggleAnswer(button) {
    let answer = button.previousElementSibling;

    if (answer.style.display === "none" || answer.style.display === "") {
        answer.style.display = "block";
        button.textContent = "Hide Answer";
    } else {
        answer.style.display = "none";
        button.textContent = "Answer";
    }
}

// === Glossary Term Tooltip Support ===
function initializeTooltips() {
    document.querySelectorAll('.glossary-term[data-term]').forEach(el => {
        const term = el.dataset.term;
        const definition = window.glossaryDefinitions?.[term];
        if (definition && !el.dataset.tooltipBound) {
            el.dataset.tooltipBound = "true";
            el.addEventListener('mouseenter', () => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip-popup';
                tooltip.innerText = definition;
                el.appendChild(tooltip);
            });
            el.addEventListener('mouseleave', () => {
                const tooltip = el.querySelector('.tooltip-popup');
                if (tooltip) el.removeChild(tooltip);
            });
        }
    });
}

// === Link Preview Support ===
function initializeLinkPreviews() {
    document.querySelectorAll('.link-preview').forEach(el => {
        if (!el.dataset.previewBound) {
            el.dataset.previewBound = "true";
            el.addEventListener('mouseenter', async () => {
                const url = el.getAttribute('href');
                if (!url) return;

                try {
                    const response = await fetch(url);
                    const text = await response.text();

                    const parser = new DOMParser();
                    const doc = parser.parseFromString(text, 'text/html');
                    const previewContent = doc.querySelector('article')?.innerText?.slice(0, 300) || 'Preview unavailable';

                    const preview = document.createElement('div');
                    preview.className = 'link-preview-popup';
                    preview.innerText = previewContent;
                    el.appendChild(preview);
                } catch (err) {
                    console.error("Preview fetch failed:", err);
                }
            });

            el.addEventListener('mouseleave', () => {
                const preview = el.querySelector('.link-preview-popup');
                if (preview) el.removeChild(preview);
            });
        }
    });
}

// === SPA-Compatible Init for MkDocs Material ===
function initializeCustomBehavior() {
    initializeTooltips();
    initializeLinkPreviews();
}

// Init for MkDocs Material dynamic page loads
if (typeof document$ !== 'undefined') {
    document$.subscribe(() => {
        initializeCustomBehavior();
    });
} else {
    // Fallback for non-SPA contexts
    document.addEventListener('DOMContentLoaded', () => {
        initializeCustomBehavior();
    });
}
