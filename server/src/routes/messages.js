const express = require('express');
const router = express.Router();
const { getMessages, createMessage, markRead, deleteMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

router.post('/', createMessage);           // Public: submit contact form
router.get('/', protect, getMessages);     // Admin only
router.put('/:id/read', protect, markRead);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
