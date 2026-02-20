import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiBriefcase } from 'react-icons/fi';
import './Projects.css';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const ProjectCard = ({ project, index }) => (
  <motion.div
    className="project-card glass-card"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, delay: index * 0.07 }}
    layout
  >
    <div className="project-image">
      {project.image ? (
        <img src={`${API_BASE}${project.image}`} alt={project.title} loading="lazy" />
      ) : (
        <div className="project-image-placeholder">
          <FiBriefcase />
        </div>
      )}
      <div className="project-image-overlay">
        <div className="project-links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link-btn">
              <FiExternalLink /> Live
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-link-btn project-link-ghost">
              <FiGithub /> Code
            </a>
          )}
        </div>
      </div>
      {project.featured && <span className="project-featured-badge">Featured</span>}
    </div>

    <div className="project-body">
      <div className="project-category">{project.category}</div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.shortDescription || project.description}</p>
      <div className="project-tech">
        {project.tech?.slice(0, 4).map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Projects = ({ projects = [] }) => {
  const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-tag"><FiBriefcase /> Work</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A selection of projects that showcase my full-stack development skills.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="project-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
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
          <div className="projects-empty">No projects in this category yet.</div>
        )}
      </div>
    </section>
  );
};

export default Projects;
