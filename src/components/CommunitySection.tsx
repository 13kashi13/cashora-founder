import { motion } from "framer-motion";
import { MessageCircle, Twitter, Mail, Download, FileText, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CommunitySection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const communityLinks = [
    {
      icon: MessageCircle,
      label: "Join Discord",
      description: "Connect with 5,000+ creators",
      href: "https://discord.gg/cashora",
      color: "#5865F2",
      gradient: "from-[#5865F2] to-[#7289DA]",
    },
    {
      icon: Twitter,
      label: "Follow on Twitter",
      description: "Get latest updates & tips",
      href: "https://twitter.com/cashora",
      color: "#1DA1F2",
      gradient: "from-[#1DA1F2] to-[#0C85D0]",
    },
    {
      icon: Mail,
      label: "Subscribe to Newsletter",
      description: "Weekly insights & strategies",
      href: "#newsletter",
      color: "#7CFFB2",
      gradient: "from-[#7CFFB2] to-[#5CE1E6]",
    },
  ];

  const resources = [
    {
      icon: Download,
      label: "Download Media Kit",
      description: "Logos, assets & brand guidelines",
      href: "#media-kit",
    },
    {
      icon: FileText,
      label: "View Case Studies",
      description: "Real success stories from creators",
      href: "#case-studies",
    },
    {
      icon: Users,
      label: "Compare Plans",
      description: "Find the perfect plan for you",
      href: "#pricing",
    },
  ];

  return (
    <section className="section-spacing relative overflow-hidden" ref={ref}>
      <div className="container-wide">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{
            background: 'linear-gradient(90deg, #7CFFB2 0%, #5CE1E6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Join Our Community
          </h2>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Connect with creators, get support, and stay updated
          </p>
        </motion.div>

        {/* Community Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {communityLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative backdrop-blur-xl rounded-2xl p-8 cursor-pointer overflow-hidden"
              style={{
                background: 'rgba(5, 10, 10, 0.6)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                borderColor: link.color,
                boxShadow: `0 0 40px ${link.color}40`,
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient overlay on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${link.color}40, transparent)`,
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{
                    background: `${link.color}20`,
                    border: `1px solid ${link.color}40`,
                  }}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <link.icon className="w-8 h-8" style={{ color: link.color }} />
                </motion.div>

                <h3 className="text-xl font-bold mb-2" style={{ color: '#fff' }}>
                  {link.label}
                </h3>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {link.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Resources */}
        <motion.div
          className="backdrop-blur-xl rounded-2xl p-8"
          style={{
            background: 'rgba(5, 10, 10, 0.4)',
            border: '1px solid rgba(124, 255, 178, 0.2)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: '#fff' }}>
            Resources & Tools
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            {resources.map((resource, index) => (
              <motion.a
                key={resource.label}
                href={resource.href}
                className="flex items-start gap-4 p-4 rounded-xl cursor-pointer"
                style={{
                  background: 'rgba(124, 255, 178, 0.05)',
                  border: '1px solid rgba(124, 255, 178, 0.2)',
                  transition: 'all 0.15s ease-out',
                }}
                whileHover={{
                  background: 'rgba(124, 255, 178, 0.1)',
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(124, 255, 178, 0.1)',
                    border: '1px solid rgba(124, 255, 178, 0.3)',
                  }}
                >
                  <resource.icon className="w-5 h-5" style={{ color: '#7CFFB2' }} />
                </div>
                <div>
                  <div className="font-semibold mb-1" style={{ color: '#fff' }}>
                    {resource.label}
                  </div>
                  <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {resource.description}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
