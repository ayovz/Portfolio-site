import { motion } from 'framer-motion';
import { FiDownload, FiUser } from 'react-icons/fi';
import './About.css';

const SkillBar = ({ name, level, delay }) => (
  <motion.div
    className="skill-item"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="skill-meta">
      <span className="skill-name">{name}</span>
      <span className="skill-level">{level}%</span>
    </div>
    <div className="skill-track">
      <motion.div
        className="skill-fill"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ delay: delay + 0.3, duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
    </div>
  </motion.div>
);

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = ({ profile }) => {
  const skills = profile?.skills?.length
    ? profile.skills
    : [
        { name: 'React', level: 95 },
        { name: 'Node.js', level: 90 },
        { name: 'MongoDB', level: 85 },
        { name: 'TypeScript', level: 88 },
        { name: 'UI/UX Design', level: 80 },
        { name: 'GraphQL', level: 75 },
      ];

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          {/* Left: Info */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="about-info"
          >
            <motion.div variants={fadeUp}>
              <span className="section-tag"><FiUser /> About</span>
              <h2 className="section-title">
                Building things with <span className="gradient-text">passion</span>
              </h2>
            </motion.div>

            <motion.p variants={fadeUp} className="about-bio">
              {profile?.bio || "I'm a full-stack developer with a passion for crafting beautiful, performant web applications. With 5+ years of experience in modern web technologies, I bridge the gap between great design and robust engineering."}
            </motion.p>

            <motion.div variants={fadeUp} className="about-cards">
              <div className="about-stat-card glass-card">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="about-stat-card glass-card">
                <span className="stat-number">30+</span>
                <span className="stat-label">Projects Done</span>
              </div>
              <div className="about-stat-card glass-card">
                <span className="stat-number">20+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
            </motion.div>

            {profile?.resumeUrl && (
              <motion.div variants={fadeUp}>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <FiDownload /> Download Resume
                </a>
              </motion.div>
            )}
          </motion.div>

          {/* Right: Skills */}
          <div className="about-skills">
            <motion.h3
              className="skills-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Skills & Expertise
            </motion.h3>
            <div className="skills-list">
              {skills.map((s, i) => (
                <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
