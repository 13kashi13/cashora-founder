import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer id="footer" className="relative py-20 overflow-hidden">
      <div className="section-line absolute top-0 left-0 right-0" />

      <div className="container-tight relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.h3
            className="font-display text-3xl font-bold gradient-text mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            CASHORA
          </motion.h3>
          <p className="text-muted-foreground/60 text-sm max-w-sm">
            AI-powered content automation for the next generation of creators.
          </p>

          <div className="flex items-center gap-6 mt-8">
            <a
              href="https://www.linkedin.com/in/vaibhav-gawai-8777a0235/?originalSubdomain=in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground/50 hover:text-primary transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/vaibhav_gawai10?igsh=MThtZmMza2hicjc0eQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground/50 hover:text-primary transition-colors duration-300"
            >
              Instagram
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs text-muted-foreground/50 hover:text-primary transition-colors duration-300 cursor-pointer"
            >
              Back to Top
            </button>
          </div>

          <div className="mt-8 text-muted-foreground/30 text-xs">
            © {new Date().getFullYear()} CASHORA. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
