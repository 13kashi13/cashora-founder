import LogoLoop from './LogoLoop';
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

const platformLogos = [
  { node: <SiYoutube />, title: "YouTube", href: "https://youtube.com" },
  { node: <SiInstagram />, title: "Instagram", href: "https://instagram.com" },
  { node: <SiTiktok />, title: "TikTok", href: "https://tiktok.com" },
  { node: <SiFacebook />, title: "Facebook", href: "https://facebook.com" },
  { node: <SiTwitter />, title: "Twitter", href: "https://twitter.com" },
  { node: <SiLinkedin />, title: "LinkedIn", href: "https://linkedin.com" },
  { node: <SiSnapchat />, title: "Snapchat", href: "https://snapchat.com" },
  { node: <SiPinterest />, title: "Pinterest", href: "https://pinterest.com" },
  { node: <SiReddit />, title: "Reddit", href: "https://reddit.com" },
  { node: <SiTwitch />, title: "Twitch", href: "https://twitch.tv" },
];

const PlatformLogoLoop = () => {
  return (
    <section className="section-spacing relative overflow-hidden">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <p 
            className="text-sm font-black tracking-[0.3em] uppercase mb-6"
            style={{
              background: 'linear-gradient(90deg, #7CFFB2 0%, #5CE1E6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.3em',
            }}
          >
            PUBLISH EVERYWHERE
          </p>
          <h2 className="font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1]" style={{ color: '#fff' }}>
            One Click. All Platforms.
          </h2>
          <p className="text-white/70 mt-6 text-lg font-medium max-w-2xl mx-auto">
            Automatically distribute your content across every major social media platform
          </p>
        </div>

        {/* Logo Loop */}
        <div className="relative">
          <LogoLoop
            logos={platformLogos}
            speed={40}
            direction="left"
            logoHeight={80}
            gap={80}
            hoverSpeed={5}
            scaleOnHover
            fadeOut
            fadeOutColor="#050a0a"
            ariaLabel="Supported social media platforms"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { value: "10+", label: "Platforms" },
            { value: "1-Click", label: "Publishing" },
            { value: "100%", label: "Automated" },
            { value: "∞", label: "Reach" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl backdrop-blur-xl"
              style={{
                background: 'rgba(124, 255, 178, 0.05)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
                boxShadow: '0 4px 16px rgba(124, 255, 178, 0.1)',
              }}
            >
              <div
                className="text-4xl font-black mb-2"
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

export default PlatformLogoLoop;
