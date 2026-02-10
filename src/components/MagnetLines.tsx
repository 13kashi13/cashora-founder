import { useEffect, useRef, useState } from 'react';

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  style?: React.CSSProperties;
}

const MagnetLines = ({
  rows = 10,
  columns = 12,
  containerSize = '40vmin',
  lineColor = '#7CFFB2',
  lineWidth = '2px',
  lineHeight = '30px',
  baseAngle = 0,
  style = {},
}: MagnetLinesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isHovering) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  const getLineStyle = (row: number, col: number) => {
    if (!isHovering) {
      return {
        transform: `rotate(${baseAngle}deg)`,
        transition: 'transform 0.3s ease-out',
      };
    }

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const containerHeight = containerRef.current?.offsetHeight || 0;
    
    const lineX = (col / columns) * containerWidth;
    const lineY = (row / rows) * containerHeight;
    
    const dx = mousePos.x - lineX;
    const dy = mousePos.y - lineY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = Math.sqrt(containerWidth * containerWidth + containerHeight * containerHeight);
    
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const influence = Math.max(0, 1 - distance / (maxDistance * 0.5));
    const finalAngle = baseAngle + (angle * influence);
    
    return {
      transform: `rotate(${finalAngle}deg)`,
      transition: 'transform 0.15s ease-out',
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        width: containerSize,
        height: containerSize,
        ...style,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="w-full h-full grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: '0',
        }}
      >
        {Array.from({ length: rows * columns }).map((_, index) => {
          const row = Math.floor(index / columns);
          const col = index % columns;
          
          return (
            <div
              key={index}
              className="flex items-center justify-center"
            >
              <div
                style={{
                  width: lineWidth,
                  height: lineHeight,
                  backgroundColor: lineColor,
                  borderRadius: '2px',
                  ...getLineStyle(row, col),
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MagnetLines;
