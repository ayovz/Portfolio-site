const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('admin_token');

const request = async (path, options = {}) => {
  const isFormData = options.body instanceof FormData;
  const headers = {};
  if (!isFormData) headers['Content-Type'] = 'application/json';
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    headers: { ...headers, ...(options.headers || {}) },
    ...options,
  });

  if (res.status === 401) {
    localStorage.removeItem('admin_token');
    window.location.href = '/login';
    return;
  }
  if (!res.ok) throw new Error((await res.json()).message || 'API error');
  return res.json();
};

const formReq = (path, method, formData) =>
  request(path, { method, body: formData });

export const adminApi = {
  // Auth
  login: (username, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  me: () => request('/auth/me'),

  // Profile
  getProfile: () => request('/profile'),
  updateProfile: (fd) => formReq('/profile', 'PUT', fd),

  // Projects
  getProjects: () => request('/projects'),
  createProject: (fd) => formReq('/projects', 'POST', fd),
  updateProject: (id, fd) => formReq(`/projects/${id}`, 'PUT', fd),
  deleteProject: (id) => request(`/projects/${id}`, { method: 'DELETE' }),

  // Certifications
  getCertifications: () => request('/certifications'),
  createCertification: (fd) => formReq('/certifications', 'POST', fd),
  updateCertification: (id, fd) => formReq(`/certifications/${id}`, 'PUT', fd),
  deleteCertification: (id) => request(`/certifications/${id}`, { method: 'DELETE' }),

  // Testimonials
  getTestimonials: () => request('/testimonials'),
  createTestimonial: (fd) => formReq('/testimonials', 'POST', fd),
  updateTestimonial: (id, fd) => formReq(`/testimonials/${id}`, 'PUT', fd),
  deleteTestimonial: (id) => request(`/testimonials/${id}`, { method: 'DELETE' }),

  // Blog
  getPosts: () => request('/blog'),
  createPost: (fd) => formReq('/blog', 'POST', fd),
  updatePost: (id, fd) => formReq(`/blog/${id}`, 'PUT', fd),
  deletePost: (id) => request(`/blog/${id}`, { method: 'DELETE' }),

  // Messages
  getMessages: () => request('/messages'),
  markRead: (id) => request(`/messages/${id}/read`, { method: 'PUT' }),
  deleteMessage: (id) => request(`/messages/${id}`, { method: 'DELETE' }),
};

export default adminApi;
