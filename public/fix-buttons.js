// Script to fix all Join Waitlist buttons and language selector
(function() {
  console.log("Button fixer running");

  function fixButtons() {
    // Find all buttons
    const allButtons = document.querySelectorAll('button');
    
    // Fix the language selector button to be more subtle in dark mode
    const languageSelector = document.querySelector('[aria-label="Language Selector"]');
    if (languageSelector) {
      // Check if we're in dark mode
      const isDarkMode = document.documentElement.classList.contains('dark') || 
                         document.body.classList.contains('dark');
      
      if (isDarkMode) {
        languageSelector.style.backgroundColor = 'transparent';
        languageSelector.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        languageSelector.style.color = '#e5e7eb';
      }
    }
    
    // Wait a moment to ensure all buttons are loaded
    setTimeout(() => {
      // Identify buttons by their text content - looking for the waitlist buttons
      const joinWaitlistButtons = Array.from(allButtons).filter(button => {
        const text = button.textContent.trim().toLowerCase();
        return text.includes('join waitlist') || text.includes('join the waitlist');
      });
      
      if (joinWaitlistButtons.length >= 2) {
        // Get the bottom two buttons that are working correctly
        const workingButtons = joinWaitlistButtons.slice(-2);
        const mainButton = joinWaitlistButtons[0]; // Typically the first button is the main one
        
        if (workingButtons.length > 0 && mainButton) {
          // Get styling from the working button
          const workingButton = workingButtons[0];
          
          console.log("Fixing main waitlist button");
          
          // Copy exact styles from the working button
          mainButton.className = workingButton.className;
          
          // Ensure it has basic properties
          mainButton.classList.add('relative', 'overflow-hidden', 'group');
          
          // Copy exact inline styles
          Array.from(workingButton.style).forEach(property => {
            mainButton.style[property] = workingButton.style[property];
          });
          
          // Make sure it has the shimmer effect
          const hasShimmer = Array.from(mainButton.children).some(child => 
            child.tagName === 'SPAN' && 
            child.className && 
            child.className.includes('shimmer')
          );
          
          if (!hasShimmer) {
            // Find the shimmer in the working button
            const workingShimmer = Array.from(workingButton.children).find(child => 
              child.tagName === 'SPAN' && 
              child.className && 
              (child.className.includes('shimmer') || 
               child.className.includes('absolute'))
            );
            
            if (workingShimmer) {
              // Clone the shimmer effect
              const clonedShimmer = workingShimmer.cloneNode(true);
              mainButton.insertBefore(clonedShimmer, mainButton.firstChild);
            } else {
              // Create a new shimmer effect from scratch
              const shimmer = document.createElement('span');
              shimmer.className = "absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer";
              mainButton.insertBefore(shimmer, mainButton.firstChild);
            }
          }
          
          // Get the text content only
          const buttonText = mainButton.innerText.trim();
          
          // Clear button content
          mainButton.innerHTML = '';
          
          // Re-add the shimmer
          const shimmer = document.createElement('span');
          shimmer.className = "absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer";
          mainButton.appendChild(shimmer);
          
          // Add back the text
          const textSpan = document.createElement('span');
          textSpan.innerText = buttonText;
          textSpan.className = "relative z-10";
          mainButton.appendChild(textSpan);
          
          // Force style properties for consistency
          mainButton.style.backgroundColor = '#4F46E5';
          mainButton.style.color = 'white';
          mainButton.style.borderRadius = '0.5rem';
          mainButton.style.fontWeight = 'bold';
          mainButton.style.padding = '0.75rem 1.5rem';
          mainButton.style.transition = 'all 0.3s ease';
        }
      }
    }, 100);
  }
  
  // Run immediately and then every 300ms for continued enforcement
  fixButtons();
  setInterval(fixButtons, 300);
})();