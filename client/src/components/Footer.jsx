import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi';
import './Footer.css';

const Footer = ({ profile }) => {
  const year = new Date().getFullYear();
  const links = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = (href) => {
    if (href.startsWith('#')) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo gradient-text">{profile?.name || 'Portfolio'}</span>
          <p className="footer-tagline">{profile?.tagline || 'Full Stack Developer'}</p>
        </div>
        <nav className="footer-nav">
          {links.map(l => (
            <a key={l.label} href={l.href} className="footer-link" onClick={e => { e.preventDefault(); scrollTo(l.href); }}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="footer-socials">
          {profile?.socials?.github && <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-social"><FiGithub /></a>}
          {profile?.socials?.linkedin && <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social"><FiLinkedin /></a>}
          {profile?.socials?.twitter && <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="footer-social"><FiTwitter /></a>}
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {year} {profile?.name || 'Portfolio'}. All rights reserved.</span>
        <span className="footer-credit">Made with <FiHeart className="heart-icon" /> and coffee</span>
      </div>
    </footer>
  );
};

export default Footer;
