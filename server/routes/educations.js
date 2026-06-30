const router = require('express').Router();
const { getEducations, createEducation, updateEducation, deleteEducation } = require('../controllers/educations');
const { protect } = require('../middleware/auth');

router.get('/', getEducations);
router.post('/', protect, createEducation);
router.put('/:id', protect, updateEducation);
router.delete('/:id', protect, deleteEducation);

module.exports = router;
