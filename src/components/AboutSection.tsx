import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="section-spacing relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{
            background: 'linear-gradient(90deg, #7CFFB2 0%, #5CE1E6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            About Cashora
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            We're building the future of AI-powered content automation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#E5E7EB' }}>
              Our Mission
            </h3>
            <p className="text-base mb-6" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Cashora is revolutionizing content creation by combining cutting-edge AI technology with seamless automation. We believe everyone should have the power to create, distribute, and monetize content effortlessly.
            </p>
            <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Our platform transforms a single prompt into professional AI-generated videos and distributes them across multiple platforms with one click, enabling creators to build passive income streams without technical barriers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { number: '10K+', label: 'Users Waiting' },
              { number: '50+', label: 'Platforms' },
              { number: '1M+', label: 'Videos Generated' },
              { number: '24/7', label: 'AI Automation' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="backdrop-blur-xl rounded-2xl p-6 text-center"
                style={{
                  background: 'rgba(124, 255, 178, 0.05)',
                  border: '1px solid rgba(124, 255, 178, 0.2)',
                }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(124, 255, 178, 0.4)' }}
              >
                <div className="text-3xl font-bold mb-2" style={{
                  background: 'linear-gradient(90deg, #7CFFB2 0%, #5CE1E6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {stat.number}
                </div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
