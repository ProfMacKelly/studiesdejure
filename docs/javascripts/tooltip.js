document.addEventListener('DOMContentLoaded', function() {
    const abbrElements = document.querySelectorAll('abbr');
  
    abbrElements.forEach(function(abbr) {
      let originalTitle = abbr.getAttribute('title');
  
      abbr.addEventListener('mouseover', function(event) {
        if (originalTitle) {
          this.removeAttribute('title'); // Remove title
  
          const tooltip = document.createElement('div');
          tooltip.textContent = originalTitle;
          tooltip.style.position = 'absolute';
          tooltip.style.backgroundColor = 'white';
          tooltip.style.border = '1px solid #ccc';
          tooltip.style.padding = '5px';
          tooltip.style.fontSize = '16px';
          tooltip.style.zIndex = '1000';
  
          document.body.appendChild(tooltip);
  
          tooltip.style.left = event.pageX + 10 + 'px';
          tooltip.style.top = event.pageY + 10 + 'px';
  
          abbr.addEventListener('mouseout', function() {
            tooltip.remove();
            abbr.setAttribute('title', originalTitle);
          });
        }
      });
  
      // Prevent default tooltip on focus (accessibility)
      abbr.addEventListener('focus', function(event) {
        if (originalTitle) {
          this.removeAttribute('title');
        }
      });
  
      abbr.addEventListener('blur', function(event) {
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
          tooltip.textContent = originalTitle;
          tooltip.style.position = 'absolute';
          tooltip.style.backgroundColor = 'white';
          tooltip.style.border = '1px solid #ccc';
          tooltip.style.padding = '5px';
          tooltip.style.fontSize = '16px';
          tooltip.style.zIndex = '1000';
  
          document.body.appendChild(tooltip);
  
          tooltip.style.left = event.pageX + 10 + 'px';
          tooltip.style.top = event.pageY + 10 + 'px';
  
          abbr.addEventListener('mouseout', function() {
            tooltip.remove();
            abbr.setAttribute('title', originalTitle);
          });
  
          abbr.addEventListener('blur', function(){
            tooltip.remove();
            abbr.setAttribute('title', originalTitle);
          });
          abbr.addEventListener('mouseout', function(){
            tooltip.remove();
            abbr.setAttribute('title', originalTitle);
          });
        }
      });
    });
  });