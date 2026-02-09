import { motion } from "framer-motion";
import { 
  SiYoutube, 
  SiInstagram, 
  SiTiktok, 
  SiFacebook, 
  SiTwitter, 
  SiLinkedin,
  SiSnapchat,
  SiPinterest,
  SiReddit,
  SiTwitch
} from 'react-icons/si';

const platforms = [
  { Icon: SiYoutube, name: "YouTube", color: "#FF0000" },
  { Icon: SiInstagram, name: "Instagram", color: "#E4405F" },
  { Icon: SiTiktok, name: "TikTok", color: "#000000" },
  { Icon: SiFacebook, name: "Facebook", color: "#1877F2" },
  { Icon: SiTwitter, name: "Twitter", color: "#1DA1F2" },
  { Icon: SiLinkedin, name: "LinkedIn", color: "#0A66C2" },
  { Icon: SiSnapchat, name: "Snapchat", color: "#FFFC00" },
  { Icon: SiPinterest, name: "Pinterest", color: "#E60023" },
  { Icon: SiReddit, name: "Reddit", color: "#FF4500" },
  { Icon: SiTwitch, name: "Twitch", color: "#9146FF" },
];

const SocialMediaLoop = () => {
  // Triple the platforms for seamless loop
  const allPlatforms = [...platforms, ...platforms, ...platforms];

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container-wide mb-12">
        <div className="text-center">
          <p 
            className="text-sm font-black tracking-[0.3em] uppercase mb-4"
            style={{
              background: 'linear-gradient(90deg, #7CFFB2 0%, #5CE1E6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            PUBLISH EVERYWHERE
          </p>
          <h2 className="font-black text-4xl sm:text-5xl md:text-6xl tracking-tight" style={{ color: '#fff' }}>
            One Click. All Platforms.
          </h2>
        </div>
      </div>

      {/* Fade edges */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, #050a0a, transparent)',
        }}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, #050a0a, transparent)',
        }}
      />

      {/* Scrolling container */}
      <div className="relative h-24 flex items-center">
        <motion.div
          className="flex gap-12 absolute"
          animate={{
            x: [0, -33.333 + "%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {allPlatforms.map((platform, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(124, 255, 178, 0.05)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
              }}
            >
              <platform.Icon 
                className="w-10 h-10"
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <div className="container-wide mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "10+", label: "Platforms" },
            { value: "1-Click", label: "Publishing" },
            { value: "100%", label: "Automated" },
            { value: "∞", label: "Reach" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-xl backdrop-blur-xl"
              style={{
                background: 'rgba(124, 255, 178, 0.05)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
              }}
            >
              <div
                className="text-3xl font-black mb-1"
                style={{
                  background: 'linear-gradient(135deg, #7CFFB2 0%, #5CE1E6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </div>
              <div className="text-white/60 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaLoop;
