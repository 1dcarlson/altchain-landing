import React from 'react';
import { useTheme } from '@/hooks/theme-provider';

/**
 * Simplified background component with a static gradient
 */
export default function InteractiveBackground() {
  // Get theme colors from context
  const { colors } = useTheme();
  
  // Return a simple static background
  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ 
        background: 'linear-gradient(135deg, #f0f4f8, #d9e6f2)',
        opacity: 0.4
      }}
    />
  );
}