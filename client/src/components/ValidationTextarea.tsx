import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ValidationTextareaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  rows?: number;
  className?: string;
  validationMessage?: string;
}

export default function ValidationTextarea({
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  minLength,
  maxLength,
  rows = 4,
  className,
  validationMessage,
}: ValidationTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [touched, setTouched] = useState(false);
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Update character count
  useEffect(() => {
    setCharCount(value.length);
  }, [value]);
  
  // Validation function
  const validateTextarea = () => {
    if (!textareaRef.current) return true;
    
    // Don't show validation errors if field hasn't been interacted with
    if (!touched) return true;
    
    // Skip validation if nothing entered for required fields
    if (required && !value.trim()) {
      setMessage('This field is required');
      return false;
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
    
    // If we made it here, the textarea is valid
    setMessage('');
    return true;
  };
  
  // Handle textarea change
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      setIsValid(validateTextarea());
    }, 500);
  };
  
  // Handle blur (focus out)
  const handleBlur = () => {
    setIsFocused(false);
    setTouched(true);
    setIsTyping(false);
    
    // Validate on blur
    setIsValid(validateTextarea());
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
      setIsValid(validateTextarea());
    }
  }, [value, touched, isTyping]);
  
  // Character count color
  const getCharCountColor = () => {
    if (!maxLength) return 'text-gray-400';
    
    const ratio = value.length / maxLength;
    if (ratio > 0.9) return 'text-red-500';
    if (ratio > 0.7) return 'text-yellow-500';
    return 'text-gray-400';
  };
  
  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        name={name}
        value={value}
        onChange={handleTextareaChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={cn(
          "w-full px-4 py-2 border rounded-md transition-all duration-300 text-gray-900 font-medium",
          "focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-y",
          isFocused ? "border-primary focus:ring-primary/30" : "border-gray-300", 
          !isValid && touched ? "border-red-500 focus:ring-red-200" : "",
          isValid && value && touched ? "border-green-500 focus:ring-green-200" : "",
          className
        )}
      />
      
      {/* Validation State Icons */}
      {touched && value && !isTyping && (
        <div className="absolute right-3 top-3 transition-all duration-300">
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
      
      {/* Character Count */}
      {(maxLength || minLength) && (
        <div className={`absolute right-3 bottom-2 text-xs ${getCharCountColor()} transition-colors`}>
          {charCount}
          {maxLength ? `/${maxLength}` : ''}
        </div>
      )}
      
      {/* Error Message */}
      {!isValid && touched && message && (
        <p className="text-xs text-red-500 mt-1 ml-1 animate-slide-up">{message}</p>
      )}
    </div>
  );
}