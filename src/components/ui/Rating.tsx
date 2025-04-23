import React from 'react';
import { BookOpen } from 'lucide-react';

type RatingProps = {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  onChange?: (newValue: number) => void;
};

const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 'md',
  showValue = false,
  onChange,
}) => {
  const isInteractive = !!onChange;
  
  const sizeMap = {
    sm: { iconSize: 16, containerClass: 'gap-0.5' },
    md: { iconSize: 20, containerClass: 'gap-1' },
    lg: { iconSize: 24, containerClass: 'gap-1.5' },
  };
  
  const { iconSize, containerClass } = sizeMap[size];
  
  const handleClick = (index: number) => {
    if (onChange) {
      onChange(index + 1);
    }
  };
  
  return (
    <div className="flex items-center">
      <div className={`flex items-center ${containerClass}`}>
        {[...Array(max)].map((_, index) => {
          const isFilled = index < Math.floor(value);
          const isHalfFilled = index === Math.floor(value) && value % 1 !== 0;
          
          return (
            <div
              key={index}
              onClick={() => isInteractive && handleClick(index)}
              className={`${isInteractive ? 'cursor-pointer' : ''}`}
            >
              {isFilled ? (
                <BookOpen
                  size={iconSize}
                  className="text-[#DAA520] fill-[#DAA520]"
                />
              ) : isHalfFilled ? (
                <div className="relative">
                  <BookOpen
                    size={iconSize}
                    className="text-gray-300"
                  />
                  <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                    <BookOpen
                      size={iconSize}
                      className="text-[#DAA520] fill-[#DAA520]"
                    />
                  </div>
                </div>
              ) : (
                <BookOpen
                  size={iconSize}
                  className="text-gray-300"
                />
              )}
            </div>
          );
        })}
      </div>
      
      {showValue && (
        <span className="ml-2 text-sm font-medium text-gray-700">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;