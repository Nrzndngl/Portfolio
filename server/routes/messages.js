const router = require('express').Router();
const { getMessages, createMessage, deleteMessage, markAsRead } = require('../controllers/messages');
const { protect } = require('../middleware/auth');

router.get('/', protect, getMessages);
router.post('/', createMessage);
router.delete('/:id', protect, deleteMessage);
router.put('/:id/read', protect, markAsRead);

module.exports = router;
