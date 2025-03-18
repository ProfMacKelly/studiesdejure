document.addEventListener('DOMContentLoaded', function() {
  const abbrElements = document.querySelectorAll('abbr');

  abbrElements.forEach(function(abbr) {
      let originalTitle = abbr.getAttribute('title');

      abbr.addEventListener('mouseover', function(event) {
          if (originalTitle) {
              this.removeAttribute('title'); // Remove default tooltip

              const tooltip = document.createElement('div');
              tooltip.innerHTML = `<a text-decoration: none;">${originalTitle}</a>`;
              tooltip.style.position = 'absolute';
              tooltip.style.backgroundColor = ' #edf3ff';
              tooltip.style.border = '2px solid #285882';
              tooltip.style.borderRadius = '4px';
              tooltip.style.padding = '5px 10px';
              tooltip.style.fontSize = '15px';
              tooltip.style.zIndex = '9999';
              tooltip.style.maxWidth = '250px';
              tooltip.style.wordwrap = 'break-word'; // Ensures long words wrap instead of overflowing

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
              tooltip.style.backgroundColor = 'white';
              tooltip.style.border = '1px solid #ccc';
              tooltip.style.padding = '5px';
              tooltip.style.fontSize = '16px';
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
