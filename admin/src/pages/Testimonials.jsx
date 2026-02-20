import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiStar } from 'react-icons/fi';
import adminApi from '../api';

const emptyForm = { name: '', role: '', company: '', quote: '', rating: 5, featured: false, order: 0 };

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = () => adminApi.getTestimonials().then(setItems);
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setAvatarFile(null); setError(''); setModal(true); };
  const openEdit = (item) => {
    setEditing(item);
    setForm({ name: item.name, role: item.role || '', company: item.company || '', quote: item.quote, rating: item.rating || 5, featured: item.featured || false, order: item.order || 0 });
    setAvatarFile(null); setError(''); setModal(true);
  };

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true); setError('');
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (avatarFile) fd.append('avatar', avatarFile);
    try {
      if (editing) await adminApi.updateTestimonial(editing._id, fd);
      else await adminApi.createTestimonial(fd);
      setModal(false); load();
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    await adminApi.deleteTestimonial(id); load();
  };

  return (
    <div>
      <h2 className="page-title">Testimonials</h2>
      <p className="page-subtitle">Manage client feedback and reviews.</p>
      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">{items.length} Testimonials</h3>
          <button className="btn btn-primary" onClick={openAdd}><FiPlus /> Add Testimonial</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Role</th><th>Company</th><th>Rating</th><th>Featured</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map(t => (
                <tr key={t._id}>
                  <td>{t.name}</td>
                  <td style={{ color: 'var(--text-2)', fontSize: '0.85rem' }}>{t.role}</td>
                  <td style={{ color: 'var(--text-2)', fontSize: '0.85rem' }}>{t.company}</td>
                  <td><span style={{ display:'flex', alignItems:'center', gap:'3px', color:'#F59E0B' }}><FiStar style={{fill:'#F59E0B'}} /> {t.rating}</span></td>
                  <td>{t.featured ? <span className="badge badge-green">Yes</span> : <span className="badge badge-gray">No</span>}</td>
                  <td><div className="table-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => openEdit(t)}><FiEdit2 /></button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t._id)}><FiTrash2 /></button>
                  </div></td>
                </tr>
              ))}
              {!items.length && <tr><td colSpan={6} className="empty-state">No testimonials yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) setModal(false); }}>
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button className="modal-close" onClick={() => setModal(false)}><FiX /></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-error">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Name *</label><input className="form-input" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} required /></div>
                  <div className="form-group"><label className="form-label">Role</label><input className="form-input" value={form.role} onChange={e => setForm(p => ({...p, role: e.target.value}))} /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Company</label><input className="form-input" value={form.company} onChange={e => setForm(p => ({...p, company: e.target.value}))} /></div>
                  <div className="form-group"><label className="form-label">Rating (1-5)</label><input className="form-input" type="number" min={1} max={5} value={form.rating} onChange={e => setForm(p => ({...p, rating: parseInt(e.target.value)||5}))} /></div>
                </div>
                <div className="form-group"><label className="form-label">Quote *</label><textarea className="form-textarea" value={form.quote} onChange={e => setForm(p => ({...p, quote: e.target.value}))} required /></div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Avatar Image</label><input className="form-input" type="file" accept="image/*" onChange={e => setAvatarFile(e.target.files[0])} /></div>
                  <div className="form-group" style={{justifyContent:'flex-end'}}>
                    <div className="form-checkbox"><input type="checkbox" id="tfeatured" checked={form.featured} onChange={e => setForm(p => ({...p, featured: e.target.checked}))} /><label htmlFor="tfeatured">Featured</label></div>
                  </div>
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
