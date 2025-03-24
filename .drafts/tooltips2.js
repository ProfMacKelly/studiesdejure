document.addEventListener('DOMContentLoaded', function() {
    const abbrElements = document.querySelectorAll('abbr');

    abbrElements.forEach(function(abbr) {
        if (abbr.hasAttribute('title')) {
            abbr.dataset.originalTitle = abbr.getAttribute('title');
            abbr.removeAttribute('title');
        }
    });

    function createTooltip(event, element, text, styleOverride) {
        const tooltip = document.createElement('div');
        tooltip.innerHTML = text;
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = 'rgb(241, 245, 253)';
        tooltip.style.border = '2px solid #285882';
        tooltip.style.borderRadius = '4px';
        tooltip.style.padding = '5px 10px';
        tooltip.style.fontSize = '14px';
        tooltip.style.zIndex = '9999';
        tooltip.style.maxWidth = '300px';
        tooltip.style.wordWrap = 'break-word';
        if(styleOverride){
            Object.assign(tooltip.style, styleOverride)
        }

        document.body.appendChild(tooltip);

        tooltip.style.left = event.pageX + 10 + 'px';
        tooltip.style.top = event.pageY + 10 + 'px';

        return tooltip;
    }

    function handleTooltipEvents(element, event, createTooltipFunction, styleOverride) {
        let tooltip;

        function removeTooltip() {
            if (tooltip) {
                tooltip.remove();
                element.setAttribute('title', element.dataset.originalTitle);
            }
        }

        element.addEventListener('mouseover', function(event) {
            tooltip = createTooltipFunction(event, element, element.dataset.originalTitle, styleOverride);

            tooltip.addEventListener('mouseenter', function() {
                tooltip.dataset.hover = "true";
            });

            tooltip.addEventListener('mouseleave', function() {
                tooltip.dataset.hover = "false";
                setTimeout(() => {
                    if (tooltip.dataset.hover === "false") {
                        removeTooltip();
                    }
                }, 200);
            });

            element.addEventListener('mouseleave', function() {
                setTimeout(() => {
                    if (!tooltip.matches(':hover')) {
                        removeTooltip();
                    }
                }, 200);
            });
        });

        element.addEventListener('focus', function() {
            tooltip = createTooltipFunction(event, element, element.dataset.originalTitle, styleOverride);
        });

        element.addEventListener('blur', removeTooltip);

        element.addEventListener('contextmenu', function(event) {
            event.preventDefault();
            event.stopPropagation();
            tooltip = createTooltipFunction(event, element, `<a href="#" style="color: #448aff; text-decoration: underline;">${element.dataset.originalTitle}</a>`,{backgroundColor: 'white', border: '1px solid #ccc', fontSize: '16px'});
            tooltip.addEventListener('mouseenter', function() {
                tooltip.dataset.hover = "true";
            });

            tooltip.addEventListener('mouseleave', function() {
                tooltip.dataset.hover = "false";
                setTimeout(() => {
                    if (tooltip.dataset.hover === "false") {
                        removeTooltip();
                    }
                }, 200);
            });

            element.addEventListener('mouseleave', function() {
                setTimeout(() => {
                    if (!tooltip.matches(':hover')) {
                        removeTooltip();
                    }
                }, 200);
            });
        });
    }

    abbrElements.forEach(function(abbr) {
        handleTooltipEvents(abbr, event, createTooltip)
    });
});