document.addEventListener('DOMContentLoaded', function() {
    // Create the popup container
    const popup = document.createElement('div');
    popup.id = 'glossary-popup';
    document.body.appendChild(popup);
    
    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.classList.contains('glossary-term') && !popup.contains(e.target)) {
            popup.style.display = 'none';
        }
    });
    
    // Process all glossary terms in the text
    const terms = document.querySelectorAll('.glossary-term');
    terms.forEach(term => {
        const termId = term.dataset.term;
        const termData = glossaryTerms[termId];
        
        if (termData) {
            term.style.cursor = 'pointer';
            term.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Position the popup near the clicked term
                const rect = term.getBoundingClientRect();
                popup.style.top = `${rect.bottom + window.scrollY}px`;
                popup.style.left = `${rect.left + window.scrollX}px`;
                
                // Set popup content
                popup.innerHTML = `
                    <div class="glossary-popup-header">${termData.title}</div>
                    <div class="glossary-popup-content">${termData.definition}</div>
                `;
                
                popup.style.display = 'block';
            });
        }
    });
});