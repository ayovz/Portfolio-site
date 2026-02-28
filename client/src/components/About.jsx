import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import TechIcon from './TechIcon';
import './About.css';

const SkillBar = ({ name, level, delay }) => (
  <motion.div
    className="skill-card"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4 }}
    viewport={{ once: true }}
  >
    <div className="skill-name" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
        <TechIcon name={name} style={{ fontSize: '28px', color: 'var(--aqua)' }} />
        <span>{name}</span>
      </div>
    </div>
    <div className="skill-level">
      <motion.div
        className="skill-fill"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ delay: delay + 0.2, duration: 1.5, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
    </div>
  </motion.div>
);

const About = ({ profile }) => {
  const skills = profile?.skills?.length
    ? profile.skills
    : [
        { name: 'TypeScript', level: 95 },
        { name: 'React / Next', level: 92 },
        { name: 'Node.js', level: 88 },
        { name: 'MongoDB', level: 82 },
        { name: 'Docker / Cloud', level: 75 },
      ];

  return (
    <section id="about" className="section container">
      <div className="section-label">01 // Capabilities</div>
      <h2 className="section-title">Tech Stack</h2>
      
      <div className="chrome-divider" style={{ marginBottom: '3rem' }}></div>

      <div className="skills-grid">
        {skills.map((s, i) => (
          <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.1} />
        ))}
      </div>

      <div style={{ marginTop: '4rem' }}>
        <p className="section-subtitle" style={{ marginTop: 0 }}>
          {profile?.bio || 'I am a full-stack developer with a passion for crafting beautiful, performant web applications.'}
        </p>
        
        {profile?.resumeUrl && (
          <motion.a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-chrome"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <FiDownload /> Download Resume
          </motion.a>
        )}
      </div>
    </section>
  );
};

export default About;
