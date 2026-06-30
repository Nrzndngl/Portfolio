const router = require('express').Router();
const { getExperiences, createExperience, updateExperience, deleteExperience } = require('../controllers/experiences');
const { protect } = require('../middleware/auth');

router.get('/', getExperiences);
router.post('/', protect, createExperience);
router.put('/:id', protect, updateExperience);
router.delete('/:id', protect, deleteExperience);

module.exports = router;
