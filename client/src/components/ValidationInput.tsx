import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ValidationInputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  className?: string;
  validationMessage?: string;
  autoComplete?: string;
}

export default function ValidationInput({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  pattern,
  minLength,
  maxLength,
  className,
  validationMessage,
  autoComplete,
}: ValidationInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [touched, setTouched] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Validation function
  const validateInput = () => {
    if (!inputRef.current) return true;
    
    const input = inputRef.current;
    
    // Don't show validation errors if field hasn't been interacted with
    if (!touched) return true;
    
    // Skip validation if nothing entered for required fields
    if (required && !value.trim()) {
      setMessage('This field is required');
      return false;
    }
    
    // Email specific validation using regex
    if (type === 'email' && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = emailRegex.test(value);
      if (!isEmailValid) {
        setMessage('Please enter a valid email address');
        return false;
      }
    }
    
    // Pattern validation from provided pattern
    if (pattern && value.trim()) {
      const patternRegex = new RegExp(pattern);
      const isPatternValid = patternRegex.test(value);
      if (!isPatternValid) {
        setMessage(validationMessage || 'Please match the requested format');
        return false;
      }
    }
    
    // Length validation
    if (minLength && value.length < minLength) {
      setMessage(`At least ${minLength} characters required`);
      return false;
    }
    
    if (maxLength && value.length > maxLength) {
      setMessage(`Maximum ${maxLength} characters allowed`);
      return false;
    }
    
    // If we made it here, the input is valid
    setMessage('');
    return true;
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set a new timeout to turn off the typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      // Validate after typing stopped
      setIsValid(validateInput());
    }, 500);
  };
  
  // Handle blur (focus out)
  const handleBlur = () => {
    setIsFocused(false);
    setTouched(true);
    setIsTyping(false);
    
    // Validate on blur
    setIsValid(validateInput());
  };
  
  // Handle focus
  const handleFocus = () => {
    setIsFocused(true);
  };
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);
  
  // Validate when value changes
  useEffect(() => {
    if (value === '') {
      // Reset validation state when field is cleared
      setTouched(false);
      setIsValid(true);
      setMessage('');
    } else if (touched && !isTyping) {
      setIsValid(validateInput());
    }
  }, [value, touched, isTyping]);
  
  return (
    <div className="relative">
      <input
        ref={inputRef}
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        className={cn(
          "w-full px-4 py-3 border rounded-md transition-all duration-300 text-gray-900 dark:text-white font-medium",
          "focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm",
          "block mx-auto", // Add these classes for Firefox compatibility
          "bg-white dark:bg-gray-800 dark:border-gray-700", // Explicit dark mode styling
          "hover:border-primary/60 hover:shadow-sm", // Hover effect
          isFocused ? "border-primary focus:ring-primary/30" : "border-gray-300 dark:border-gray-700", 
          !isValid && touched ? "border-red-500 focus:ring-red-200" : "",
          isValid && value && touched ? "border-green-500 focus:ring-green-200" : "",
          className
        )}
      />
      
      {/* Validation State Icons */}
      {touched && value && !isTyping && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-300">
          {isValid ? (
            <svg 
              className="w-5 h-5 text-green-500 animate-scale-in"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ) : (
            <svg 
              className="w-5 h-5 text-red-500 animate-shake"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          )}
        </div>
      )}
      
      {/* Error Message */}
      {!isValid && touched && message && (
        <p className="text-xs text-red-500 mt-1 ml-1 animate-slide-up">{message}</p>
      )}
    </div>
  );
}