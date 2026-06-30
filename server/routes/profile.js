const router = require('express').Router();
const { getProfile, updateProfile } = require('../controllers/profile');
const { protect } = require('../middleware/auth');

router.get('/', getProfile);
router.put('/', protect, updateProfile);

module.exports = router;
