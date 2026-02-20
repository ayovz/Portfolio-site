import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiGrid, FiBriefcase, FiAward, FiMessageSquare, FiBookOpen,
  FiMail, FiUser, FiLogOut
} from 'react-icons/fi';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: <FiGrid /> },
  { to: '/projects', label: 'Projects', icon: <FiBriefcase /> },
  { to: '/certifications', label: 'Certifications', icon: <FiAward /> },
  { to: '/testimonials', label: 'Testimonials', icon: <FiMessageSquare /> },
  { to: '/blog', label: 'Blog', icon: <FiBookOpen /> },
  { to: '/messages', label: 'Messages', icon: <FiMail /> },
  { to: '/profile', label: 'Profile', icon: <FiUser /> },
];

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('admin_token');
    onLogout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Admin Panel</div>
      <nav className="sidebar-nav">
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <span className="sidebar-link-icon">{l.icon}</span>
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={logout}>
          <FiLogOut /> Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
