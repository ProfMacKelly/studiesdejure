// docs/javascripts/glossary_auto.js
document.addEventListener('DOMContentLoaded', function() {
    // Create popup container (same as before)
    const popup = document.createElement('div');
    popup.id = 'glossary-popup';
    document.body.appendChild(popup);

    // Function to process text nodes
    function processTextNode(node) {
        if (!node.textContent.trim()) return;
        
        let text = node.textContent;
        let newHTML = text;
        
        // Find and replace all glossary terms
        Object.keys(glossaryTerms).forEach(termId => {
            const termData = glossaryTerms[termId];
            const regex = new RegExp(`\\b${termData.matchPattern || termData.title}\\b`, 'gi');
            newHTML = newHTML.replace(regex, 
                `<span class="glossary-term" data-term="${termId}">$&</span>`);
        });
        
        // Only replace if we found terms
        if (newHTML !== text) {
            const newElement = document.createElement('span');
            newElement.innerHTML = newHTML;
            node.parentNode.replaceChild(newElement, node);
        }
    }

    // Walk through all text nodes in the content area
    function walkNodes(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            processTextNode(node);
        } else if (node.nodeType === Node.ELEMENT_NODE && 
                 !['SCRIPT', 'STYLE', 'A', 'CODE', 'PRE'].includes(node.tagName)) {
            Array.from(node.childNodes).forEach(walkNodes);
        }
    }

    // Process the main content area
    const content = document.querySelector('.md-content');
    if (content) walkNodes(content);

    // Add click handlers (same as before)
    document.addEventListener('click', function(e) {
        if (!e.target.classList.contains('glossary-term') && !popup.contains(e.target)) {
            popup.style.display = 'none';
        }
    });
    
    document.querySelectorAll('.glossary-term').forEach(term => {
        term.addEventListener('click', function(e) {
            e.stopPropagation();
            const termId = term.dataset.term;
            const termData = glossaryTerms[termId];
            
            if (termData) {
                const rect = term.getBoundingClientRect();
                popup.style.top = `${rect.bottom + window.scrollY}px`;
                popup.style.left = `${rect.left + window.scrollX}px`;
                popup.innerHTML = `
                    <div class="glossary-popup-header">${termData.title}</div>
                    <div class="glossary-popup-content">${termData.definition}</div>`;
                popup.style.display = 'block';
            }
        });
    });
});