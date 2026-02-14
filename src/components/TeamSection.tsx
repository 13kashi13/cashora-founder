import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin } from 'lucide-react';

const TeamSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const team = [
    {
      name: "VAIBHAV GAWAI",
      title: "FOUNDER",
      location: "Pune, Maharashtra",
      image: "/founder.jpg",
      linkedin: "https://www.linkedin.com/in/vaibhav-gawai-8777a0235/?originalSubdomain=in",
      instagram: "https://www.instagram.com/vaibhav_gawai10?igsh=MThtZmMza2hicjc0eQ==",
    },
    {
      name: "VAIBHAV SINGH",
      title: "CO-FOUNDER",
      location: "Uttar Pradesh, India",
      image: "/cofounder.jpg",
      linkedin: "#",
      instagram: "#",
    },
  ];

  return (
    <section 
      id="team"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-background via-violet-950/5 to-background"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Section Title */}
        <motion.div variants={cardVariants} className="text-center mb-20">
          <motion.p 
            className="text-primary text-sm font-medium tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Our Team
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Meet the <span className="gradient-text">Founders</span>
          </motion.h2>
        </motion.div>

        {/* Team Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-violet-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10">
                
                {/* Photo Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-violet-950/20 to-purple-950/20">
                  {/* Subtle glow overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-violet-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  />
                  
                  {/* Photo */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      filter: 'brightness(0.95) contrast(1.05)',
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                </div>

                {/* Info Container */}
                <div className="relative p-8">
                  {/* Name */}
                  <motion.h3 
                    className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {member.name}
                  </motion.h3>
                  
                  {/* Title */}
                  <p className="text-violet-300 font-medium text-lg mb-4 tracking-wide">
                    {member.title}
                  </p>
                  
                  {/* Location */}
                  <div className="flex items-center gap-2 text-gray-400 mb-6">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{member.location}</span>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    {member.linkedin !== "#" && (
                      <motion.a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-4 h-4 text-gray-400 hover:text-[#0A66C2] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </motion.a>
                    )}
                    
                    {member.instagram !== "#" && (
                      <motion.a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-4 h-4 text-gray-400 hover:text-[#E4405F] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.1), transparent 70%)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TeamSection;
