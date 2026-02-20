import { useState, useEffect } from 'react';
import adminApi from '../api';
import { FiBriefcase, FiAward, FiMessageSquare, FiBookOpen, FiMail } from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState({ projects: 0, certs: 0, testimonials: 0, posts: 0, unread: 0 });

  useEffect(() => {
    Promise.all([
      adminApi.getProjects(),
      adminApi.getCertifications(),
      adminApi.getTestimonials(),
      adminApi.getPosts(),
      adminApi.getMessages(),
    ]).then(([p, c, t, b, m]) => {
      setStats({
        projects: p.length,
        certs: c.length,
        testimonials: t.length,
        posts: b.length,
        unread: m.filter(msg => !msg.read).length,
      });
    }).catch(console.error);
  }, []);

  const statCards = [
    { label: 'Projects', value: stats.projects, icon: <FiBriefcase />, color: '#6366F1' },
    { label: 'Certifications', value: stats.certs, icon: <FiAward />, color: '#22D3EE' },
    { label: 'Testimonials', value: stats.testimonials, icon: <FiMessageSquare />, color: '#10B981' },
    { label: 'Blog Posts', value: stats.posts, icon: <FiBookOpen />, color: '#F59E0B' },
    { label: 'Unread Messages', value: stats.unread, icon: <FiMail />, color: '#EF4444' },
  ];

  return (
    <div>
      <h2 className="page-title">Overview</h2>
      <p className="page-subtitle">Manage all your portfolio content from here.</p>

      <div className="stats-grid">
        {statCards.map(s => (
          <div key={s.label} className="panel stat-card">
            <div style={{ fontSize: '1.4rem', color: s.color, marginBottom: '0.5rem' }}>{s.icon}</div>
            <div className="stat-number" style={{ background: `none`, WebkitTextFillColor: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="panel-header"><h3 className="panel-title">Quick Start</h3></div>
        <div className="panel-body">
          <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: 1.7 }}>
            Use the sidebar to navigate between sections. You can add, edit, or delete
            <strong style={{ color: 'var(--text)' }}> projects</strong>,
            <strong style={{ color: 'var(--text)' }}> certifications</strong>,
            <strong style={{ color: 'var(--text)' }}> testimonials</strong>, and
            <strong style={{ color: 'var(--text)' }}> blog posts</strong>.
            Changes will immediately appear on your public portfolio site.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
