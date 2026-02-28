const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String },
  excerpt: { type: String },
  coverImage: { type: String },
  tags: [{ type: String }],
  published: { type: Boolean, default: false },
  publishedAt: { type: Date },
  mediumLink: { type: String },
}, { timestamps: true });



module.exports = mongoose.model('BlogPost', blogPostSchema);
