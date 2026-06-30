const router = require('express').Router();
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skills');
const { protect } = require('../middleware/auth');

router.get('/', getSkills);
router.post('/', protect, createSkill);
router.put('/:id', protect, updateSkill);
router.delete('/:id', protect, deleteSkill);

module.exports = router;
