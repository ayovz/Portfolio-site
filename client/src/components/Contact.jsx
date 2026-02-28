import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <section id="contact" style={{ textAlign: 'center', padding: '80px 40px', position: 'relative' }}>
      <div className="corner-deco bl"></div>
      <div className="corner-deco br"></div>
      
      <div className="section-label" style={{ justifyContent: 'center' }}>04 // Contact</div>
      <h2 className="section-title" style={{ marginBottom: '16px' }}>
        Let's Build<br />Something.
      </h2>
      
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', maxWidth: '400px', margin: '0 auto 36px auto', lineHeight: 1.8 }}>
        Open to freelance, full-time, and interesting problems. Let's connect and make something great.
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }} className="contact-form">
        <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="NAME // e.g. John Doe" required />
        <input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="EMAIL // e.g. john@domain.com" required />
        <input className="form-input" name="subject" value={form.subject} onChange={handleChange} placeholder="SUBJECT // e.g. Project Inquiry" />
        <textarea className="form-input" name="message" value={form.message} onChange={handleChange} placeholder="MESSAGE // e.g. Let's build something..." rows={5} required />
        
        <button className="btn btn-chrome" type="submit" disabled={status === 'loading'} style={{ width: '100%', marginTop: '16px' }}>
          {status === 'loading' ? 'TRANSMITTING...' : 'SEND MESSAGE'}
        </button>

        {status === 'success' && <div style={{ color: 'var(--green)', fontSize: '12px', marginTop: '16px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>// MESSAGE RECEIVED.</div>}
        {status === 'error' && <div style={{ color: 'var(--pink)', fontSize: '12px', marginTop: '16px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>// TRANSMISSION FAILED. ERROR.</div>}
      </form>
    </section>
  );
};

export default Contact;
