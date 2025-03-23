function toggleText(element) {
    let hiddenText = element.previousElementSibling;
    
    if (hiddenText.style.display === "none" || hiddenText.style.display === "") {
        hiddenText.style.display = "inline";
        element.textContent = " ⬅"; // Change ellipsis to collapse symbol
    } else {
        hiddenText.style.display = "none";
        element.textContent = ". . ."; // Restore ellipsis
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const glossaryTerms = document.querySelectorAll(".glossary");

    glossaryTerms.forEach(glossary => {
        const toggle = glossary.querySelector(".md-toggle");
        const tooltip = glossary.querySelector(".glossary__tooltip");

        if (!toggle || !tooltip) return;

        toggle.addEventListener("change", function () {
            if (this.checked) {
                positionGlossaryTooltip(glossary, tooltip);
            }
        });

        document.addEventListener("click", function (event) {
            if (!glossary.contains(event.target)) {
                toggle.checked = false;
            }
        });
    });

    function positionGlossaryTooltip(glossary, tooltip) {
        const rect = tooltip.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        tooltip.classList.remove("glossary--left", "glossary--right", "glossary--top", "glossary--bottom");

        if (rect.right > screenWidth) {
            tooltip.classList.add("glossary--left");
        } else if (rect.left < 0) {
            tooltip.classList.add("glossary--right");
        }

        if (rect.bottom > screenHeight) {
            tooltip.classList.add("glossary--top");
        } else {
            tooltip.classList.add("glossary--bottom");
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const glossaryTerms = {
        "adjudicate": "Issue decisions",
        "precedent": "A previous ruling used as a guide",
        "tort": "A civil wrongdoing"
        // Add more terms here
    };

    const contentContainer = document.querySelector(".md-content");

    if (contentContainer) {
        Object.keys(glossaryTerms).forEach(term => {
            const definition = glossaryTerms[term];
            const regex = new RegExp(`\\b(${term})\\b`, "gi");

            contentContainer.innerHTML = contentContainer.innerHTML.replace(regex, function (match) {
                const id = `gloss-${match.toLowerCase()}`;
                return `
                    <span class="glossary">
                        <input class="md-toggle" data-md-component="gloss" id="${id}" type="checkbox">
                        <label class="glossary__term" for="${id}">${match}</label>
                        <span class="glossary__tooltip">${definition}</span>
                    </span>
                `;
            });
        });
    }
});

