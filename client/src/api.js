const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const request = async (path, options = {}) => {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error((await res.json()).message || 'API error');
  return res.json();
};

export const api = {
  getProfile: () => request('/profile'),
  getProjects: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/projects${q ? '?' + q : ''}`);
  },
  getCertifications: () => request('/certifications'),
  getTestimonials: () => request('/testimonials'),
  getPosts: () => request('/blog'),
  getPostBySlug: (slug) => request(`/blog/${slug}`),
  sendMessage: (data) => request('/messages', { method: 'POST', body: JSON.stringify(data) }),
};

export default api;
