import { useEffect, useRef, useState } from 'react';

interface CubesProps {
  gridSize?: number;
  maxAngle?: number;
  radius?: number;
  borderStyle?: string;
  faceColor?: string;
  rippleColor?: string;
  rippleSpeed?: number;
  autoAnimate?: boolean;
  rippleOnClick?: boolean;
}

const Cubes = ({
  gridSize = 8,
  maxAngle = 45,
  radius = 3,
  borderStyle = '2px dashed #7CFFB2',
  faceColor = '#050a0a',
  rippleColor = '#7CFFB2',
  rippleSpeed = 1.5,
  autoAnimate = true,
  rippleOnClick = true,
}: CubesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cubes, setCubes] = useState<Array<{ x: number; y: number; rotateX: number; rotateY: number }>>([]);
  const [rippleCenter, setRippleCenter] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const cubeArray = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        cubeArray.push({ x: i, y: j, rotateX: 0, rotateY: 0 });
      }
    }
    setCubes(cubeArray);
  }, [gridSize]);

  useEffect(() => {
    if (!autoAnimate) return;

    const interval = setInterval(() => {
      const randomX = Math.floor(Math.random() * gridSize);
      const randomY = Math.floor(Math.random() * gridSize);
      setRippleCenter({ x: randomX, y: randomY });
    }, 3000);

    return () => clearInterval(interval);
  }, [autoAnimate, gridSize]);

  useEffect(() => {
    if (!rippleCenter) return;

    const timer = setTimeout(() => {
      setRippleCenter(null);
    }, rippleSpeed * 1000);

    return () => clearTimeout(timer);
  }, [rippleCenter, rippleSpeed]);

  const handleClick = (x: number, y: number) => {
    if (rippleOnClick) {
      setRippleCenter({ x, y });
    }
  };

  const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  const getCubeStyle = (x: number, y: number) => {
    let rotateX = 0;
    let rotateY = 0;
    let scale = 1;

    if (rippleCenter) {
      const distance = getDistance(x, y, rippleCenter.x, rippleCenter.y);
      const maxDistance = Math.sqrt(2 * Math.pow(gridSize, 2));
      const normalizedDistance = distance / maxDistance;
      const angle = maxAngle * (1 - normalizedDistance);
      
      rotateX = angle * Math.sin((x - rippleCenter.x) * 0.5);
      rotateY = angle * Math.cos((y - rippleCenter.y) * 0.5);
      scale = 1 + (0.2 * (1 - normalizedDistance));
    }

    return {
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      transition: `transform ${rippleSpeed}s ease-out`,
    };
  };

  const cubeSize = 100 / gridSize;

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      style={{
        perspective: '1000px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      <div
        className="w-full h-full grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          gap: '4px',
        }}
      >
        {cubes.map((cube, index) => (
          <div
            key={index}
            className="relative cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              ...getCubeStyle(cube.x, cube.y),
            }}
            onClick={() => handleClick(cube.x, cube.y)}
          >
            {/* Front face */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: faceColor,
                border: borderStyle,
                transform: `translateZ(${radius}px)`,
                backdropFilter: 'blur(10px)',
              }}
            />
            {/* Back face */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: faceColor,
                border: borderStyle,
                transform: `translateZ(-${radius}px) rotateY(180deg)`,
                backdropFilter: 'blur(10px)',
              }}
            />
            {/* Right face */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: faceColor,
                border: borderStyle,
                transform: `rotateY(90deg) translateZ(${radius}px)`,
                backdropFilter: 'blur(10px)',
              }}
            />
            {/* Left face */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: faceColor,
                border: borderStyle,
                transform: `rotateY(-90deg) translateZ(${radius}px)`,
                backdropFilter: 'blur(10px)',
              }}
            />
            {/* Top face */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: faceColor,
                border: borderStyle,
                transform: `rotateX(90deg) translateZ(${radius}px)`,
                backdropFilter: 'blur(10px)',
              }}
            />
            {/* Bottom face */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: faceColor,
                border: borderStyle,
                transform: `rotateX(-90deg) translateZ(${radius}px)`,
                backdropFilter: 'blur(10px)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cubes;
