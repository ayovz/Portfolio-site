import { motion } from 'framer-motion';
import { FiBookOpen, FiArrowRight, FiClock } from 'react-icons/fi';
import './Blog.css';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const Blog = ({ posts = [] }) => {
  if (!posts.length) return null;

  return (
    <section id="blog" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-tag"><FiBookOpen /> Blog</span>
          <h2 className="section-title">
            Latest <span className="gradient-text">Writings</span>
          </h2>
          <p className="section-subtitle">
            Thoughts on web development, design, and technology.
          </p>
        </motion.div>

        <div className="blog-grid">
          {posts.slice(0, 3).map((post, i) => (
            <motion.article
              key={post._id}
              className="blog-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {post.coverImage && (
                <div className="blog-cover">
                  <img src={`${API_BASE}${post.coverImage}`} alt={post.title} loading="lazy" />
                </div>
              )}
              <div className="blog-body">
                <div className="blog-tags">
                  {post.tags?.slice(0, 2).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-footer">
                  {post.publishedAt && (
                    <span className="blog-date"><FiClock /> {formatDate(post.publishedAt)}</span>
                  )}
                  <a href={`/blog/${post.slug}`} className="blog-read-link">
                    Read more <FiArrowRight />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
