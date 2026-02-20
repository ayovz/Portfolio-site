import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import adminApi from '../api';

const emptyForm = { title: '', slug: '', excerpt: '', content: '', tags: '', published: false };

export default function Blog() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = () => adminApi.getPosts().then(setItems);
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setCoverFile(null); setError(''); setModal(true); };
  const openEdit = (item) => {
    setEditing(item);
    setForm({ title: item.title, slug: item.slug || '', excerpt: item.excerpt || '', content: item.content || '', tags: item.tags?.join(', ') || '', published: item.published || false });
    setCoverFile(null); setError(''); setModal(true);
  };

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true); setError('');
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k !== 'content') fd.append(k, v);
    });
    fd.append('content', form.content);
    if (coverFile) fd.append('coverImage', coverFile);
    try {
      if (editing) await adminApi.updatePost(editing._id, fd);
      else await adminApi.createPost(fd);
      setModal(false); load();
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    await adminApi.deletePost(id); load();
  };

  return (
    <div>
      <h2 className="page-title">Blog Posts</h2>
      <p className="page-subtitle">Write and manage your articles.</p>
      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">{items.length} Posts</h3>
          <button className="btn btn-primary" onClick={openAdd}><FiPlus /> New Post</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead><tr><th>Title</th><th>Tags</th><th>Status</th><th>Published</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map(p => (
                <tr key={p._id}>
                  <td><span className="truncate" style={{maxWidth:220}}>{p.title}</span></td>
                  <td style={{fontSize:'0.8rem',color:'var(--text-2)'}}>{p.tags?.slice(0,2).join(', ')}</td>
                  <td>{p.published ? <span className="badge badge-green">Published</span> : <span className="badge badge-yellow">Draft</span>}</td>
                  <td style={{fontSize:'0.8rem', fontFamily:'monospace', color:'var(--text-2)'}}>{p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : '—'}</td>
                  <td><div className="table-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}><FiEdit2 /></button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}><FiTrash2 /></button>
                  </div></td>
                </tr>
              ))}
              {!items.length && <tr><td colSpan={5} className="empty-state">No posts yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) setModal(false); }}>
          <div className="modal" style={{ maxWidth: 760 }}>
            <div className="modal-header">
              <h3 className="modal-title">{editing ? 'Edit Post' : 'New Post'}</h3>
              <button className="modal-close" onClick={() => setModal(false)}><FiX /></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-error">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group"><label className="form-label">Title *</label><input className="form-input" value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} required /></div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Slug (auto-generated if empty)</label><input className="form-input" value={form.slug} onChange={e => setForm(p => ({...p, slug: e.target.value}))} /></div>
                  <div className="form-group"><label className="form-label">Tags (comma-separated)</label><input className="form-input" value={form.tags} onChange={e => setForm(p => ({...p, tags: e.target.value}))} /></div>
                </div>
                <div className="form-group"><label className="form-label">Excerpt</label><textarea className="form-textarea" style={{ minHeight: 70 }} value={form.excerpt} onChange={e => setForm(p => ({...p, excerpt: e.target.value}))} /></div>
                <div className="form-group">
                  <label className="form-label">Content</label>
                  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', overflow: 'hidden', border: '1.5px solid var(--border)' }}>
                    <ReactQuill theme="snow" value={form.content} onChange={val => setForm(p => ({...p, content: val}))} style={{ color: '#F8FAFC' }} />
                  </div>
                </div>
                <div className="form-row" style={{ alignItems: 'center' }}>
                  <div className="form-group"><label className="form-label">Cover Image</label><input className="form-input" type="file" accept="image/*" onChange={e => setCoverFile(e.target.files[0])} /></div>
                  <div className="form-group" style={{ justifyContent: 'flex-end' }}>
                    <div className="form-checkbox"><input type="checkbox" id="published" checked={form.published} onChange={e => setForm(p => ({...p, published: e.target.checked}))} /><label htmlFor="published">Publish now</label></div>
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
