import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FounderSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Ultra smooth animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Achievements
  const achievements = [
    "Founded Cashora - AI-powered content automation platform",
    "Focused on democratizing content creation through AI",
    "Passionate about building tools that remove barriers to earning",
    "Building in public and learning from the community"
  ];

  const name = "VAIBHAV GAWAI";

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Animated glowing background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Moving gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{
            x: [0, 150, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{
            x: [0, -150, 0],
            y: [0, 80, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(147, 51, 234, 0.5) 0%, transparent 70%)",
            filter: "blur(120px)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-violet-950/10 via-purple-950/20 to-violet-950/10 pointer-events-none"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {["MEET", "THE", "FOUNDER"].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-4"
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  delay: i * 0.2,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  scale: 1.1,
                  color: "hsl(270, 80%, 65%)",
                  transition: { duration: 0.2 },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Founder Photo */}
          <motion.div 
            variants={photoVariants}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-2xl">
              {/* Simple glow effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-violet-500/30 via-purple-500/20 to-fuchsia-500/30 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                animate={{
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Photo container */}
              <div className="relative aspect-[4/5] bg-gradient-to-br from-violet-950/30 to-purple-950/30 backdrop-blur-sm overflow-hidden">
                {/* Placeholder gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-purple-900/40 to-indigo-900/40" />
                
                <img
                  src="/founder.jpg"
                  alt="Vaibhav Gawai - Founder of Cashora"
                  className="relative w-full h-full object-cover object-center"
                  loading="lazy"
                  style={{
                    filter: 'brightness(0.95) contrast(1.05)',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              
              {/* Simple border */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-violet-400/30 pointer-events-none" />
            </div>
          </motion.div>

          {/* Founder Info */}
          <div className="space-y-8">
            
            {/* Name & Title */}
            <motion.div variants={itemVariants} className="space-y-3">
              <motion.h3 
                className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
              >
                {name.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="inline-block"
                    whileHover={{
                      scale: 1.2,
                      color: "hsl(270, 80%, 65%)",
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </motion.h3>
              
              <motion.p 
                className="text-lg text-violet-300 font-medium uppercase tracking-wider"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  x: 10,
                  transition: { duration: 0.3 },
                }}
              >
                FOUNDER OF CASHORA
              </motion.p>
              
              <motion.p 
                className="text-base text-gray-400 font-medium"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  color: "hsl(270, 60%, 70%)",
                  x: 10,
                  transition: { duration: 0.3 },
                }}
              >
                MIT-ADT PUNE
              </motion.p>
              
              {/* Social Media Links */}
              <motion.div 
                className="flex items-center gap-4 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.a
                  href="https://www.linkedin.com/in/vaibhav-gawai-8777a0235/?originalSubdomain=in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-11 h-11 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden"
                  whileHover={{ 
                    scale: 1.15, 
                    y: -5,
                    rotate: [0, -10, 10, 0],
                    borderColor: "rgba(10, 102, 194, 0.5)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-[#0A66C2]"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                  />
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#0A66C2] transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>

                <motion.a
                  href="https://www.instagram.com/vaibhav_gawai10?igsh=MThtZmMza2hicjc0eQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-11 h-11 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden"
                  whileHover={{ 
                    scale: 1.15, 
                    y: -5,
                    rotate: [0, 10, -10, 0],
                    borderColor: "rgba(228, 64, 95, 0.5)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#833AB4] via-[#E4405F] to-[#FCAF45]"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                  />
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#E4405F] transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Bio Text */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-gray-300 leading-relaxed text-lg">
                Cashora is built on the belief that earning independently shouldn't depend on your stage of life. Whether you're a student, a working professional, or managing responsibilities at home, the opportunity to earn through ideas should be accessible to everyone.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                Cashora uses AI to simplify creation and automate distribution helping people build consistent income streams without being limited by time, tools, or technical skills.
              </p>
            </motion.div>

            {/* Achievements */}
            <motion.div variants={itemVariants} className="space-y-3 pt-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -100, rotateY: -45 }}
                  animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                  transition={{
                    delay: 1 + index * 0.15,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    scale: 1.05,
                    x: 10,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    borderColor: "rgba(139, 92, 246, 0.5)",
                    boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)",
                  }}
                  className="group relative flex items-start gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  {/* Animated background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-purple-500/0 to-fuchsia-500/0"
                    initial={{ x: '-100%', opacity: 0 }}
                    whileHover={{ x: '100%', opacity: 0.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <motion.div 
                    className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-violet-400 mt-2.5 relative z-10"
                    animate={{
                      scale: [1, 1.5, 1],
                      boxShadow: [
                        "0 0 0px rgba(139, 92, 246, 0.5)",
                        "0 0 15px rgba(139, 92, 246, 0.8)",
                        "0 0 0px rgba(139, 92, 246, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    whileHover={{
                      scale: 2,
                      backgroundColor: "rgb(168, 85, 247)",
                    }}
                  />
                  
                  <motion.p 
                    className="text-gray-200 leading-relaxed relative z-10"
                    whileHover={{
                      color: "rgb(255, 255, 255)",
                    }}
                  >
                    {achievement}
                  </motion.p>
                  
                  {/* Sparkle effect on hover */}
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 bg-violet-400 rounded-full opacity-0"
                    whileHover={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FounderSection;
