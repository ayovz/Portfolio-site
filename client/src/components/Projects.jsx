import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import TechIcon from './TechIcon';
import './Projects.css';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const ProjectCard = ({ project, index }) => (
  <motion.div
    className="project-card"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    layout
  >
    <div className="project-num">{(index + 1).toString().padStart(2, '0')}</div>
    <div className="project-tag">{project.category} // {new Date(project.createdAt || Date.now()).getFullYear()}</div>
    
    <h3 className="project-title">{project.title}</h3>
    
    {project.image && (
      <div style={{ margin: '16px 0', border: '1px solid rgba(0,255,255,0.2)' }}>
        <img src={project.image.startsWith('http') ? project.image : `${API_BASE}${project.image}`} alt={project.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} loading="lazy" />
      </div>
    )}
    
    <p className="project-desc">{project.shortDescription || project.description}</p>
    
    <div className="project-stack">
      {project.tech?.slice(0, 5).map(t => (
        <span key={t} className="stack-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <TechIcon name={t} />
          {t}
        </span>
      ))}
    </div>

    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-chrome" style={{ padding: '8px 16px', fontSize: '10px' }}>
          LIVE
        </a>
      )}
      {project.repoUrl && (
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '10px' }}>
          CODE
        </a>
      )}
    </div>
  </motion.div>
);

const Projects = ({ projects = [] }) => {
  const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <section id="projects" className="section container">
      <div className="section-label">03 // Projects</div>
      <h2 className="section-title">Selected Work</h2>

      <div className="chrome-divider" style={{ marginBottom: '2rem' }}></div>

      <div className="project-filters" style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn ${active === cat ? 'btn-chrome' : 'btn-outline'}`}
            style={{ padding: '8px 20px' }}
            onClick={() => setActive(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <motion.div className="projects-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div style={{ color: 'var(--chrome2)', padding: '3rem 0' }}>// No data found.</div>
      )}
    </section>
  );
};

export default Projects;
