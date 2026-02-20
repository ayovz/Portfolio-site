const express = require('express');
const router = express.Router();
const { getPosts, getPostBySlug, createPost, updatePost, deletePost } = require('../controllers/blogController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public: only published; Admin: all posts (controller checks req.admin)
router.get('/', (req, res, next) => {
  // Try to authenticate but don't block if no token
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer')) {
    const jwt = require('jsonwebtoken');
    try {
      const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
      req.admin = decoded;
    } catch (_) {}
  }
  next();
}, getPosts);

router.get('/:slug', (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer')) {
    const jwt = require('jsonwebtoken');
    try { req.admin = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET); } catch (_) {}
  }
  next();
}, getPostBySlug);

router.post('/', protect, upload.single('coverImage'), createPost);
router.put('/:id', protect, upload.single('coverImage'), updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
