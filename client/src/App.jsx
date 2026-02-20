import { useState, useEffect } from 'react';
import './index.css';
import CardNav from './components/CardNav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import api from './api';

const NAV_ITEMS = [
  {
    label: 'Work',
    bgColor: 'rgba(99, 102, 241, 0.15)',
    textColor: '#F8FAFC',
    links: [
      { label: 'Projects', href: '#projects' },
      { label: 'Certifications', href: '#certifications' },
    ],
  },
  {
    label: 'About',
    bgColor: 'rgba(34, 211, 238, 0.1)',
    textColor: '#F8FAFC',
    links: [
      { label: 'About Me', href: '#about' },
      { label: 'Blog', href: '#blog' },
    ],
  },
  {
    label: 'Contact',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    textColor: '#F8FAFC',
    links: [
      { label: 'Get in Touch', href: '#contact' },
      { label: 'Testimonials', href: '#testimonials' },
    ],
  },
];

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Promise.all([
      api.getProfile(),
      api.getProjects(),
      api.getCertifications(),
      api.getTestimonials(),
      api.getPosts(),
    ])
      .then(([p, proj, certs, tests, blog]) => {
        setProfile(p);
        setProjects(proj);
        setCertifications(certs);
        setTestimonials(tests);
        setPosts(blog);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <CardNav logoText={profile?.name || 'Portfolio'} items={NAV_ITEMS} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Projects projects={projects} />
        <Certifications certifications={certifications} />
        <Testimonials testimonials={testimonials} />
        <Blog posts={posts} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}

export default App;
