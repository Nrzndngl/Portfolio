const router = require('express').Router();
const { getCertificates, createCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificates');
const { protect } = require('../middleware/auth');

router.get('/', getCertificates);
router.post('/', protect, createCertificate);
router.put('/:id', protect, updateCertificate);
router.delete('/:id', protect, deleteCertificate);

module.exports = router;
