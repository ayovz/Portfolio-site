const BlogPost = require('../models/BlogPost');

const getPosts = async (req, res) => {
  const filter = req.admin ? {} : { published: true };
  const posts = await BlogPost.find(filter).sort({ publishedAt: -1, createdAt: -1 });
  res.json(posts);
};

const getPostBySlug = async (req, res) => {
  const filter = req.admin
    ? { slug: req.params.slug }
    : { slug: req.params.slug, published: true };
  const post = await BlogPost.findOne(filter);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

const createPost = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.coverImage = req.file.path;
    if (typeof data.tags === 'string') data.tags = data.tags.split(',').map(t => t.trim());
    
    // Auto-generate slug and publishedAt
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (data.published === 'true' || data.published === true) {
      data.publishedAt = new Date();
    }
    
    const post = await BlogPost.create(data);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const data = { ...req.body };
    if (req.file) data.coverImage = req.file.path;
    if (typeof data.tags === 'string') data.tags = data.tags.split(',').map(t => t.trim());

    // Auto-generate slug and publishedAt if newly published
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if ((data.published === 'true' || data.published === true) && !post.publishedAt) {
      data.publishedAt = new Date();
    }

    Object.assign(post, data);
    const updated = await post.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const post = await BlogPost.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json({ message: 'Post deleted' });
};

module.exports = { getPosts, getPostBySlug, createPost, updatePost, deletePost };
