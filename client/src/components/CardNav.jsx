import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import './CardNav.css';

const CardNav = ({ logoText = 'Portfolio', items = [], onContactClick }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const prev = { vis: contentEl.style.visibility, pe: contentEl.style.pointerEvents, pos: contentEl.style.position, h: contentEl.style.height };
        Object.assign(contentEl.style, { visibility: 'visible', pointerEvents: 'auto', position: 'static', height: 'auto' });
        contentEl.offsetHeight;
        const result = 60 + contentEl.scrollHeight + 16;
        Object.assign(contentEl.style, { visibility: prev.vis, pointerEvents: prev.pe, position: prev.pos, height: prev.h });
        return result;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current.filter(Boolean), { y: 50, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease: 'power3.out' });
    tl.to(cardsRef.current.filter(Boolean), { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.08 }, '-=0.1');
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => { tl?.kill(); tlRef.current = null; };
  }, [items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        gsap.set(navRef.current, { height: calculateHeight() });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) { newTl.progress(1); tlRef.current = newTl; }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) tlRef.current = newTl;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (href) => {
    // Determine if we need to navigate or just scroll
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
       navigate(href);
    }

    // Close menu
    setIsHamburgerOpen(false);
    tlRef.current?.eventCallback('onReverseComplete', () => setIsExpanded(false));
    tlRef.current?.reverse();
  };

  const setCardRef = i => el => { if (el) cardsRef.current[i] = el; };

  return (
    <div className="card-nav-portal">
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`}>
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <span className="logo-text">{logoText}</span>

          <button
            type="button"
            className="card-nav-cta-button"
            onClick={() => { onContactClick?.(); handleLinkClick('#contact'); }}
          >
            Hire Me
          </button>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link"
                    href={lnk.href}
                    onClick={(e) => { e.preventDefault(); handleLinkClick(lnk.href); }}
                    aria-label={lnk.label}
                  >
                    <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
