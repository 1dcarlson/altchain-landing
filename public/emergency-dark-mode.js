// Enhanced Emergency Dark Mode Fixer 
// This script operates outside React and forcefully applies CSS overrides

(function() {
  console.log("Enhanced emergency dark mode fixer running");
  
  // Force inject the CSS file with cache busting
  function injectCss() {
    // Remove any existing emergency CSS to prevent duplicates
    const existingLinks = document.querySelectorAll('link[href*="emergency-dark-mode.css"]');
    existingLinks.forEach(link => link.remove());
    
    // Create a new link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/emergency-dark-mode.css?v=' + new Date().getTime();
    link.id = 'emergency-dark-mode-css';
    
    // Add it to the head with high priority
    document.head.appendChild(link);
    
    console.log("Emergency dark mode CSS injected");
  }
  
  // Call immediately
  injectCss();
  
  // Also inject after page fully loads and on route changes
  window.addEventListener('load', injectCss);
  
  // Helper function to check if we're in dark mode
  function isDarkMode() {
    return document.documentElement.classList.contains('dark') || 
           document.body.classList.contains('dark') ||
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  
  // Apply dark mode classes and direct styles
  function applyDarkModeStyles() {
    if (isDarkMode()) {
      console.log("Applying dark mode styles");
      
      // Force dark mode class on root elements
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      
      // Apply styles to form inputs
      const inputs = document.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.style.backgroundColor = '#374151';
        input.style.color = 'white';
        input.style.borderColor = '#4b5563';
      });
      
      // Find and fix the contact form if on contact page
      if (window.location.pathname.includes('contact')) {
        const contactForm = document.querySelector('form');
        if (contactForm) {
          const formSection = contactForm.closest('section');
          if (formSection) {
            formSection.style.backgroundColor = '#1F2937';
            formSection.style.borderColor = '#374151';
          }
          
          // Fix the send button
          const sendButton = Array.from(contactForm.querySelectorAll('button')).find(btn => 
            btn.innerText.toLowerCase().includes('send') || 
            btn.innerText.toLowerCase().includes('message')
          );
          
          if (sendButton) {
            sendButton.style.backgroundColor = '#111827';
            sendButton.style.color = 'white';
            
            // Add shimmer if not present
            if (!sendButton.querySelector('.shimmer-effect')) {
              sendButton.classList.add('relative', 'overflow-hidden', 'group');
              
              const shimmer = document.createElement('span');
              shimmer.className = "shimmer-effect absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer";
              
              // Add shimmer as first child
              sendButton.insertBefore(shimmer, sendButton.firstChild);
            }
          }
        }
      }
      
      // Find all Join Waitlist buttons
      const waitlistButtons = Array.from(document.querySelectorAll('button')).filter(btn => 
        btn.innerText.toLowerCase().includes('join waitlist') || 
        btn.innerText.toLowerCase().includes('join the waitlist')
      );
      
      waitlistButtons.forEach(button => {
        button.style.backgroundColor = '#111827';
        button.style.color = 'white';
        
        // Ensure button has the shimmer effect
        if (!button.querySelector('.shimmer-effect')) {
          button.classList.add('relative', 'overflow-hidden', 'group');
          
          const shimmer = document.createElement('span');
          shimmer.className = "shimmer-effect absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer";
          
          // Add shimmer as first child
          button.insertBefore(shimmer, button.firstChild);
        }
      });
      
      // Fix language selector
      const languageSelector = document.querySelector('[aria-label="Language Selector"]');
      if (languageSelector) {
        languageSelector.style.backgroundColor = '#1F2937';
        languageSelector.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        languageSelector.style.color = '#e5e7eb';
      }
    }
  }
  
  // Function to monitor for SPA navigation
  function monitorNavigation() {
    let lastPathname = window.location.pathname;
    
    setInterval(() => {
      if (window.location.pathname !== lastPathname) {
        lastPathname = window.location.pathname;
        console.log("Route changed, reapplying dark mode styles");
        
        // Re-inject CSS and apply styles after a small delay to ensure DOM is updated
        setTimeout(() => {
          injectCss();
          applyDarkModeStyles();
        }, 100);
      }
    }, 200);
  }
  
  // Start monitoring for navigation changes
  monitorNavigation();
  
  // Apply styles immediately and then periodically
  applyDarkModeStyles();
  setInterval(applyDarkModeStyles, 500);
})();