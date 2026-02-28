import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiClock } from 'react-icons/fi';
import DOMPurify from 'dompurify';
import api from '../api';
import './BlogPostView.css';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase();
};

export default function BlogPostView() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getPostBySlug(slug)
      .then(data => {
        setPost(data);
      })
      .catch(err => {
        setError(err.message || 'Error loading post');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="blog-view-container loading">LOADING TRANSMISSION...</div>;
  if (error || !post) return (
    <div className="blog-view-container error">
      <h2>Transmission Not Found</h2>
      <p>{error}</p>
      <Link to="/" className="btn btn-primary mt-4">Return to Base</Link>
    </div>
  );

  return (
    <article className="blog-view-container">
      <Link to="/" className="back-link">
        <FiArrowLeft /> BACK TO HOME
      </Link>
      
      <header className="blog-view-header">
        <div className="blog-view-meta">
          {post.tags?.map(tag => (
             <span key={tag} className="blog-tag">{tag}</span>
          ))}
          {post.publishedAt && (
             <span className="blog-date"><FiClock /> {formatDate(post.publishedAt)}</span>
          )}
        </div>
        
        <h1 className="blog-view-title">{post.title}</h1>
        {post.excerpt && <p className="blog-view-excerpt">{post.excerpt}</p>}
        {post.mediumLink && (
           <a href={post.mediumLink} target="_blank" rel="noopener noreferrer" className="medium-link-btn">
             READ ON MEDIUM
           </a>
        )}
      </header>

      {post.coverImage && (
        <div className="blog-view-cover">
          <img src={`${API_BASE}${post.coverImage}`} alt={post.title} />
        </div>
      )}

      <div 
        className="blog-view-content" 
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content || '') }}
      />
    </article>
  );
}
