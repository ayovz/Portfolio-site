import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiMessageSquare } from 'react-icons/fi';
import './Testimonials.css';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const Stars = ({ rating }) => (
  <div className="stars">
    {[...Array(5)].map((_, i) => (
      <FiStar key={i} className={i < rating ? 'star-filled' : 'star-empty'} />
    ))}
  </div>
);

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
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-tag"><FiMessageSquare /> Testimonials</span>
          <h2 className="section-title">
            What people <span className="gradient-text">say about me</span>
          </h2>
        </motion.div>

        <div className="testimonials-carousel">
          <motion.div
            key={active}
            className="testimonial-card glass-card"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5 }}
          >
            <Stars rating={t.rating} />
            <blockquote className="testimonial-quote">"{t.quote}"</blockquote>
            <div className="testimonial-author">
              <div className="testimonial-avatar">
                {t.avatar ? (
                  <img src={`${API_BASE}${t.avatar}`} alt={t.name} />
                ) : (
                  <span>{t.name.charAt(0)}</span>
                )}
              </div>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role}{t.company && ` @ ${t.company}`}</div>
              </div>
            </div>
          </motion.div>

          {/* Dots */}
          <div className="carousel-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Side cards (desktop) */}
          {testimonials.length > 1 && (
            <div className="testimonials-side">
              {testimonials.filter((_, i) => i !== active).map((tt, i) => (
                <button key={tt._id} className="testimonial-side-card glass-card" onClick={() => setActive(testimonials.indexOf(tt))}>
                  <div className="testimonial-avatar sm">
                    {tt.avatar ? <img src={`${API_BASE}${tt.avatar}`} alt={tt.name} /> : <span>{tt.name.charAt(0)}</span>}
                  </div>
                  <div>
                    <div className="testimonial-name" style={{ fontSize: '0.85rem' }}>{tt.name}</div>
                    <div className="testimonial-role">{tt.role}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
