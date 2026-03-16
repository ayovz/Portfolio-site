import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import adminApi from '../api';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
const emptyForm = { title: '', issuer: '', date: '', credentialUrl: '', category: 'General', order: 0 };

export default function Certifications() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = () => adminApi.getCertifications().then(setItems);
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setImageFile(null); setError(''); setModal(true); };
  const openEdit = (item) => {
    setEditing(item);
    setForm({ title: item.title, issuer: item.issuer, date: item.date || '', credentialUrl: item.credentialUrl || '', category: item.category || 'General', order: item.order || 0 });
    setImageFile(null); setError(''); setModal(true);
  };

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true); setError('');
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append('image', imageFile);
    try {
      if (editing) await adminApi.updateCertification(editing._id, fd);
      else await adminApi.createCertification(fd);
      setModal(false); load();
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this certification?')) return;
    await adminApi.deleteCertification(id); load();
  };

  return (
    <div>
      <h2 className="page-title">Certifications</h2>
      <p className="page-subtitle">Manage your credentials and certifications.</p>
      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">{items.length} Certifications</h3>
          <button className="btn btn-primary" onClick={openAdd}><FiPlus /> Add Certification</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead><tr><th>Logo</th><th>Title</th><th>Issuer</th><th>Category</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map(c => (
                <tr key={c._id}>
                  <td>{c.image ? <img src={c.image.startsWith('http') ? c.image : `${API_BASE}${c.image}`} className="img-preview" alt={c.issuer} /> : '—'}</td>
                  <td><span className="truncate" style={{ maxWidth: 180 }}>{c.title}</span></td>
                  <td style={{ color: 'var(--text-2)', fontSize: '0.85rem' }}>{c.issuer}</td>
                  <td><span className="badge badge-blue">{c.category}</span></td>
                  <td style={{ color: 'var(--text-2)', fontSize: '0.82rem', fontFamily: 'monospace' }}>{c.date || '—'}</td>
                  <td><div className="table-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => openEdit(c)}><FiEdit2 /></button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c._id)}><FiTrash2 /></button>
                  </div></td>
                </tr>
              ))}
              {!items.length && <tr><td colSpan={6} className="empty-state">No certifications yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) setModal(false); }}>
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">{editing ? 'Edit Certification' : 'Add Certification'}</h3>
              <button className="modal-close" onClick={() => setModal(false)}><FiX /></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-error">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group"><label className="form-label">Title *</label><input className="form-input" value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} required /></div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Issuer *</label><input className="form-input" value={form.issuer} onChange={e => setForm(p => ({...p, issuer: e.target.value}))} required /></div>
                  <div className="form-group"><label className="form-label">Date (e.g. 2024-03)</label><input className="form-input" value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} /></div>
                </div>
                <div className="form-group"><label className="form-label">Credential URL</label><input className="form-input" type="url" value={form.credentialUrl} onChange={e => setForm(p => ({...p, credentialUrl: e.target.value}))} /></div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Category</label><input className="form-input" value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))} /></div>
                  <div className="form-group"><label className="form-label">Logo Image</label><input className="form-input" type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} /></div>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
