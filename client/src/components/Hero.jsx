import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import ColorBends from './ColorBends';
import './Hero.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 }
};

const Hero = ({ profile }) => {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
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
      <div className="hero-overlay" />

      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>
      <div className="corner-deco tl"></div>
      <div className="corner-deco tr"></div>

      <motion.div
        className="hero-tag"
        initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }}
      >
        // Initializing portfolio.exe ...
      </motion.div>

      <motion.h1 
        className="hero-name"
        initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.8, delay: 0.4 }}
      >
        {profile?.name?.toUpperCase() || 'YOUR\nNAME'}
      </motion.h1>

      <motion.div 
        className="hero-role"
        initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.8, delay: 0.6 }}
      >
        {profile?.tagline || 'Full-Stack Developer'}
      </motion.div>

      <motion.p 
        className="hero-desc"
        initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.8, delay: 0.8 }}
      >
        {profile?.bio || 'I build fast, scalable, and beautiful software. Obsessed with clean architecture, great DX, and shipping things that actually matter.'}
      </motion.p>

      <motion.div 
        className="hero-ctas"
        initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.8, delay: 1 }}
      >
        <button className="btn btn-chrome" onClick={scrollToProjects}>VIEW WORK</button>
        <button className="btn btn-outline" onClick={scrollToContact}>GET IN TOUCH</button>

        <div className="hero-social-links" style={{ display: 'flex', gap: '1rem', marginLeft: 'auto', alignItems: 'center' }}>
          {profile?.socials?.github && (
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="hero-social-link"><FiGithub /></a>
          )}
          {profile?.socials?.linkedin && (
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hero-social-link"><FiLinkedin /></a>
          )}
          {profile?.socials?.twitter && (
            <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="hero-social-link"><FiTwitter /></a>
          )}
        </div>
      </motion.div>

      <motion.div 
        className="terminal"
        initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="terminal-line"><span className="prompt">~/dev $</span> <span className="cmd">cat about.txt</span></div>
        <div className="terminal-line"><span className="output">→ 5+ years building for the web</span></div>
        <div className="terminal-line"><span className="output">→ Loves TypeScript, hates bugs</span></div>
        <div className="terminal-line"><span className="output">→ Modern MERN Stack expert</span></div>
        <div className="terminal-line"><span className="prompt">~/dev $</span> <span className="cursor"></span></div>
      </motion.div>
    </section>
  );
};

export default Hero;
