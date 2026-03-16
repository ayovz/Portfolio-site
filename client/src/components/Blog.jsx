import { motion } from 'framer-motion';
import { FiClock, FiArrowRight } from 'react-icons/fi';
import './Blog.css';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase();
};

const Blog = ({ posts = [] }) => {
  if (!posts.length) return null;

  return (
    <section id="blog" className="section container">
      <div className="section-label">07 // Transmissions</div>
      <h2 className="section-title">Latest Articles</h2>
      <div className="chrome-divider" style={{ marginBottom: '3rem' }}></div>

      <div className="blog-grid">
        {posts.slice(0, 3).map((post, i) => (
          <motion.article
            key={post._id}
            className="blog-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            {post.coverImage && (
              <div className="blog-cover">
                <img src={post.coverImage.startsWith('http') ? post.coverImage : `${API_BASE}${post.coverImage}`} alt={post.title} loading="lazy" />
              </div>
            )}
            <div className="blog-body">
              <div className="blog-tags">
                {post.tags?.slice(0, 2).map(tag => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              
              <div className="blog-footer">
                {post.publishedAt && (
                  <span className="blog-date"><FiClock /> {formatDate(post.publishedAt)}</span>
                )}
                {post.mediumLink ? (
                  <a href={post.mediumLink} target="_blank" rel="noopener noreferrer" className="blog-read">
                    MEDIUM <FiArrowRight />
                  </a>
                ) : (
                  <a href={`/blog/${post.slug}`} className="blog-read">
                    READ <FiArrowRight />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Blog;
