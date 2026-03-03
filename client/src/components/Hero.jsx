import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import ColorBends from './ColorBends';
import RotatingText from './RotatingText';
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
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={0}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.1}
          transparent
          autoRotate={0}
          color=""
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
        {profile?.name?.toUpperCase() || 'AYOMAL\nWEERASINGHE'}
      </motion.h1>

      <motion.div 
        className="hero-role"
        initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.8, delay: 0.6 }}
        style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}
      >
        <span>I'M A&nbsp;</span>
        {profile?.roles?.length > 0 ? (
          <RotatingText
            texts={profile.roles}
            mainClassName="px-3 sm:px-4 md:px-5 py-0.5 sm:py-1 md:py-2 justify-center rounded-xl inline-flex"
            style={{ 
              background: 'rgba(0, 255, 209, 0.08)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(0, 255, 209, 0.3)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(0, 255, 209, 0.1)',
              color: '#ffffff',
              overflow: 'hidden',
              textShadow: '0 0 10px rgba(0, 255, 209, 0.4)'
            }}
            

            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        ) : (
          <span>{profile?.tagline || 'Full-Stack Developer'}</span>
        )}
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
