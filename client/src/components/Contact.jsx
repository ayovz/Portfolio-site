import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiGithub, FiLinkedin, FiTwitter, FiMapPin } from 'react-icons/fi';
import api from '../api';
import './Contact.css';

const Contact = ({ profile }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.sendMessage(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-tag"><FiMail /> Contact</span>
          <h2 className="section-title">
            Let's work <span className="gradient-text">together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Send me a message and let's make it happen.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Left: Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="contact-info-card glass-card">
              <div className="contact-detail">
                <FiMail className="contact-icon" />
                <div>
                  <div className="contact-detail-label">Email</div>
                  <a href={`mailto:${profile?.email || 'hello@example.com'}`} className="contact-detail-value">
                    {profile?.email || 'hello@example.com'}
                  </a>
                </div>
              </div>
              <div className="contact-detail">
                <FiMapPin className="contact-icon" />
                <div>
                  <div className="contact-detail-label">Location</div>
                  <div className="contact-detail-value">Available Worldwide</div>
                </div>
              </div>

              <div className="contact-socials">
                <p className="contact-socials-label">Find me on</p>
                <div className="contact-social-links">
                  {profile?.socials?.github && (
                    <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="GitHub">
                      <FiGithub />
                    </a>
                  )}
                  {profile?.socials?.linkedin && (
                    <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="LinkedIn">
                      <FiLinkedin />
                    </a>
                  )}
                  {profile?.socials?.twitter && (
                    <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="Twitter">
                      <FiTwitter />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <form className="contact-form glass-card" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    className="form-input"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  className="form-input"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-input form-textarea"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                />
              </div>
              <button className="btn btn-primary form-submit" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : <><FiSend /> Send Message</>}
              </button>
              {status === 'success' && (
                <div className="form-feedback success">✅ Message sent! I'll get back to you soon.</div>
              )}
              {status === 'error' && (
                <div className="form-feedback error">❌ Something went wrong. Please try again.</div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
