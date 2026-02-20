import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import ColorBends from './ColorBends';
import './Hero.css';

const Hero = ({ profile }) => {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      {/* ColorBends WebGL background */}
      <div className="hero-bg">
        <ColorBends
          colors={['#6366F1', '#22D3EE', '#0A0F1E', '#4F46E5', '#06B6D4', '#1E1B4B']}
          speed={0.15}
          warpStrength={1.2}
          frequency={0.8}
          mouseInfluence={0.6}
          parallax={0.3}
          noise={0.05}
          transparent={false}
          rotation={35}
          autoRotate={1.5}
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="hero-overlay" />

      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hero-inner"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="hero-badge"
          >
            <span className="hero-badge-dot" />
            Available for work
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Hi, I'm{' '}
            <span className="gradient-text">{profile?.name || 'Alex Morgan'}</span>
          </motion.h1>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            {profile?.tagline || 'Full Stack Developer & UI/UX Enthusiast'}
          </motion.p>

          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            I craft beautiful, performant web experiences that users love to interact with.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            <button className="btn btn-primary" onClick={scrollToProjects}>
              View My Work
            </button>
            <button className="btn btn-secondary" onClick={scrollToContact}>
              Contact Me
            </button>
          </motion.div>

          <motion.div
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.7 }}
          >
            {profile?.socials?.github && (
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub">
                <FiGithub />
              </a>
            )}
            {profile?.socials?.linkedin && (
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
            )}
            {profile?.socials?.twitter && (
              <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="Twitter">
                <FiTwitter />
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        className="hero-scroll-btn"
        onClick={scrollToProjects}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-label="Scroll down"
      >
        <FiArrowDown />
      </motion.button>
    </section>
  );
};

export default Hero;
