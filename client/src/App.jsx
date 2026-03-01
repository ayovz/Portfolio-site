import { useState, useEffect } from 'react';
import './index.css';
import CardNav from './components/CardNav';
import Hero from './components/Hero';
import TechStrip from './components/TechStrip';
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
    bgColor: 'rgba(0, 255, 255, 0.1)',
    textColor: 'var(--aqua)',
    links: [
      { label: 'Projects', href: '#projects' },
      { label: 'Certifications', href: '#certifications' },
    ],
  },
  {
    label: 'About',
    bgColor: 'rgba(255, 105, 180, 0.1)',
    textColor: 'var(--pink)',
    links: [
      { label: 'About Me', href: '#about' },
      { label: 'Blog', href: '#blog' },
    ],
  },
  {
    label: 'Contact',
    bgColor: 'rgba(255, 215, 0, 0.1)',
    textColor: 'var(--gold)',
    links: [
      { label: 'Get in Touch', href: '#contact' },
      { label: 'Testimonials', href: '#testimonials' },
    ],
  },
];

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogPostView from './components/BlogPostView';
import ClickSpark from './components/ClickSpark';

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
    <BrowserRouter>
      <CardNav logoText={profile?.name || 'Portfolio'} items={NAV_ITEMS} />
      <Routes>
        <Route path="/" element={
          <main>
            <ClickSpark
              sparkColor='#fff'
              sparkSize={17}
              sparkRadius={15}
              sparkCount={8}
              duration={300}
            >
              <Hero profile={profile} />
              <TechStrip techStrip={profile?.techStrip} />
              <About profile={profile} />
              <Projects projects={projects} />
              <Certifications certifications={certifications} />
              <Testimonials testimonials={testimonials} />
              <Blog posts={posts} />
              <Contact profile={profile} />
            </ClickSpark>
          </main>
        } />
        <Route path="/blog/:slug" element={<BlogPostView />} />
      </Routes>
      <Footer profile={profile} />
    </BrowserRouter>
  );
}

export default App;
