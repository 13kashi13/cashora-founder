import { motion } from 'framer-motion';
import { 
  SiYoutube, 
  SiInstagram, 
  SiLinkedin, 
  SiX,
  SiFacebook, 
  SiReddit,
  SiDiscord,
  SiPinterest,
  SiSnapchat
} from 'react-icons/si';

const platforms = [
  { Icon: SiYoutube, name: 'YouTube', color: '#FF0000' },
  { Icon: SiInstagram, name: 'Instagram', color: '#E4405F' },
  { Icon: SiLinkedin, name: 'LinkedIn', color: '#0A66C2' },
  { Icon: SiX, name: 'X', color: '#000000' },
  { Icon: SiFacebook, name: 'Facebook', color: '#1877F2' },
  { Icon: SiReddit, name: 'Reddit', color: '#FF4500' },
  { Icon: SiDiscord, name: 'Discord', color: '#5865F2' },
  { Icon: SiPinterest, name: 'Pinterest', color: '#E60023' },
  { Icon: SiSnapchat, name: 'Snapchat', color: '#FFFC00' },
];

interface ScrollingPlatformsProps {
  duration?: number;
}

const ScrollingPlatforms = ({ duration = 20 }: ScrollingPlatformsProps) => {
  // Triple the platforms for ultra-smooth seamless loop
  const allPlatforms = [...platforms, ...platforms, ...platforms];
  
  // Calculate exact width: icon width (64px) + gap (24px) = 88px per icon
  const singleSetWidth = platforms.length * 88;

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Subtle label - reduced opacity */}
      <p className="text-center text-xs font-bold uppercase tracking-wider mb-4" 
        style={{ color: 'rgba(124, 255, 178, 0.4)' }}
      >
        Publish to All Platforms
      </p>
      
      {/* Scrolling container - fully transparent, inherits hero background */}
      <div 
        className="relative h-20 md:h-24 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
      >
        {/* Scrolling strip - seamless infinite loop */}
        <motion.div
          className="flex gap-6"
          animate={{
            x: [-singleSetWidth, -singleSetWidth * 2],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: duration,
              ease: 'linear',
            },
          }}
          style={{
            willChange: 'transform',
            display: 'flex',
          }}
        >
          {allPlatforms.map((platform, index) => (
            <div
              key={`${platform.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(124, 255, 178, 0.15)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15), 0 0 10px rgba(124, 255, 178, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              }}
            >
              <platform.Icon 
                className="w-7 h-7 md:w-9 md:h-9"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  filter: 'drop-shadow(0 0 6px rgba(124, 255, 178, 0.2))',
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollingPlatforms;
