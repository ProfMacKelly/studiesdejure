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

document.addEventListener('DOMContentLoaded', function() {
    const abbrElements = document.querySelectorAll('abbr');
  
    abbrElements.forEach(function(abbr) {
        let originalTitle = abbr.getAttribute('title');
  
        abbr.addEventListener('mouseover', function(event) {
            event.preventDefault(); // Prevent default tooltip from showing
            if (originalTitle) {
                this.removeAttribute('title'); // Remove default tooltip
  
                const tooltip = document.createElement('div');
                tooltip.innerHTML = `<a text-decoration: none;">${originalTitle}</a>`;
                tooltip.style.position = 'absolute';
                tooltip.style.backgroundColor = 'white';
                tooltip.style.border = 'none';
                tooltip.style.borderRadius = '.1rem';
                tooltip.style.padding = '.8rem';
                tooltip.style.fontSize = '1.4em';
                tooltip.style.zIndex = '9999';
                tooltip.style.maxWidth = '400px';
                tooltip.style.wordwrap = 'break-word'; // Ensures long words wrap instead of overflowing
                tooltip.style.boxShadow = '6px 6px 15px rgba(0, 0, 0, 0.2)'; // Adds a subtle shadow for better visibility
                tooltip.style.fontFamily = 'default'; // Ensures consistent font
                tooltip.style.lineHeight = '1.6'; // Improves readability
  
                document.body.appendChild(tooltip);
  
                tooltip.style.left = event.pageX + 10 + 'px';
                tooltip.style.top = event.pageY + 10 + 'px';
  
                // Keep tooltip open when hovering over it
                tooltip.addEventListener('mouseenter', function() {
                    tooltip.dataset.hover = "true";
                });
  
                tooltip.addEventListener('mouseleave', function() {
                    tooltip.dataset.hover = "false";
                    setTimeout(() => {
                        if (tooltip.dataset.hover === "false") {
                            tooltip.remove();
                            abbr.setAttribute('title', originalTitle);
                        }
                    }, 200);
                });
  
                // Close tooltip only when the mouse leaves both the abbr and tooltip
                abbr.addEventListener('mouseleave', function() {
                    setTimeout(() => {
                        if (!tooltip.matches(':hover')) {
                            tooltip.remove();
                            abbr.setAttribute('title', originalTitle);
                        }
                    }, 200);
                });
            }
        });
  
        // Accessibility: Prevent default tooltip on focus
        abbr.addEventListener('focus', function() {
            if (originalTitle) {
                this.removeAttribute('title');
            }
        });
  
        abbr.addEventListener('blur', function() {
            if (originalTitle) {
                this.setAttribute('title', originalTitle);
            }
        });
  
        // Prevent default tooltip on contextmenu (right-click)
        abbr.addEventListener('contextmenu', function(event) {
            if (originalTitle) {
                event.preventDefault(); // Prevent default context menu
                this.removeAttribute('title');
  
                const tooltip = document.createElement('div');
                tooltip.innerHTML = `<a href="#" style="color: #448aff; text-decoration: underline;">${originalTitle}</a>`;
                tooltip.style.position = 'absolute';
                tooltip.style.backgroundColor = 'none';
                tooltip.style.border = 'none';
                tooltip.style.padding = '5px';
                tooltip.style.fontSize = '14px';
                tooltip.style.zIndex = '1000';
             
  
                document.body.appendChild(tooltip);
  
                tooltip.style.left = event.pageX + 10 + 'px';
                tooltip.style.top = event.pageY + 10 + 'px';
  
                tooltip.addEventListener('mouseenter', function() {
                    tooltip.dataset.hover = "true";
                });
  
                tooltip.addEventListener('mouseleave', function() {
                    tooltip.dataset.hover = "false";
                    setTimeout(() => {
                        if (tooltip.dataset.hover === "false") {
                            tooltip.remove();
                            abbr.setAttribute('title', originalTitle);
                        }
                    }, 200);
                });
  
                abbr.addEventListener('mouseleave', function() {
                    setTimeout(() => {
                        if (!tooltip.matches(':hover')) {
                            tooltip.remove();
                            abbr.setAttribute('title', originalTitle);
                        }
                    }, 200);
                });
            }
        });
    });
  });
  