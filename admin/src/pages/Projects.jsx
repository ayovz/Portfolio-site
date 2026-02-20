import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import adminApi from '../api';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
const CATS = ['Web App', 'Mobile', 'API', 'UI/UX', 'Other'];

const emptyForm = { title: '', description: '', shortDescription: '', tech: '', liveUrl: '', repoUrl: '', category: 'Web App', featured: false, order: 0 };

export default function Projects() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = () => adminApi.getProjects().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setImageFile(null); setError(''); setModal(true); };
  const openEdit = (item) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description, shortDescription: item.shortDescription || '', tech: item.tech?.join(', ') || '', liveUrl: item.liveUrl || '', repoUrl: item.repoUrl || '', category: item.category || 'Other', featured: item.featured || false, order: item.order || 0 });
    setImageFile(null); setError(''); setModal(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append('image', imageFile);
    try {
      if (editing) await adminApi.updateProject(editing._id, fd);
      else await adminApi.createProject(fd);
      setModal(false); load();
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    await adminApi.deleteProject(id);
    load();
  };

  return (
    <div>
      <h2 className="page-title">Projects</h2>
      <p className="page-subtitle">Manage your portfolio projects.</p>

      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">{items.length} Projects</h3>
          <button className="btn btn-primary" onClick={openAdd}><FiPlus /> Add Project</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr><th>Image</th><th>Title</th><th>Category</th><th>Tech</th><th>Featured</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {items.map(p => (
                <tr key={p._id}>
                  <td>{p.image ? <img src={`${API_BASE}${p.image}`} className="img-preview" alt={p.title} /> : '—'}</td>
                  <td><span className="truncate">{p.title}</span></td>
                  <td><span className="badge badge-blue">{p.category}</span></td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-2)' }}>{p.tech?.slice(0,3).join(', ')}</td>
                  <td>{p.featured ? <span className="badge badge-green">Yes</span> : <span className="badge badge-gray">No</span>}</td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}><FiEdit2 /></button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!items.length && <tr><td colSpan={6} className="empty-state">No projects yet. Add your first project!</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) setModal(false); }}>
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">{editing ? 'Edit Project' : 'Add Project'}</h3>
              <button className="modal-close" onClick={() => setModal(false)}><FiX /></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-error">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input className="form-input" value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-select form-input" value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))}>
                      {CATS.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Short Description</label>
                  <input className="form-input" value={form.shortDescription} onChange={e => setForm(p => ({...p, shortDescription: e.target.value}))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Full Description *</label>
                  <textarea className="form-textarea" value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Tech Stack (comma-separated)</label>
                  <input className="form-input" value={form.tech} onChange={e => setForm(p => ({...p, tech: e.target.value}))} placeholder="React, Node.js, MongoDB" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Live URL</label>
                    <input className="form-input" value={form.liveUrl} onChange={e => setForm(p => ({...p, liveUrl: e.target.value}))} type="url" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Repo URL</label>
                    <input className="form-input" value={form.repoUrl} onChange={e => setForm(p => ({...p, repoUrl: e.target.value}))} type="url" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Image</label>
                    <input className="form-input" type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
                    {editing?.image && !imageFile && <small style={{color:'var(--text-2)', fontSize:'0.75rem'}}>Current image will be kept</small>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Order</label>
                    <input className="form-input" type="number" value={form.order} onChange={e => setForm(p => ({...p, order: e.target.value}))} />
                  </div>
                </div>
                <div className="form-checkbox" style={{marginBottom:'1rem'}}>
                  <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(p => ({...p, featured: e.target.checked}))} />
                  <label htmlFor="featured">Featured project</label>
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
