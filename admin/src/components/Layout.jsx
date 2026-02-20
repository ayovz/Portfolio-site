import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/projects': 'Projects',
  '/certifications': 'Certifications',
  '/testimonials': 'Testimonials',
  '/blog': 'Blog Posts',
  '/messages': 'Messages',
  '/profile': 'Profile Settings',
};

const Layout = ({ username, onLogout }) => {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] || 'Admin';

  return (
    <div className="admin-layout">
      <Sidebar onLogout={onLogout} />
      <div className="admin-main">
        <header className="topbar">
          <h1 className="topbar-title">{title}</h1>
          <div className="topbar-user">
            <div className="topbar-avatar">{username?.charAt(0).toUpperCase()}</div>
            <span>{username}</span>
          </div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
