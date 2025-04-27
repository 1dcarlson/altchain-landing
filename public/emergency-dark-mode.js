// Emergency Dark Mode Fixer 
// This script operates outside React and forcefully applies CSS overrides

(function() {
  console.log("Emergency dark mode fixer running");
  
  // Force inject the CSS file
  function injectCss() {
    // Create a new link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/emergency-dark-mode.css?v=' + new Date().getTime(); // Cache busting
    
    // Add it to the head
    document.head.appendChild(link);
    
    console.log("Emergency dark mode CSS injected");
  }
  
  // Call immediately
  injectCss();
  
  // Also inject after page fully loads
  window.addEventListener('load', injectCss);
  
  // Reapply dark mode classes to make sure they're set
  function applyDarkModeClasses() {
    // Check for system dark mode preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      
      // Force dark mode styles on specific elements
      const inputs = document.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.style.backgroundColor = '#1f2937';
        input.style.color = 'white';
        input.style.borderColor = '#4b5563';
      });
      
      // Force contact form section styles
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        section.style.backgroundColor = '#111827';
        section.style.borderColor = '#374151';
      });
    }
  }
  
  // Call periodically to ensure dark mode is applied
  setInterval(applyDarkModeClasses, 1000);
})();