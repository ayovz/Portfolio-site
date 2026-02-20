require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');
const Profile = require('./src/models/Profile');
const Project = require('./src/models/Project');
const Certification = require('./src/models/Certification');
const Testimonial = require('./src/models/Testimonial');
const BlogPost = require('./src/models/BlogPost');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Admin
  const existing = await Admin.findOne({ username: 'admin' });
  if (!existing) {
    await Admin.create({ username: 'admin', password: 'admin123' });
    console.log('Admin created: admin / admin123');
  } else {
    console.log('Admin already exists');
  }

  // Profile
  const profileCount = await Profile.countDocuments();
  if (profileCount === 0) {
    await Profile.create({
      name: 'Alex Morgan',
      tagline: 'Full Stack Developer & UI/UX Enthusiast',
      bio: 'I craft beautiful, performant web applications that users love. With 5+ years of experience in modern web technologies, I bridge the gap between great design and robust engineering.',
      email: 'alex@example.com',
      socials: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      },
      skills: [
        { name: 'React', level: 95 },
        { name: 'Node.js', level: 90 },
        { name: 'MongoDB', level: 85 },
        { name: 'TypeScript', level: 88 },
        { name: 'UI/UX Design', level: 80 },
        { name: 'GraphQL', level: 75 },
      ],
    });
    console.log('Profile seeded');
  }

  // Projects
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany([
      {
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform built with React, Node.js, and MongoDB. Features include real-time inventory, payment integration, and an admin dashboard.',
        shortDescription: 'Full-stack e-commerce with real-time features',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
        category: 'Web App',
        featured: true,
        order: 1,
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com',
      },
      {
        title: 'AI-Powered Task Manager',
        description: 'A smart task management app that uses AI to prioritize and categorize tasks. Built with React and Python FastAPI backend.',
        shortDescription: 'AI task management with smart prioritization',
        tech: ['React', 'Python', 'FastAPI', 'OpenAI', 'PostgreSQL'],
        category: 'Web App',
        featured: true,
        order: 2,
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com',
      },
      {
        title: 'Portfolio CMS',
        description: 'This very portfolio website! A MERN stack application with a custom CMS for dynamic content management.',
        shortDescription: 'MERN stack portfolio with admin CMS',
        tech: ['React', 'Express', 'MongoDB', 'Node.js'],
        category: 'Web App',
        featured: false,
        order: 3,
        repoUrl: 'https://github.com',
      },
      {
        title: 'Mobile Weather App',
        description: 'A beautiful React Native weather app with animated weather conditions, location tracking, and 7-day forecasts.',
        shortDescription: 'Animated weather app with real-time data',
        tech: ['React Native', 'OpenWeather API', 'Expo'],
        category: 'Mobile',
        featured: false,
        order: 4,
        repoUrl: 'https://github.com',
      },
    ]);
    console.log('Projects seeded');
  }

  // Certifications
  const certCount = await Certification.countDocuments();
  if (certCount === 0) {
    await Certification.insertMany([
      { title: 'AWS Certified Developer', issuer: 'Amazon Web Services', date: '2024-03', category: 'Cloud', credentialUrl: 'https://aws.amazon.com', order: 1 },
      { title: 'MongoDB Associate Developer', issuer: 'MongoDB University', date: '2023-11', category: 'Database', credentialUrl: 'https://university.mongodb.com', order: 2 },
      { title: 'Google UX Design Certificate', issuer: 'Google / Coursera', date: '2023-06', category: 'Design', credentialUrl: 'https://coursera.org', order: 3 },
      { title: 'Meta React Developer', issuer: 'Meta / Coursera', date: '2022-09', category: 'Frontend', credentialUrl: 'https://coursera.org', order: 4 },
    ]);
    console.log('Certifications seeded');
  }

  // Testimonials
  const testCount = await Testimonial.countDocuments();
  if (testCount === 0) {
    await Testimonial.insertMany([
      { name: 'Sarah Johnson', role: 'CTO', company: 'TechStartup Inc.', quote: 'Alex delivered exceptional work on our platform. The code quality and attention to detail were outstanding. The project was delivered on time and exceeded our expectations.', rating: 5, featured: true, order: 1 },
      { name: 'Marcus Chen', role: 'Product Manager', company: 'InnovateLab', quote: 'Working with Alex was a fantastic experience. They understood our requirements perfectly and built a scalable solution that has grown with our business.', rating: 5, featured: true, order: 2 },
      { name: 'Emma Williams', role: 'Founder', company: 'Design Studio Co.', quote: 'I hired Alex for a complete website overhaul. The result was stunning — modern design, blazing fast performance, and mobile-perfect. Highly recommend!', rating: 5, featured: false, order: 3 },
    ]);
    console.log('Testimonials seeded');
  }

  // Blog posts
  const blogCount = await BlogPost.countDocuments();
  if (blogCount === 0) {
    await BlogPost.insertMany([
      {
        title: 'Building Scalable React Applications in 2024',
        slug: 'building-scalable-react-apps-2024',
        excerpt: 'Explore the latest patterns and best practices for building large-scale React applications with TypeScript, Zustand, and React Query.',
        content: '<p>Building scalable React applications requires careful planning of your architecture from the start...</p>',
        tags: ['React', 'TypeScript', 'Architecture'],
        published: true,
        publishedAt: new Date('2024-12-01'),
      },
      {
        title: 'The Art of Clean API Design with Express.js',
        slug: 'clean-api-design-express',
        excerpt: 'Learn how to design RESTful APIs that are intuitive, consistent, and maintainable using Express.js best practices.',
        content: '<p>Clean API design is the foundation of any successful backend...</p>',
        tags: ['Node.js', 'Express', 'API Design'],
        published: true,
        publishedAt: new Date('2024-11-15'),
      },
      {
        title: 'CSS Animations That Don\'t Hurt Performance',
        slug: 'css-animations-performance',
        excerpt: 'A deep dive into creating smooth, GPU-accelerated CSS animations that enhance user experience without sacrificing performance.',
        content: '<p>Performance is everything in modern web development, especially for animations...</p>',
        tags: ['CSS', 'Performance', 'Animation'],
        published: true,
        publishedAt: new Date('2024-10-28'),
      },
    ]);
    console.log('Blog posts seeded');
  }

  console.log('\n✅ Seed complete!');
  console.log('Admin login: admin / admin123');
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
