import { motion } from 'framer-motion';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import './Certifications.css';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const Certifications = ({ certifications = [] }) => (
  <section id="certifications" className="section certs-section">
    <div className="container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="section-tag"><FiAward /> Credentials</span>
        <h2 className="section-title">
          Certifications & <span className="gradient-text">Achievements</span>
        </h2>
      </motion.div>

      <div className="certs-grid">
        {certifications.map((cert, i) => (
          <motion.a
            key={cert._id}
            href={cert.credentialUrl || '#'}
            target={cert.credentialUrl ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="cert-card glass-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            viewport={{ once: true }}
          >
            <div className="cert-icon-wrap">
              {cert.image ? (
                <img src={`${API_BASE}${cert.image}`} alt={cert.issuer} className="cert-logo" />
              ) : (
                <FiAward className="cert-icon-fallback" />
              )}
            </div>
            <div className="cert-body">
              <div className="cert-category">{cert.category}</div>
              <h3 className="cert-title">{cert.title}</h3>
              <div className="cert-meta">
                <span className="cert-issuer">{cert.issuer}</span>
                {cert.date && <span className="cert-date">{cert.date}</span>}
              </div>
            </div>
            {cert.credentialUrl && <FiExternalLink className="cert-external-icon" />}
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
