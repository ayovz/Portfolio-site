import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import './Footer.css';

const Footer = ({ profile }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-copy">© {year} {profile?.name || 'YOURNAME'} // ALL SYSTEMS NOMINAL</div>
      <div className="footer-socials">
        {profile?.socials?.github && <a href={profile.socials.github} target="_blank" rel="noopener noreferrer">GITHUB</a>}
        {profile?.socials?.linkedin && <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN</a>}
        {profile?.socials?.twitter && <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer">TWITTER</a>}
      </div>
    </footer>
  );
};

export default Footer;
