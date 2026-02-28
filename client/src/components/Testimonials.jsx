import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import './Testimonials.css';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const Testimonials = ({ testimonials = [] }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => setActive(i => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  const t = testimonials[active];

  return (
    <section id="testimonials" className="section container">
      <div className="section-label">06 // Reviews</div>
      <h2 className="section-title">Testimonials</h2>
      <div className="chrome-divider" style={{ marginBottom: '3rem' }}></div>

      <div className="testimonials-wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="testimonial-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className={i < t.rating ? 'star-filled' : 'star-empty'} />
              ))}
            </div>
            
            <blockquote className="testimonial-quote">"{t.quote}"</blockquote>
            
            <div className="testimonial-author">
              <div className="testimonial-avatar">
                {t.avatar ? (
                  <img src={`${API_BASE}${t.avatar}`} alt={t.name} loading="lazy" />
                ) : (
                  <span>{t.name.charAt(0)}</span>
                )}
              </div>
              <div className="testimonial-info">
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role}{t.company && ` // ${t.company}`}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="carousel-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
