import { motion } from 'framer-motion';
import TechIcon from './TechIcon';
import './TechStrip.css';

const TechStrip = ({ techStrip = [] }) => {
  if (!techStrip || techStrip.length === 0) return null;

  // Duplicate the array to create a seamless loop effect
  const repeatedTech = [...techStrip, ...techStrip, ...techStrip, ...techStrip];

  return (
    <div className="ticker-wrap">
      <div className="tech-strip-track">
        {repeatedTech.map((tech, i) => (
          <div key={i} className="tech-strip-item">
            <span className="tech-strip-separator">◆</span>
            <TechIcon name={tech} className="tech-strip-icon" />
            <span className="tech-strip-text">{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStrip;
