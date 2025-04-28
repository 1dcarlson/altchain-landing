// Script to fix all buttons and styling in dark mode
(function() {
  console.log("Style fixer running");

  function fixStyles() {
    // Check if we're in dark mode
    const isDarkMode = document.documentElement.classList.contains('dark') || 
                       document.body.classList.contains('dark') ||
                       window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (!isDarkMode) return; // Only fix things in dark mode
    
    // Find all buttons
    const allButtons = document.querySelectorAll('button');
    
    // ------ FIX LANGUAGE SELECTOR ------
    const languageSelector = document.querySelector('[aria-label="Language Selector"]');
    if (languageSelector) {
      console.log("Fixing language selector");
      // Match the grey background of the page in dark mode
      languageSelector.style.backgroundColor = '#1F2937'; // Dark grey like the page background
      languageSelector.style.border = '1px solid rgba(255, 255, 255, 0.1)';
      languageSelector.style.color = '#e5e7eb';
    }
    
    // ------ FIX JOIN WAITLIST BUTTONS ------
    const joinWaitlistButtons = Array.from(allButtons).filter(button => {
      const text = button.textContent.trim().toLowerCase();
      return text.includes('join waitlist') || text.includes('join the waitlist');
    });
    
    if (joinWaitlistButtons.length >= 2) {
      // Get a working button from the bottom of the page
      const workingButton = joinWaitlistButtons[joinWaitlistButtons.length - 1];
      
      // Apply to all waitlist buttons, especially the top one
      joinWaitlistButtons.forEach(button => {
        // Skip if it's the reference button
        if (button === workingButton) return;
        
        console.log("Fixing a waitlist button");
        
        // Completely recreate the button's content to ensure consistency
        const buttonText = button.innerText.trim();
        
        // Recreate the button's structure
        button.innerHTML = '';
        
        // Add the shimmer effect
        const shimmer = document.createElement('span');
        shimmer.className = "absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer";
        button.appendChild(shimmer);
        
        // Add back the text
        const textSpan = document.createElement('span');
        textSpan.innerText = buttonText;
        textSpan.className = "relative z-10";
        button.appendChild(textSpan);
        
        // Copy classes from the working button
        button.className = workingButton.className;
        
        // Ensure it has basic properties
        button.classList.add('relative', 'overflow-hidden', 'group');
        
        // Make sure it's BLACK in dark mode
        button.style.backgroundColor = '#111827'; // Very dark grey/black
        button.style.color = 'white';
        button.style.borderRadius = '0.5rem';
        button.style.fontWeight = 'bold';
        button.style.padding = '0.75rem 1.5rem';
        button.style.transition = 'all 0.3s ease';
      });
    }
    
    // ------ FIX CONTACT FORM ------
    // Fix the contact form in dark mode
    const contactForm = document.querySelector('form');
    if (contactForm && window.location.pathname.includes('contact')) {
      console.log("Fixing contact form");
      
      // Make the form background grey
      const formSection = contactForm.closest('section');
      if (formSection) {
        formSection.style.backgroundColor = '#1F2937'; // Dark grey
        formSection.style.borderColor = '#374151';
      }
      
      // Fix all inputs in the form to have grey background
      const inputs = contactForm.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.style.backgroundColor = '#374151'; // Lighter grey for inputs
        input.style.color = 'white';
        input.style.borderColor = '#4B5563';
      });
      
      // Find the Send Message button
      const sendButton = Array.from(contactForm.querySelectorAll('button')).find(button => {
        const text = button.textContent.trim().toLowerCase();
        return text.includes('send') || text.includes('message');
      });
      
      if (sendButton) {
        console.log("Fixing send message button");
        
        // Recreate the button with shimmer
        const buttonText = sendButton.innerText.trim();
        
        // Clear and rebuild
        sendButton.innerHTML = '';
        
        // Add the shimmer effect
        const shimmer = document.createElement('span');
        shimmer.className = "absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer";
        sendButton.appendChild(shimmer);
        
        // Add back the text
        const textSpan = document.createElement('span');
        textSpan.innerText = buttonText;
        textSpan.className = "relative z-10";
        sendButton.appendChild(textSpan);
        
        // Style it like the waitlist buttons
        sendButton.className = "relative group overflow-hidden py-2 px-4 rounded-md w-full font-bold bg-primary text-white transition-all duration-300 hover:shadow-lg";
        
        // Make sure it's BLACK in dark mode
        sendButton.style.backgroundColor = '#111827'; // Very dark grey/black
        sendButton.style.color = 'white';
        sendButton.style.borderRadius = '0.5rem';
        sendButton.style.fontWeight = 'bold';
        sendButton.style.padding = '0.75rem 1.5rem';
        sendButton.style.transition = 'all 0.3s ease';
      }
    }
  }
  
  // Run immediately and then every 200ms for continued enforcement
  fixStyles();
  setInterval(fixStyles, 200);
})();