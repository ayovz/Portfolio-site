import { useState, useEffect } from 'react';
import { FiSave } from 'react-icons/fi';
import adminApi from '../api';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

export default function Profile() {
  const [form, setForm] = useState({ name: '', tagline: '', bio: '', email: '', resumeUrl: '', github: '', linkedin: '', twitter: '', instagram: '' });
  const [avatarFile, setAvatarFile] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const [skills, setSkills] = useState([]);
  const [techStrip, setTechStrip] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    adminApi.getProfile().then(p => {
      setForm({
        name: p.name || '', tagline: p.tagline || '', bio: p.bio || '',
        email: p.email || '', resumeUrl: p.resumeUrl || '',
        github: p.socials?.github || '', linkedin: p.socials?.linkedin || '',
        twitter: p.socials?.twitter || '', instagram: p.socials?.instagram || '',
      });
      setCurrentAvatar(p.avatar);
      setSkills(p.skills || []);
      setTechStrip(p.techStrip || []);
    });
  }, []);

  const addSkill = () => setSkills(s => [...s, { name: '', level: 80 }]);
  const updateSkill = (i, field, val) => setSkills(s => s.map((x, idx) => idx === i ? { ...x, [field]: val } : x));
  const removeSkill = (i) => setSkills(s => s.filter((_, idx) => idx !== i));

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true); setError(''); setSuccess('');
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (!['github','linkedin','twitter','instagram'].includes(k)) fd.append(k, v);
    });
    fd.append('socials', JSON.stringify({ github: form.github, linkedin: form.linkedin, twitter: form.twitter, instagram: form.instagram }));
    fd.append('skills', JSON.stringify(skills));
    fd.append('techStrip', JSON.stringify(techStrip.filter(t => t.trim() !== '')));
    if (avatarFile) fd.append('avatar', avatarFile);
    try {
      await adminApi.updateProfile(fd);
      setSuccess('Profile updated successfully!');
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const f = (key) => ({ value: form[key], onChange: e => setForm(p => ({...p, [key]: e.target.value})) });

  return (
    <div>
      <h2 className="page-title">Profile Settings</h2>
      <p className="page-subtitle">Update your portfolio owner information.</p>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {/* Basic Info */}
          <div className="panel" style={{ padding: '1.5rem' }}>
            <h3 className="panel-title" style={{ marginBottom: '1.25rem' }}>Basic Information</h3>
            {currentAvatar && !avatarFile && (
              <div style={{ marginBottom: '1rem' }}>
                <img src={`${API_BASE}${currentAvatar}`} alt="Avatar" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
              </div>
            )}
            <div className="form-group"><label className="form-label">Avatar Image</label><input className="form-input" type="file" accept="image/*" onChange={e => setAvatarFile(e.target.files[0])} /></div>
            <div className="form-group"><label className="form-label">Name *</label><input className="form-input" {...f('name')} required /></div>
            <div className="form-group"><label className="form-label">Tagline</label><input className="form-input" {...f('tagline')} /></div>
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" {...f('email')} /></div>
            <div className="form-group"><label className="form-label">Resume URL</label><input className="form-input" type="url" {...f('resumeUrl')} /></div>
            <div className="form-group"><label className="form-label">Bio</label><textarea className="form-textarea" {...f('bio')} /></div>
          </div>

          {/* Socials */}
          <div className="panel" style={{ padding: '1.5rem' }}>
            <h3 className="panel-title" style={{ marginBottom: '1.25rem' }}>Social Links</h3>
            <div className="form-group"><label className="form-label">GitHub URL</label><input className="form-input" type="url" {...f('github')} /></div>
            <div className="form-group"><label className="form-label">LinkedIn URL</label><input className="form-input" type="url" {...f('linkedin')} /></div>
            <div className="form-group"><label className="form-label">Twitter URL</label><input className="form-input" type="url" {...f('twitter')} /></div>
            <div className="form-group"><label className="form-label">Instagram URL</label><input className="form-input" type="url" {...f('instagram')} /></div>
          </div>
        </div>

        {/* Skills */}
        <div className="panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 className="panel-title">Skills</h3>
            <button type="button" className="btn btn-ghost btn-sm" onClick={addSkill}>+ Add Skill</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
            {skills.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input className="form-input" placeholder="Skill name" value={s.name} onChange={e => updateSkill(i, 'name', e.target.value)} style={{ flex: 2 }} />
                <input className="form-input" type="number" min={1} max={100} value={s.level} onChange={e => updateSkill(i, 'level', parseInt(e.target.value))} style={{ flex: 1 }} />
                <button type="button" className="btn btn-danger btn-sm" onClick={() => removeSkill(i)}>✕</button>
              </div>
            ))}
            {!skills.length && <p style={{ color: 'var(--text-2)', fontSize: '0.85rem' }}>No skills added yet.</p>}
          </div>
        </div>

        {/* Tech Strip */}
        <div className="panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 className="panel-title">Technology Strip (Scrolling Marquee)</h3>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setTechStrip(ts => [...ts, ''])}>+ Add Tech</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {techStrip.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input className="form-input" placeholder="e.g. NEXT.JS" value={t} onChange={e => setTechStrip(ts => ts.map((val, idx) => idx === i ? e.target.value : val))} style={{ flex: 1, textTransform: 'uppercase' }} />
                <button type="button" className="btn btn-danger btn-sm" onClick={() => setTechStrip(ts => ts.filter((_, idx) => idx !== i))}>✕</button>
              </div>
            ))}
            {!techStrip.length && <p style={{ color: 'var(--text-2)', fontSize: '0.85rem' }}>No technologies added for the marquee.</p>}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <FiSave /> {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
