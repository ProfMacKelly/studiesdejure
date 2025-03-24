document.addEventListener("DOMContentLoaded", function () {
  // Load glossary data
  fetch('/glossary.json')
    .then(response => response.json())
    .then(glossary => {
      // Find all glossary terms in the content
      const terms = Object.keys(glossary);
      terms.forEach(term => {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        document.body.innerHTML = document.body.innerHTML.replace(
          regex,
          `<span class="glossary-term" data-definition="${glossary[term]}">${term}</span>`
        );
      });
    })
    .catch(error => console.error('Error loading glossary:', error));
});