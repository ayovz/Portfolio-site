import { useState, useEffect } from 'react';
import { FiTrash2, FiMail } from 'react-icons/fi';
import adminApi from '../api';

export default function Messages() {
  const [items, setItems] = useState([]);

  const load = () => adminApi.getMessages().then(setItems);
  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await adminApi.markRead(id); load();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    await adminApi.deleteMessage(id); load();
  };

  const unread = items.filter(m => !m.read).length;

  return (
    <div>
      <h2 className="page-title">Messages</h2>
      <p className="page-subtitle">{unread} unread message{unread !== 1 ? 's' : ''}.</p>
      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">{items.length} Messages</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead><tr><th>Status</th><th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map(m => (
                <tr key={m._id} style={{ opacity: m.read ? 0.65 : 1 }}>
                  <td>
                    {m.read
                      ? <span className="badge badge-gray">Read</span>
                      : <span className="badge badge-blue">New</span>}
                  </td>
                  <td style={{ fontWeight: m.read ? 400 : 600 }}>{m.name}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-2)' }}>
                    <a href={`mailto:${m.email}`}>{m.email}</a>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>{m.subject || '—'}</td>
                  <td><span className="truncate" style={{ maxWidth: 200, fontSize: '0.82rem', color: 'var(--text-2)' }}>{m.message}</span></td>
                  <td style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: 'var(--text-2)' }}>
                    {new Date(m.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="table-actions">
                      {!m.read && (
                        <button className="btn btn-ghost btn-sm" onClick={() => markRead(m._id)} title="Mark as read">
                          <FiMail />
                        </button>
                      )}
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m._id)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!items.length && <tr><td colSpan={7} className="empty-state">No messages yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
