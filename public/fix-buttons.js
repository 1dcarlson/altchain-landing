// Script to fix all buttons and styling in dark mode - Extreme Mode
(function() {
  console.log("Style fixer running - EXTREME MODE");

  function fixStyles() {
    // Check if we're in dark mode
    const isDarkMode = document.documentElement.classList.contains('dark') || 
                       document.body.classList.contains('dark') ||
                       window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (!isDarkMode) return; // Only fix things in dark mode
    
    // ------ FIX LANGUAGE SELECTOR - EXTREME MODE ------
    const languageSelector = document.querySelector('[aria-label="Language Selector"]');
    if (languageSelector) {
      console.log("Fixing language selector - EXTREME MODE");
      
      // Force grey background to match the page
      // Use !important through style.setProperty
      languageSelector.style.setProperty('background-color', '#1F2937', 'important');
      languageSelector.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.1)', 'important');
      languageSelector.style.setProperty('color', '#e5e7eb', 'important');
      
      // Fix dropdown too when it appears
      const dropdown = document.querySelector('[role="menu"]');
      if (dropdown) {
        dropdown.style.setProperty('background-color', '#1F2937', 'important');
        dropdown.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.1)', 'important');
        dropdown.style.setProperty('box-shadow', '0 4px 6px -1px rgba(0, 0, 0, 0.5)', 'important');
        dropdown.style.setProperty('opacity', '1', 'important');
        
        // Fix all dropdown items
        const dropdownItems = dropdown.querySelectorAll('li, a, button');
        dropdownItems.forEach(item => {
          item.style.setProperty('background-color', '#1F2937', 'important');
          item.style.setProperty('color', '#e5e7eb', 'important');
          
          // On hover
          item.addEventListener('mouseenter', () => {
            item.style.setProperty('background-color', '#374151', 'important');
          });
          
          item.addEventListener('mouseleave', () => {
            item.style.setProperty('background-color', '#1F2937', 'important');
          });
        });
      }
      
      // Fix the icon inside (the globe)
      const icon = languageSelector.querySelector('svg');
      if (icon) {
        // Make sure the SVG and its container have the same background
        icon.style.setProperty('background-color', '#1F2937', 'important');
        const iconParent = icon.parentElement;
        if (iconParent) {
          iconParent.style.setProperty('background-color', '#1F2937', 'important');
        }
      }
    }
    
    // ------ FIX JOIN WAITLIST BUTTONS - EXTREME MODE ------
    const joinWaitlistButtons = Array.from(document.querySelectorAll('button')).filter(button => {
      const text = button.textContent.trim().toLowerCase();
      return text.includes('join waitlist') || text.includes('join the waitlist');
    });
    
    // Find the top button specifically (it's usually the first one)
    if (joinWaitlistButtons.length > 0) {
      // Force fix ALL buttons, especially the first one
      joinWaitlistButtons.forEach(button => {
        console.log("Fixing waitlist button - EXTREME MODE");
        
        // Save button text
        const buttonText = button.innerText.trim();
        
        // Clear everything
        button.innerHTML = '';
        
        // Add shine effect
        const shimmer = document.createElement('span');
        shimmer.className = "absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer";
        shimmer.style.setProperty('position', 'absolute', 'important');
        shimmer.style.setProperty('inset', '0', 'important');
        shimmer.style.setProperty('width', '100%', 'important');
        shimmer.style.setProperty('height', '100%', 'important');
        button.appendChild(shimmer);
        
        // Add text back
        const textSpan = document.createElement('span');
        textSpan.innerText = buttonText;
        textSpan.style.setProperty('position', 'relative', 'important');
        textSpan.style.setProperty('z-index', '10', 'important');
        button.appendChild(textSpan);
        
        // Force all the styles needed with !important
        button.style.setProperty('position', 'relative', 'important');
        button.style.setProperty('overflow', 'hidden', 'important');
        button.style.setProperty('background-color', '#111827', 'important'); // BLACK!
        button.style.setProperty('color', 'white', 'important');
        button.style.setProperty('border-radius', '0.5rem', 'important');
        button.style.setProperty('font-weight', 'bold', 'important');
        button.style.setProperty('padding', '0.75rem 1.5rem', 'important');
        button.style.setProperty('transition', 'all 0.3s ease', 'important');
        
        // Add all needed classes
        button.classList.add('relative', 'overflow-hidden', 'group');
      });
    }
    
    // ------ FIX CONTACT FORM - EXTREME MODE ------
    if (window.location.pathname.includes('contact')) {
      const contactForm = document.querySelector('form');
      if (contactForm) {
        console.log("Fixing contact form - EXTREME MODE");
        
        // Get form section
        const formSection = contactForm.closest('section');
        if (formSection) {
          formSection.style.setProperty('background-color', '#1F2937', 'important');
          formSection.style.setProperty('border-color', '#374151', 'important');
        }
        
        // Fix inputs to match waitlist form - GREY NOT BLACK!
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
          // Force it to be the SAME GREY as the waitlist form
          input.style.setProperty('background-color', '#374151', 'important'); // GREY to match waitlist
          input.style.setProperty('color', 'white', 'important');
          input.style.setProperty('border-color', '#4B5563', 'important');
          
          // Also fix any parent elements that might be overriding
          let parent = input.parentElement;
          while (parent && parent !== formSection) {
            if (parent.style) {
              parent.style.setProperty('background-color', 'transparent', 'important');
            }
            parent = parent.parentElement;
          }
        });
        
        // Fix send button
        const sendButton = Array.from(contactForm.querySelectorAll('button')).find(btn => 
          btn.textContent.trim().toLowerCase().includes('send') || 
          btn.textContent.trim().toLowerCase().includes('message')
        );
        
        if (sendButton) {
          // Save text
          const buttonText = sendButton.textContent.trim();
          
          // Rebuild
          sendButton.innerHTML = '';
          
          // Add shimmer
          const shimmer = document.createElement('span');
          shimmer.className = "absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer";
          shimmer.style.setProperty('position', 'absolute', 'important');
          shimmer.style.setProperty('inset', '0', 'important');
          shimmer.style.setProperty('width', '100%', 'important');
          shimmer.style.setProperty('height', '100%', 'important');
          sendButton.appendChild(shimmer);
          
          // Add text back
          const textSpan = document.createElement('span');
          textSpan.innerText = buttonText;
          textSpan.style.setProperty('position', 'relative', 'important');
          textSpan.style.setProperty('z-index', '10', 'important');
          sendButton.appendChild(textSpan);
          
          // Force styles
          sendButton.style.setProperty('position', 'relative', 'important');
          sendButton.style.setProperty('overflow', 'hidden', 'important');
          sendButton.style.setProperty('background-color', '#111827', 'important'); // BLACK
          sendButton.style.setProperty('color', 'white', 'important');
          sendButton.style.setProperty('border-radius', '0.5rem', 'important');
          sendButton.style.setProperty('font-weight', 'bold', 'important');
          sendButton.style.setProperty('padding', '0.75rem 1.5rem', 'important');
          sendButton.style.setProperty('transition', 'all 0.3s ease', 'important');
          sendButton.style.setProperty('width', '100%', 'important');
          
          // Add classes
          sendButton.classList.add('relative', 'overflow-hidden', 'group');
        }
      }
    }
  }
  
  // Run immediately and then very frequently (every 100ms)
  fixStyles();
  setInterval(fixStyles, 100);
  
  // Also run on mouse movements which might trigger dropdown menus
  document.addEventListener('mousemove', () => {
    setTimeout(fixStyles, 50);
  });
  
  // Run on clicks which might open dropdowns
  document.addEventListener('click', () => {
    setTimeout(fixStyles, 50);
    setTimeout(fixStyles, 200); // Run again after a bit longer
  });
})();