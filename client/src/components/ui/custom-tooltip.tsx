import React, { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  delay = 300,
}) => {
  const [active, setActive] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showTip = () => {
    const id = setTimeout(() => {
      setActive(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setActive(false);
  };

  // Position styles
  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-2';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-2';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-2';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2';
    }
  };

  // Arrow position
  const getArrowPosition = () => {
    switch (position) {
      case 'top':
        return 'top-full left-1/2 transform -translate-x-1/2 border-t-slate-800 border-l-transparent border-r-transparent border-b-transparent';
      case 'bottom':
        return 'bottom-full left-1/2 transform -translate-x-1/2 border-b-slate-800 border-l-transparent border-r-transparent border-t-transparent';
      case 'left':
        return 'left-full top-1/2 transform -translate-y-1/2 border-l-slate-800 border-t-transparent border-b-transparent border-r-transparent';
      case 'right':
        return 'right-full top-1/2 transform -translate-y-1/2 border-r-slate-800 border-t-transparent border-b-transparent border-l-transparent';
      default:
        return 'top-full left-1/2 transform -translate-x-1/2 border-t-slate-800 border-l-transparent border-r-transparent border-b-transparent';
    }
  };

  return (
    <div className="relative inline-block" onMouseEnter={showTip} onMouseLeave={hideTip}>
      {active && (
        <div 
          className={`absolute z-50 px-3 py-2 text-xs text-white bg-slate-800 rounded-md shadow-md w-max max-w-xs ${getPositionStyle()} transition-all duration-200 ${active ? 'opacity-100' : 'opacity-0'} whitespace-normal`}
        >
          {content}
          <span 
            className={`absolute w-0 h-0 border-4 ${getArrowPosition()}`} 
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;